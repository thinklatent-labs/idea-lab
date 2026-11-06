import { motion } from 'motion/react';

export type OrbState = 'idle' | 'thinking' | 'speaking';

/** Jarvis's presence: the ThinkLatent green and teal turning inside a glass bead. It breathes when idle, turns fast while
 *  Claude thinks, and pulses with rings while it speaks. Purely decorative; state is also said in words nearby. */
export function JarvisOrb({ size = 28, state = 'idle', rings = false }: { size?: number; state?: OrbState; rings?: boolean }) {
  const breathe = state === 'speaking' ? { scale: [1, 1.07, 0.98, 1.05, 1] } : state === 'thinking' ? { scale: [1, 0.93, 1] } : { scale: [1, 1.035, 1] };
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }} aria-hidden="true">
      {rings &&
        state !== 'idle' &&
        [0, 1].map((k) => (
          <motion.span
            key={k}
            className="absolute inset-0 rounded-full border border-[var(--kit-brand)]"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 1.9 }}
            transition={{ duration: state === 'speaking' ? 1.4 : 2, repeat: Infinity, delay: k * 0.7, ease: 'easeOut' }}
          />
        ))}
      <motion.span className="jarvis-orb block" data-state={state} style={{ width: size, height: size }} animate={breathe} transition={{ duration: state === 'idle' ? 4.2 : state === 'thinking' ? 1.1 : 0.9, repeat: Infinity, ease: 'easeInOut' }} />
    </span>
  );
}
