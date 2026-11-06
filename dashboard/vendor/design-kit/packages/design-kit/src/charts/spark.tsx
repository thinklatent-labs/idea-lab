import * as React from "react"
import { cn } from "@kit/ui/lib/utils"

/** Token-themed SVG chart primitives. The ECharts wrapper (decision 3) will replace the large charts; these stay for tiles. */
export function Sparkline({ values, lit, className, width = 96, height = 34 }: { values: number[]; lit?: number; className?: string; width?: number; height?: number }) {
  const min = Math.min(...values), max = Math.max(...values), span = max - min || 1
  const pts = values.map((v, i) => [2 + (i * (width - 4)) / (values.length - 1), height - 4 - ((v - min) / span) * (height - 8)] as const)
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" className={cn("overflow-visible", className)}>
      <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {lit != null && <circle cx={pts[lit][0]} cy={pts[lit][1]} r="3" fill="var(--kit-lit)" />}
    </svg>
  )
}

export function Bars({ values, lit, projectedFrom, className, width = 96, height = 34 }: { values: number[]; lit?: number; projectedFrom?: number; className?: string; width?: number; height?: number }) {
  const max = Math.max(...values) || 1, w = Math.floor(width / values.length) - 4
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" className={className}>
      {values.map((v, i) => {
        const h = Math.max(4, (v / max) * (height - 2)), x = i * (w + 4), y = height - h
        const projected = projectedFrom != null && i >= projectedFrom
        return projected
          ? <rect key={i} x={x + 0.75} y={y + 0.75} width={w - 1.5} height={h - 1.5} rx="2" fill="none" stroke="currentColor" strokeOpacity=".45" strokeDasharray="2 2" />
          : <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill={i === lit ? "var(--kit-lit)" : "currentColor"} opacity={i === lit ? 1 : 0.85} />
      })}
    </svg>
  )
}

export function DotGrid({ on, total = 12, cols = 6, className }: { on: number; total?: number; cols?: number; className?: string }) {
  return (
    <svg width={cols * 16} height={Math.ceil(total / cols) * 16} aria-hidden="true" className={className}>
      {Array.from({ length: total }, (_, i) => (
        <circle key={i} cx={8 + (i % cols) * 16} cy={8 + Math.floor(i / cols) * 16} r="3" fill={i < on ? "currentColor" : "none"} stroke="currentColor" strokeOpacity={i < on ? 1 : 0.35} strokeWidth="1.2" />
      ))}
    </svg>
  )
}

/** Pillar strip: n small squircles with a display number, an interval and a bar; the ones below target go ink. */
export function PillarStrip({ pillars, target }: { pillars: { name: string; value: number; pm: number }[]; target: number }) {
  return (
    <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${pillars.length}, minmax(0,1fr))` }}>
      {pillars.map((p) => {
        const below = p.value < target
        return (
          <div key={p.name} className={cn("min-w-0 rounded-[20px] px-3.5 pb-3 pt-3.5", below ? "bg-foreground text-background" : "bg-background/60 dark:bg-white/5")}>
            <div className="truncate text-xs opacity-70">{p.name}</div>
            <div className="kit-display kit-num mt-2 whitespace-nowrap text-[28px]">{p.value.toFixed(2)}<span className="ml-1 text-xs tracking-normal opacity-60">± {p.pm.toFixed(2)}</span></div>
            <div className={cn("mt-3 h-1 rounded-full", below ? "bg-background/20" : "bg-foreground/10")}><div className="h-1 rounded-full" style={{ width: `${p.value * 100}%`, background: below ? "var(--kit-decision)" : "currentColor" }} /></div>
          </div>
        )
      })}
    </div>
  )
}

/** Dot field: one dot per observation, placed in bins along a scale; the one expressive hero for a distribution. */
export function DotField({ bins, min, max, target, today, todayLabel, width = 980, height = 170 }: { bins: { from: number; to: number; count: number }[]; min: number; max: number; target?: number; today?: number; todayLabel?: string; width?: number; height?: number }) {
  const x = (v: number) => ((v - min) / (max - min)) * width
  const rows = 11, pitch = 11
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} role="img" aria-label="Dot field of observations by score">
      {bins.map((b, i) => {
        const x0 = x(b.from) + 2, x1 = x(b.to) - 2, cols = Math.max(1, Math.floor((x1 - x0) / pitch)), total = Math.min(b.count, cols * rows)
        const usedRows = Math.ceil(total / cols), top = (rows - usedRows) * pitch / 2 + 6
        return Array.from({ length: total }, (_, k) => <circle key={`${i}-${k}`} cx={x0 + (k % cols) * pitch + 5} cy={top + Math.floor(k / cols) * pitch + 5} r="3.2" fill="currentColor" opacity={0.35 + 0.65 * Math.min(1, b.count / 60)} />)
      })}
      {target != null && <><line x1={x(target)} y1="0" x2={x(target)} y2={height - 20} stroke="currentColor" strokeOpacity=".6" strokeDasharray="3 4" /><text x={x(target) + 7} y="12" fontSize="11" fill="currentColor" opacity=".7">Target {target.toFixed(2)}</text></>}
      {today != null && <><circle cx={x(today)} cy={(rows * pitch) / 2 + 6} r="40" fill="none" stroke="var(--kit-brand)" strokeWidth="1.5" /><rect x={x(today) - 56} y={(rows * pitch) / 2 + 42} width="112" height="16" rx="8" fill="var(--background)" /><text x={x(today)} y={(rows * pitch) / 2 + 54} textAnchor="middle" fontSize="11" fill="var(--kit-brand)">{todayLabel}</text></>}
      <line x1="0" y1={height - 18} x2={width} y2={height - 18} stroke="currentColor" strokeOpacity=".2" />
      {[min, min + (max - min) * .25, min + (max - min) * .5, min + (max - min) * .75, max].map((v, i) => <text key={i} x={x(v)} y={height - 4} fontSize="11" fill="currentColor" opacity=".6" textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"}>{v.toFixed(2)}</text>)}
    </svg>
  )
}
