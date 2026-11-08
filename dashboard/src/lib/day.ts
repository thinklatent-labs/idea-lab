// One calendar basis for every day count on the page (TL-007 maintenance, 2026-11-07).
// The register's dates (due dates, decision dates, appetite ends) are calendar days with no time zone.
// "Today" is the viewer's own local calendar day, so a due date turns overdue at the viewer's midnight,
// not at UTC midnight (the audit's B1: a day early in US Eastern, a day late before 05:30 in India).

const DAY = 86_400_000;

/** Local calendar day as YYYY-MM-DD. */
export function localDay(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Day number of a calendar date (YYYY-MM-DD, or the date part of a date-time). Pure calendar arithmetic. */
export function dayNumber(date: string): number {
  const t = Date.parse(`${date.slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(t) ? NaN : Math.round(t / DAY);
}

/** Calendar days from the viewer's today to `date`: 0 today, 1 tomorrow, -1 yesterday; NaN for a date that does not parse. */
export function calendarDaysUntil(date: string, now: Date): number {
  return dayNumber(date) - dayNumber(localDay(now));
}

/** Weekday (0 Sunday) of a calendar date. */
export function weekdayOf(date: string): number {
  return new Date(`${date.slice(0, 10)}T00:00:00Z`).getUTCDay();
}
