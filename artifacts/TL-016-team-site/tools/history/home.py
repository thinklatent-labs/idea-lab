from common import *
src = open(SRC+'Main.dc.html').read()
head_end = src.index('</style>')
head = src[:head_end].replace(FONT_OLD, FONT_NEW) + DG_CSS
hi = src.index('<section class="hero"'); mi = src.index('<main style="display:flex;flex-direction:column">')
chrome = src[head_end:hi]
main = src[mi:src.index('</main>')+len('</main>')]
tail = src[src.index('</main>')+len('</main>'):]
secs = re.findall(r'  <section.*?\n  </section>', main, re.S)
assert len(secs)==6, len(secs)
products, doors, proof, latest, community, wave = secs
doors = doors.replace('How every ThinkLatent model earns its place: the steps a use case passes, who signs, and what is monitored.','ThinkLatent\'s steps alongside the Enterprise\'s model risk management, which approves and validates.').replace('See the controls','See the steps')
assert 'See the steps' in doors
# proof: strip the outer section wrapper to embed under the panel
proof_inner = proof[proof.index('>')+1:proof.rindex('</section>')]
latest_inner = latest[latest.index('>')+1:latest.rindex('</section>')]
comm_inner = community[community.index('>')+1:community.rindex('</section>')]
snap = board_svg(2)
hero = f'''<section class="hero" style="display:flex;flex-direction:column">
  <div class="wrap" style="width:100%;display:flex;flex-direction:column;gap:22px;padding-top:88px;padding-bottom:40px;align-items:flex-start">
    <h1 style="font-size:68px;line-height:1.02;font-weight:400;letter-spacing:-.035em;max-width:900px">The Enterprise shouldn't have to start from zero.</h1>
    <p style="font-size:28px;line-height:1.2;letter-spacing:-.015em;color:#1B5128;font-weight:400">Owned models. Inside the boundary.</p>
    <p style="font-size:18px;color:#3A3A38;max-width:640px">ThinkLatent builds the Enterprise's own models, trained on what it already knows, so every use case makes the next one better.</p>
    <div style="display:flex;flex-wrap:wrap;gap:12px"><a class="pill go" href="Wins.dc.html#talk">Start a use case</a><a class="pill" href="TLTrust.dc.html">How we build responsibly</a></div>
  </div>
  <div class="wrap" style="width:100%;padding-bottom:56px">
    <figure style="margin:0;position:relative;background:#FFFFFF;border:1px solid #E6E6E2;border-radius:28px;padding:28px 32px 20px;box-shadow:0 16px 48px rgba(26,26,26,.08)">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px"><p class="cap">The ThinkLatent Portal, running</p><span class="tag grey">Looping capture · Stream web part</span></div>
      <div style="opacity:.92">{snap}</div>
      <figcaption class="meta" style="margin-top:10px">A short looping capture of the portal's command centre goes here once the portal runs. Until then this static snapshot holds the slot; every count is a placeholder.</figcaption>
    </figure>
  </div>
</section>'''
names = '''  <section class="wrap" style="width:100%;padding-top:8px;padding-bottom:40px">
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:16px 40px;padding:22px 0;border-top:1px solid #E6E6E2;border-bottom:1px solid #E6E6E2">
      <p class="cap" style="flex:none">Running on TLM</p>
      <div class="names"><span>[Business line]</span><span>[Business line]</span><span>[Business line]</span><span>[IT engagement]</span><span>[Office: Canada]</span><span>[Office: India]</span></div>
    </div>
    <p class="boardnote" style="margin-top:10px"><b>Board note.</b> Names, not logos: each team is listed only with its own agreement, and only if it is in production on TLM.</p>
  </section>'''
pillars = '''  <section class="wrap sec" style="width:100%;padding-top:40px;padding-bottom:40px">
    <div><p class="cap">What changes</p><h2 class="h2">Kept, proven, compounding</h2></div>
    <div class="grid g3">
      <div class="pillar"><span class="k">01</span><h3 style="font-size:24px;font-weight:500">Kept</h3><p style="color:#3A3A38">What the Enterprise's teams teach the models stays in the Enterprise's own models and feeds the next one. What didn't work is kept too.</p></div>
      <div class="pillar"><span class="k">02</span><h3 style="font-size:24px;font-weight:500">Proven</h3><p style="color:#3A3A38">Every model is scored on the Enterprise's own tasks, with a source and a date on every score. Approval stays with the Enterprise's model risk management.</p></div>
      <div class="pillar"><span class="k">03</span><h3 style="font-size:24px;font-weight:500">Compounding</h3><p style="color:#3A3A38">Each new use case adds signal, so the next team starts further ahead than the last.</p></div>
    </div>
  </section>'''
ip_rows = ''.join(f'<div class="iprow"><span style="font-weight:600">[Business line]</span><span class="meta">[One line from its product lead on what changed]</span><span class="n">[n]</span><span class="n">[n]</span><span class="n">[n]</span><span class="n">[n]</span></div>' for _ in range(3))
proofsec = f'''  <section id="proof" class="wrap sec" style="width:100%;padding-top:40px;padding-bottom:40px">
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:16px"><div><p class="cap">Proof</p><h2 class="h2">What the Enterprise's models did this week</h2><p style="color:#5C5C5A;margin-top:8px;max-width:720px">Four numbers and a row per business line, each with its source and as-of date. A number with no source does not go up.</p></div><a class="pill" href="Wins.dc.html">All wins</a></div>
    <div class="ip" role="group" aria-label="Proof panel with placeholder numbers" style="background:#FFFFFF;border:1px solid #E6E6E2">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px"><p class="cap">This week</p><p class="meta">Source: the ThinkLatent Portal · as of [date]</p></div>
      <dl class="ip-big"><div><dt>Use cases live</dt><dd>[n]</dd></div><div><dt>Requests this week</dt><dd>[n]</dd></div><div><dt>Corrections kept</dt><dd>[n]</dd></div><div><dt>Models retrained</dt><dd>[n]</dd></div></dl>
      <div class="iprow h"><span>Business line</span><span>This week</span><span>Use cases</span><span>Requests</span><span>Corrections</span><span>Retrained</span></div>
      {ip_rows}
    </div>
    <p class="boardnote"><b>Board note.</b> The panel replaces v8's compounding strip, so 35M+ and ~200 (sourced only to a person) come off Home. The numerals map to the three success measures: solutions in people's hands, cycle time, an AI-native workforce. Until the portal supplies counts, the panel launches with the rows that have a source, or not at all.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:20px">{proof_inner}</div>
  </section>'''
proofsec = proofsec.replace('<p class="cap">Proof · the latest win</p>','<p class="cap">The latest win</p>')
latestsec = f'''  <section class="wrap sec" style="width:100%;padding-top:40px;padding-bottom:40px">{latest_inner}
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:20px;align-items:start;margin-top:12px">{comm_inner}</div>
  </section>'''
band = '''  <section class="wave">
    <div class="wrap" style="padding-top:96px;padding-bottom:96px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:18px">
      <h2 style="font-size:48px;line-height:1.06;font-weight:400;letter-spacing:-.03em;max-width:820px">Which part of your work should the model learn next?</h2>
      <p style="color:#D6E9DB;font-size:17px;max-width:560px">Tell us in your words. Every use case makes the next one easier.</p>
      <a class="pill go" href="Wins.dc.html#talk">Start a use case</a>
    </div>
  </section>'''
newmain = '<main style="display:flex;flex-direction:column">\n' + '\n'.join([names,pillars,proofsec,products,doors,latestsec,band]) + '</main>'
out = head + chrome + hero + newmain + tail
open(SRC+'Main.dc.html','w').write(out)
print(len(out), out.count('<section'))
