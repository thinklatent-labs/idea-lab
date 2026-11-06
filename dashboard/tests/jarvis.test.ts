import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Register } from '../src/lib/types';
import { deriveAll } from '../src/lib/derive';
import { blocks, buildDigest, forSpeech, inline, localBrief, parseReply, rules, whenText } from '../src/jarvis/brain';

const reg = JSON.parse(readFileSync(fileURLToPath(new URL('./fixtures/register-v1.3.json', import.meta.url)), 'utf8')) as Register;
const now = new Date('2026-11-02T10:00:00Z');
const derived = deriveAll(reg, now);

describe('Jarvis digest', () => {
  const digest = buildDigest({ reg, derived, now, inbox: new Map(), lastVisit: '2026-11-01', visibleIdeas: reg.ideas });
  it('names the revision, every row once, and stays small enough for one call', () => {
    expect(digest).toContain(`rev ${reg.source.registerRev}`);
    for (const i of reg.ideas) expect(digest.split('\n').filter((l) => l.startsWith(`- ${i.id} `)).length).toBe(1);
    expect(digest.length).toBeLessThan(60_000);
  });
  it('lists quick calls with their options, and leaves out rows hidden from the audience', () => {
    expect(digest).toMatch(/TL-004-q2 quick call ".+" options: .+=".+"/);
    const hidden = buildDigest({ reg, derived, now, inbox: new Map(), lastVisit: null, visibleIdeas: reg.ideas.filter((i) => i.id !== 'TL-004') });
    expect(hidden.split('\n').some((l) => l.startsWith('- TL-004 '))).toBe(false);
  });
  it('says which calls Jithin already made on the dashboard', () => {
    const inbox = new Map([['TL-004-q2', { itemId: 'TL-004-q2', ideaId: 'TL-004', itemText: '', optionId: 'a', optionLabel: 'Set it', effect: '', decidedAt: '2026-11-02T09:00:00Z', decidedBy: null, status: 'waiting' as const }]]);
    const d = buildDigest({ reg, derived, now, inbox, lastVisit: null, visibleIdeas: reg.ideas });
    expect(d).toContain('Jithin chose "Set it" on the dashboard; waiting');
    expect(d).toContain('DASHBOARD CALLS waiting');
  });
  it('wraps the digest in the standing instructions, ending on the confidence rule', () => {
    const r = rules(digest);
    expect(r.startsWith('You are Jarvis')).toBe(true);
    expect(r).toContain('Agents propose; Jithin decides');
    expect(r).toContain('Confidence: high|medium|low');
  });
});

describe('the brief the page writes itself', () => {
  it('counts what needs Jithin and names the row at the top of the queue', () => {
    const b = localBrief(reg, derived, now, new Map(), reg.ideas);
    expect(b.counts.quick).toBe(6);
    expect(b.headline).toMatch(/^6 quick calls wait on you/);
    expect(b.headline.endsWith(';')).toBe(true);
    expect(b.lead?.ideaId).toMatch(/^TL-\d{3}$/);
  });
  it('stops counting a quick call once it is decided on the dashboard', () => {
    const inbox = new Map([['TL-004-q2', { itemId: 'TL-004-q2', ideaId: 'TL-004', itemText: '', optionId: 'a', optionLabel: 'x', effect: '', decidedAt: '', decidedBy: null, status: 'waiting' as const }]]);
    expect(localBrief(reg, derived, now, inbox, reg.ideas).counts.quick).toBe(5);
  });
});

describe('replies', () => {
  it('splits the closing confidence line in its common spellings', () => {
    expect(parseReply('Answer.\nConfidence: high — TL-004 row').confidence).toEqual({ level: 'high', why: 'TL-004 row' });
    expect(parseReply('Answer.\n**Confidence:** Medium - two sessions').confidence).toEqual({ level: 'medium', why: 'two sessions' });
    expect(parseReply('Answer.\n\nConfidence: low\n').confidence?.level).toBe('low');
    expect(parseReply('No line here.').confidence).toBeNull();
  });
  it('lists the register IDs an answer names, once each, in order', () => {
    expect(parseReply('TL-004 waits on TL-003; CAP-002 too. TL-004 again.\nConfidence: high — x').ids).toEqual(['TL-004', 'TL-003', 'CAP-002']);
  });
  it('reads bold, code and IDs inline, and lists as blocks', () => {
    expect(inline('**Gate** for `x` on TL-004')).toEqual([
      { t: 'bold', v: 'Gate' },
      { t: 'text', v: ' for ' },
      { t: 'code', v: 'x' },
      { t: 'text', v: ' on ' },
      { t: 'id', v: 'TL-004' },
    ]);
    const b = blocks('Lead line.\n\n- one\n- two\n\n1. first\n2. second\n### Head');
    expect(b.map((x) => x.t)).toEqual(['p', 'ul', 'ol', 'h']);
  });
  it('speaks without markdown and says IDs the way people do', () => {
    expect(forSpeech('**TL-004** is blocked.\n- name the lead\nConfidence: high — x')).toBe('T L 4 is blocked. name the lead');
  });
  it('says when a date falls', () => {
    expect(whenText('2026-11-02', now)).toBe('due today');
    expect(whenText('2026-11-03', now)).toBe('due tomorrow');
    expect(whenText('2026-11-06', now)).toBe('due Friday');
    expect(whenText('2026-11-20', now)).toBe('due 20 Nov');
    expect(whenText('2026-10-30', now)).toBe('3 days overdue');
  });
});
