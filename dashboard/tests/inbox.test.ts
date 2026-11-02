import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dueItems, type Register } from '../src/lib/types';
import { deriveAll } from '../src/lib/derive';

const reg = JSON.parse(readFileSync(fileURLToPath(new URL('./fixtures/register-v1.3.json', import.meta.url)), 'utf8')) as Register;

describe('due items (contract v1.3)', () => {
  it('splits quick calls from input-needed items, every quick call with options and effects', () => {
    const all = reg.ideas.flatMap((i) => dueItems(i));
    const quick = all.filter((d) => d.kind === 'quick');
    expect(quick.map((d) => d.id).sort()).toEqual(['VI-003-q1', 'VI-003-q3', 'VI-004-q2', 'VI-006-q1', 'VI-006-q3', 'VI-007-q1']);
    for (const d of quick) {
      expect(d.options!.length).toBeGreaterThanOrEqual(2);
      for (const o of d.options!) expect(o.effect.length).toBeGreaterThan(0);
    }
    expect(new Set(all.map((d) => d.id)).size).toBe(all.length);
  });
  it('treats legacy string items as input-needed with stable ids', () => {
    const items = dueItems({ id: 'VI-099', decisionsDue: ['Name the owner', 'Set the appetite'] });
    expect(items.map((d) => [d.id, d.kind])).toEqual([['VI-099-q1', 'input'], ['VI-099-q2', 'input']]);
  });
  it('still counts due items for the attention queue', () => {
    const d = deriveAll(reg, new Date('2026-11-02T10:00:00Z'));
    expect(d.get('VI-004')!.needsDecision).toBe(true);
    expect(d.get('VI-004')!.reasons.find((r) => r.kind === 'decision')!.label).toBe('3 decisions due');
  });
});
