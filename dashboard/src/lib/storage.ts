// Per-viewer conveniences only. Every read and write is guarded: storage can be empty or throw.
const KEY_VISIT = 'lab-dashboard:lastVisit';
const KEY_PREFS = 'lab-dashboard:prefs';

export interface Prefs {
  showFlagged?: boolean;
  queueFilter?: string;
  audience?: string;
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
