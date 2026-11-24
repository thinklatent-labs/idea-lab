from common import *
head, chrome, body, tail = parts('Mandate.dc.html')
head = head.replace(FONT_OLD, FONT_NEW) + DG_CSS
d0,d1,d2,d3 = (board_svg(i) for i in range(4))
assert 'each generation starts from what the last one learned' in d3
d3 = d3.replace('each generation starts from what the last one learned','each generation is trained on more of the Enterprise’s own data')
src = open(SRC+'Mandate.dc.html').read()
i = src.index('<section class="sec">\n    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:16px"><div><p class="cap">What we hold ourselves to</p>')
j = src.index('</section>', i) + len('</section>')
targets = src[i:j].replace('Four things, measured','Four things, measured').replace('Home shows the same numbers.','They sit under the loop because the loop is what moves them.')

def chapter(n, cap, title, text, fig, extra='', idv=''):
    return f'''
  <section class="chap" id="ch{n}"><span class="mark" aria-hidden="true">0{n}</span>
    <div style="display:flex;flex-direction:column;gap:16px;max-width:560px">
      <p class="chn">0{n} · {cap}</p>
      <h2 class="h2" style="margin:0">{title}</h2>
      {text}
      {extra}
    </div>
    {fig}
  </section>'''
def figure(svg, caption):
    return f'<figure class="fig">{svg}<figcaption>{caption}</figcaption></figure>'

hero = f'''<section class="hero" style="min-height:640px;display:flex;align-items:stretch">
  <div class="wrap" style="width:100%;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr));gap:40px;align-items:end;padding-top:72px;padding-bottom:48px">
    <div style="display:flex;flex-direction:column;gap:20px">
      <p class="cap">The mandate</p>
      <h1 style="font-size:56px;line-height:1.04;font-weight:400;letter-spacing:-.03em;max-width:680px">ThinkLatent builds the Enterprise's own AI, and keeps everything it learns.</h1>
      <p style="font-size:18px;color:#3A3A38;max-width:600px">Language models, speech, omni and thinking models, foundation models: whatever the work needs, trained on what the Enterprise already knows. Five chapters on why, and how.</p>
      <nav class="jump" aria-label="Chapters"><span class="meta">Chapters:</span><a href="#ch1">01 Today</a><a href="#ch2">02 Vision</a><a href="#ch3">03 Approach</a><a href="#ch4">04 Generations</a><a href="#ch5">05 The loop</a></nav>
    </div>
    <figure style="margin:0;justify-self:center;width:100%;max-width:460px">{spine_svg()}</figure>
  </div>
</section>'''

ch1 = chapter(1,'Today','Most AI at a large company is rented.',
 '<p style="font-size:17px;color:#3A3A38">A general model, used one project at a time. Each team starts from zero, waits months for a first answer, and what the model learned leaves with the project.</p>',
 figure(d0,'Today: a use case, a general model, months of setup, one answer. The dots scatter: the lesson leaves with the project.'),
 extra='<blockquote style="margin:8px 0 0;display:flex;flex-direction:column;gap:10px"><p class="quote">"Anyone using a vendor\'s AI only gets as good as the vendor."</p><footer class="meta">Jithin Pradeep, Head of ThinkLatent</footer></blockquote>')
ch2 = chapter(2,'Vision','What one team learns should carry into the next team\'s work.',
 '<p style="font-size:17px;color:#3A3A38">The Enterprise\'s models should carry what one team learns into the next team\'s work. Every document, conversation and correction makes the next answer better.</p>',
 figure(d1,'What the Enterprise knows, gathered into TLM, and the work it powers. Knowledge arrives as dots; work leaves as lines.'))
statement = '<section style="padding:24px 0"><p class="statement">One system, every team, every lesson kept.</p></section>'
ch3 = chapter(3,'Approach','One system builds, measures and improves every model.',
 '<p style="font-size:17px;color:#3A3A38">The TLM line; a self-healing loop that finds what a model does not know yet; and the TL Index, which scores each model on the Enterprise\'s own work. Approval and validation stay with the Enterprise\'s model risk management.</p><p><a href="Products.dc.html">See the products</a> · <a href="TLTrust.dc.html">How we build responsibly</a></p>',
 figure(d2,'The system, as a snapshot. States are samples and every count is a placeholder; in the ThinkLatent Portal each count is live and links to the page behind it.'))
ch4 = chapter(4,'Generations','Each TLM generation is trained on more of the Enterprise\'s own data.',
 '<p style="font-size:17px;color:#3A3A38">Experiments that win are scaled. The ones that fall short are kept as evidence, so no team repeats them.</p>',
 figure(d3,'TLM1 to TLM5, and every TL Index verdict kept for the next model: Better, Tie, Below the bar.'),
 extra='<p class="boardnote"><b>Board note, not site copy.</b> Line to confirm with Applied Research before publishing. The brief\'s original, "Each TLM generation starts from what the last one learned", holds only if each generation carries weights or data forward; if a generation starts from a new base model, the page says what carries forward (the Enterprise\'s data and evaluations).</p>')
ip_rows = ''.join(f'<div class="iprow"><span style="font-weight:600">{bl}</span><span class="meta">[One line from its product lead on what changed this week]</span><span class="n">[n]</span><span class="n">[n]</span><span class="n">[n]</span><span class="n">[n]</span></div>' for bl in ['[Business line]','[Business line]','[Business line]'])
panel = f'''<div class="ip" role="group" aria-label="Index panel with placeholder numbers">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px"><p class="cap">What the Enterprise's models did this week</p><p class="meta">Source: the ThinkLatent Portal · as of [date]</p></div>
      <dl class="ip-big"><div><dt>Use cases live</dt><dd>[n]</dd></div><div><dt>Requests this week</dt><dd>[n]</dd></div><div><dt>Corrections kept</dt><dd>[n]</dd></div><div><dt>Models retrained</dt><dd>[n]</dd></div></dl>
      <div class="iprow h"><span>Business line</span><span>This week</span><span>Use cases</span><span>Requests</span><span>Corrections</span><span>Retrained</span></div>
      {ip_rows}
    </div>'''
ch5 = chapter(5,'The loop','Every use case in production sends signal back.',
 '<p style="font-size:17px;color:#3A3A38">What worked, what was corrected, what was missed. The models improve where the Enterprise actually works, and the numbers show it.</p>',
 f'<div style="display:flex;flex-direction:column;gap:12px">{panel}<p class="boardnote"><b>Board note, not site copy.</b> Layout only. The panel goes on the site once the ThinkLatent Portal supplies real counts with a source and an as-of date; until then it lives in presentations. No number here is estimated.</p></div>')
close = f'''
  <section style="display:flex;flex-direction:column;align-items:center;gap:20px;text-align:center;padding-top:8px">
    <div style="width:100%;max-width:820px">{fan_svg()}</div>
    <h2 style="font-size:40px;line-height:1.1;font-weight:400;letter-spacing:-.025em;max-width:760px">Intelligence the Enterprise owns, and that grows every time it is used.</h2>
    <p style="font-weight:600;font-size:17px">ThinkLatent.</p>
    <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center"><a class="pill go" href="Wins.dc.html#talk">Start a use case</a><a class="pill" href="TLTrust.dc.html">How we build responsibly</a></div>
  </section>'''
main = f'''<main class="wrap" style="display:flex;flex-direction:column;gap:72px;padding-top:72px;width:100%">
  <div class="spine" style="display:flex;flex-direction:column;gap:88px">{ch1}{ch2}{statement}{ch3}{ch4}{ch5}
  <div style="margin-top:-40px">{targets}</div>
  </div>{close}
</main>
'''
out = head + chrome + hero + '\n' + main + tail
out = out.replace('"$preview":{"width":1440,"height":2900}','"$preview":{"width":1440,"height":6200}')
open(SRC+'Mandate.dc.html','w').write(out)
print(len(out))
