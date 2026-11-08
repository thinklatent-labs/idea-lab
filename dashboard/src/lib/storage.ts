// Per-viewer conveniences only. Every read and write is guarded: storage can be empty or throw.
const KEY_VISIT = 'lab-dashboard:lastVisit';
const KEY_PREFS = 'lab-dashboard:prefs';
/** The visit before today, kept so reloads on one day keep the same "since your last visit" (N1). */
const KEY_VISIT_BEFORE = 'lab-dashboard:visitBefore';

export interface Prefs {
  showFlagged?: boolean;
  queueFilter?: string;
  audience?: string;
  theme?: 'light' | 'dark';
}

export function readLastVisit(): string | null {
  try {
    return window.localStorage.getItem(KEY_VISIT);
  } catch {
    return null;
  }
}

export function writeLastVisit(iso: string): void {
  try {
    window.localStorage.setItem(KEY_VISIT, iso);
  } catch {
    /* storage unavailable: the page works without it */
  }
}

/**
 * "Last visit" as a previous calendar day: reloading on the same day keeps the day before as the
 * comparison point instead of resetting it to today (audit N1). Returns that day; records today.
 */
export function rollLastVisit(today: string): string | null {
  try {
    const stored = window.localStorage.getItem(KEY_VISIT);
    const before = window.localStorage.getItem(KEY_VISIT_BEFORE);
    if (!stored) {
      window.localStorage.setItem(KEY_VISIT, today);
      return null;
    }
    // Older pages stored a UTC day; compare on the date part either way.
    if (stored.slice(0, 10) >= today) return before;
    window.localStorage.setItem(KEY_VISIT_BEFORE, stored.slice(0, 10));
    window.localStorage.setItem(KEY_VISIT, today);
    return stored.slice(0, 10);
  } catch {
    return null;
  }
}

export function readPrefs(): Prefs {
  try {
    const raw = window.localStorage.getItem(KEY_PREFS);
    return raw ? (JSON.parse(raw) as Prefs) : {};
  } catch {
    return {};
  }
}

export function writePrefs(p: Prefs): void {
  try {
    window.localStorage.setItem(KEY_PREFS, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}
