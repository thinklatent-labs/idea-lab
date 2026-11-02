// Date and text helpers. Dates are shown relative where a glance matters, absolute on tap.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "1 Nov 2026" from "2026-11-01" or an ISO date-time (in its own offset). */
export function fmtDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}

/** "1 Nov 2026, 16:45 (+05:30)" for the as-of stamp, keeping the register's own offset. */
export function fmtDateTime(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::\d{2}(?:\.\d+)?)?(Z|[+-]\d{2}:\d{2})?$/.exec(iso);
  if (!m) return fmtDate(iso);
  const tz = m[6] ? (m[6] === 'Z' ? 'UTC' : `UTC${m[6]}`) : '';
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}, ${m[4]}:${m[5]}${tz ? ` ${tz}` : ''}`;
}

export function relDays(days: number): string {
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 14) return `${days} days ago`;
  if (days < 60) return `${Math.round(days / 7)} wk ago`;
  return `${Math.round(days / 30)} mo ago`;
}

export function relHours(hours: number): string {
  if (hours < 1) return 'just now';
  if (hours < 24) return `${Math.floor(hours)} h ago`;
  return relDays(Math.floor(hours / 24));
}

export function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

export function todayISO(now: Date): string {
  return now.toISOString().slice(0, 10);
}
