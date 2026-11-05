// Jarvis's voice: the browser's own speech synthesis, which uses the voices installed on the device and sends
// nothing anywhere. A British voice first, then any English one. Listening is not offered: the claude.ai page has no
// microphone capability, and browser dictation would send the audio to a third party.
let chosen: SpeechSynthesisVoice | null = null;

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';

function pick(): SpeechSynthesisVoice | null {
  if (!canSpeak()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const prefer = [/Daniel/i, /Google UK English Male/i, /Ryan/i, /Arthur/i, /Oliver/i, /George/i];
  const gb = voices.filter((v) => /en[-_]GB/i.test(v.lang));
  for (const re of prefer) {
    const v = gb.find((x) => re.test(x.name)) ?? voices.find((x) => re.test(x.name) && /^en/i.test(x.lang));
    if (v) return v;
  }
  return gb.find((v) => v.localService) ?? gb[0] ?? voices.find((v) => /^en/i.test(v.lang) && v.localService) ?? voices.find((v) => /^en/i.test(v.lang)) ?? null;
}

if (canSpeak()) {
  try {
    window.speechSynthesis.addEventListener?.('voiceschanged', () => {
      chosen = pick();
    });
  } catch {
    /* older engines: pick on first use */
  }
}

export function speak(text: string, on: { start?: () => void; end?: () => void }): void {
  if (!canSpeak() || !text.trim()) return on.end?.();
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.slice(0, 1800));
    chosen = chosen ?? pick();
    if (chosen) u.voice = chosen;
    u.lang = chosen?.lang ?? 'en-GB';
    u.rate = 1.03;
    u.pitch = 0.95;
    u.onstart = () => on.start?.();
    u.onend = () => on.end?.();
    u.onerror = () => on.end?.();
    window.speechSynthesis.speak(u);
  } catch {
    on.end?.();
  }
}

export function hush(): void {
  try {
    if (canSpeak()) window.speechSynthesis.cancel();
  } catch {
    /* nothing to stop */
  }
}
