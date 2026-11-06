#!/usr/bin/env node
// Licence allowlist check for installed npm/pnpm dependencies.
// Usage: node scripts/check-licenses.mjs [dir-containing-node_modules ...]
// Policy: everything we build is MIT. Dependencies may only use
// MIT, Apache-2.0, BSD, ISC, Unlicense or CC0. Anything else must be listed in
// licenses.exceptions.json (next to this repo's root) with a reason and who decided.
//
// Exit 0: clean (or every finding is excepted). Exit 1: unexcepted findings.
// Set LICENSE_CHECK_REPORT_ONLY=1 to print findings but always exit 0.
import fs from 'node:fs'
import path from 'node:path'

const ALLOWED = new Set([
  'MIT', 'Apache-2.0', 'BSD', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC', 'Unlicense', 'CC0-1.0',
])

const roots = process.argv.slice(2).length ? process.argv.slice(2) : ['.']
const exceptionsPath = path.resolve(process.env.LICENSE_EXCEPTIONS || 'licenses.exceptions.json')
const exceptions = fs.existsSync(exceptionsPath)
  ? JSON.parse(fs.readFileSync(exceptionsPath, 'utf8'))
  : {}

// --- SPDX expression evaluation: OR = any branch allowed, AND = all allowed ---
function tokenize(s) {
  return s.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').split(/\s+/).filter(Boolean)
}
function evaluate(expr) {
  const t = tokenize(expr)
  let i = 0
  const atom = () => {
    if (t[i] === '(') {
      i++
      const v = orExpr()
      if (t[i] === ')') i++
      return v
    }
    const id = t[i++]
    if (t[i] === 'WITH') i += 2 // exception clause does not change the base licence
    return ALLOWED.has(id)
  }
  const andExpr = () => {
    let v = atom()
    while (t[i] === 'AND') { i++; v = atom() && v }
    return v
  }
  const orExpr = () => {
    let v = andExpr()
    while (t[i] === 'OR') { i++; v = andExpr() || v }
    return v
  }
  return orExpr()
}

function licenceOf(pkg) {
  if (typeof pkg.license === 'string') return pkg.license.trim()
  if (pkg.license && typeof pkg.license.type === 'string') return pkg.license.type.trim()
  if (Array.isArray(pkg.licenses) && pkg.licenses.length) {
    return pkg.licenses.map((l) => (typeof l === 'string' ? l : l.type)).join(' OR ')
  }
  return 'UNKNOWN'
}

const seen = new Set()
const found = new Map() // "name@version" -> licence

function readPkg(dir) {
  try { return JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')) } catch { return null }
}

function visitPackage(dir) {
  let real
  try { real = fs.realpathSync(dir) } catch { return }
  if (seen.has(real)) return
  seen.add(real)
  // Workspace packages resolve outside node_modules: they are ours, not dependencies.
  if (!real.split(path.sep).includes('node_modules')) return
  const pkg = readPkg(real)
  if (pkg && pkg.name) found.set(`${pkg.name}@${pkg.version}`, licenceOf(pkg))
  const nested = path.join(real, 'node_modules')
  if (fs.existsSync(nested)) walkModules(nested)
}

function walkModules(nm) {
  let entries
  try { entries = fs.readdirSync(nm, { withFileTypes: true }) } catch { return }
  for (const e of entries) {
    if (e.name === '.bin' || e.name === '.cache' || e.name === '.modules.yaml') continue
    const p = path.join(nm, e.name)
    if (e.name === '.pnpm') {
      for (const store of fs.readdirSync(p)) {
        const inner = path.join(p, store, 'node_modules')
        if (fs.existsSync(inner)) walkModules(inner)
      }
      continue
    }
    if (e.name.startsWith('.')) continue
    if (e.name.startsWith('@')) {
      for (const sub of fs.readdirSync(p)) visitPackage(path.join(p, sub))
    } else {
      visitPackage(p)
    }
  }
}

for (const r of roots) walkModules(path.join(path.resolve(r), 'node_modules'))

const bad = []
for (const [id, lic] of [...found].sort()) {
  if (lic !== 'UNKNOWN' && evaluate(lic)) continue
  const name = id.slice(0, id.lastIndexOf('@'))
  const reason = exceptions[id] || exceptions[name]
  bad.push({ id, lic, reason })
}

const unexcepted = bad.filter((b) => !b.reason)
console.log(`Checked ${found.size} installed packages against the MIT / Apache-2.0 / BSD / ISC / Unlicense / CC0 allowlist.`)
if (bad.length) {
  const byLic = new Map()
  for (const b of bad) byLic.set(b.lic, [...(byLic.get(b.lic) || []), b])
  for (const [lic, list] of [...byLic].sort()) {
    console.log(`\n${lic}  (${list.length})`)
    for (const b of list) console.log(`  ${b.reason ? '[excepted] ' : ''}${b.id}${b.reason ? `  - ${b.reason}` : ''}`)
  }
}
if (unexcepted.length) {
  console.log(`\n${unexcepted.length} package(s) use a licence outside the allowlist. Replace them, or record a decision in licenses.exceptions.json.`)
  process.exit(process.env.LICENSE_CHECK_REPORT_ONLY ? 0 : 1)
}
console.log('\nLicence check passed.')
