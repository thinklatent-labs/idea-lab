// Motion for the Idea Lab, on `motion` (the library the kit's @kit/motion package builds on). Springs, not durations:
// things settle the way iOS sheets and docks do. Everything here honours prefers-reduced-motion through
// <MotionConfig reducedMotion="user"> at the root, and CountUp shows the final number at once when motion is reduced.
// These wrappers are candidates to upstream into @kit/kit; until then they live in the product (kit rule 8).
import { animate, motion, useReducedMotion, type HTMLMotionProps, type Transition } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export const spring = {
  /** Dock pill, toggles, small things that should snap. */
  snappy: { type: 'spring', stiffness: 520, damping: 40, mass: 0.8 } satisfies Transition,
  /** Tiles and rows arriving. */
  soft: { type: 'spring', stiffness: 260, damping: 30, mass: 1 } satisfies Transition,
  /** Sheets and panels. */
  sheet: { type: 'spring', stiffness: 380, damping: 38, mass: 0.9 } satisfies Transition,
  /** Layout moves (cards changing lanes). */
  layout: { type: 'spring', stiffness: 420, damping: 36 } satisfies Transition,
};

/** One element arriving: a short rise and fade. */
export function Reveal({ children, delay = 0, y = 12, className, ...rest }: { children: ReactNode; delay?: number; y?: number; className?: string } & Omit<HTMLMotionProps<'div'>, 'children'>) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring.soft, delay }} {...rest}>
      {children}
    </motion.div>
  );
}

/** A container whose StaggerItems arrive one after another. */
export function Stagger({ children, className, gap = 0.045, delay = 0 }: { children: ReactNode; className?: string; gap?: number; delay?: number }) {
  return (
    <motion.div className={className} initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}>
      {children}
    </motion.div>
  );
}

/** One cell of a Stagger; carries the grid classes of the cell it wraps. */
export function StaggerItem({ children, className, y = 14, ...rest }: { children: ReactNode; className?: string; y?: number } & Omit<HTMLMotionProps<'div'>, 'children' | 'variants'>) {
  return (
    <motion.div className={className} variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: spring.soft } }} {...rest}>
      {children}
    </motion.div>
  );
}

/** A display number that counts up when it first renders and glides when the value changes. It counts on mount,
 *  not on scroll, so a number below the fold is never left at zero for a screenshot or a print. */
export function CountUp({ value, decimals = 0, className, duration = 0.9 }: { value: number; decimals?: number; className?: string; duration?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef<number | null>(null);
  const fmt = (n: number) => n.toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = fmt(value);
      shown.current = value;
      return;
    }
    const from = shown.current ?? 0;
    const controls = animate(from, value, {
      duration: shown.current == null ? duration : 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = fmt(v);
      },
      onComplete: () => {
        el.textContent = fmt(value);
      },
    });
    shown.current = value;
    return () => {
      controls.stop();
      el.textContent = fmt(value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduce]);
  return (
    <span ref={ref} className={className} aria-label={fmt(value)}>
      {fmt(reduce ? value : (shown.current ?? 0))}
    </span>
  );
}

/** A surface that lifts under the pointer and gives under a press. Use on clickable tiles and rows. */
export function Lift({ children, className, onClick, as = 'div', disabled, label }: { children: ReactNode; className?: string; onClick?: () => void; as?: 'div' | 'button'; disabled?: boolean; label?: string }) {
  const Comp = as === 'button' ? motion.button : motion.div;
  return (
    <Comp
      type={as === 'button' ? 'button' : undefined}
      aria-label={label}
      disabled={disabled}
      className={className}
      onClick={onClick}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      transition={spring.snappy}
    >
      {children}
    </Comp>
  );
}

/** Text that types itself in once (for short headlines the page writes from the register). */
export function TypeIn({ text, className, speed = 14 }: { text: string; className?: string; speed?: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) {
      setN(text.length);
      return;
    }
    setN(0);
    let i = 0;
    const t = window.setInterval(() => {
      i += 2;
      setN(Math.min(text.length, i));
      if (i >= text.length) window.clearInterval(t);
    }, speed);
    return () => window.clearInterval(t);
  }, [text, reduce, speed]);
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      <span aria-hidden="true" className="opacity-0">
        {text.slice(n)}
      </span>
    </span>
  );
}
