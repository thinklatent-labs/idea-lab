import * as React from "react"
import { CircleCheck, Info, MinusCircle, OctagonX, TriangleAlert } from "lucide-react"
import { cn } from "@vi/ui/lib/utils"

/** Status is always glyph plus word. Hue is additional and never the only cue. Critical is the decision colour. */
export const STATUS = {
  good: { word: "Good", Icon: CircleCheck, className: "text-[var(--vi-companion)]" },
  warning: { word: "Warning", Icon: TriangleAlert, className: "text-[#D08A4A]" },
  critical: { word: "Critical", Icon: OctagonX, className: "text-[var(--vi-decision)]" },
  info: { word: "Info", Icon: Info, className: "text-[#477C8B]" },
  neutral: { word: "Neutral", Icon: MinusCircle, className: "text-muted-foreground" },
} as const

export type StatusTone = keyof typeof STATUS

export function Status({ tone, word, className }: { tone: StatusTone; word?: string; className?: string }) {
  const { Icon, word: w, className: c } = STATUS[tone]
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", c, className)}>
      <Icon className="size-3.5" aria-hidden="true" />
      <span className="text-foreground/80">{word ?? w}</span>
    </span>
  )
}

/** Intervals are one unit: 0.82 ± 0.03. Unmeasured is an em dash with a reason. */
export function Interval({ value, pm, reason }: { value?: number; pm?: number; reason?: string }) {
  if (value == null) return <span className="vi-num text-muted-foreground" title={reason ?? "not measured"}>—</span>
  return (
    <span className="vi-num whitespace-nowrap">
      {value.toFixed(2)}
      {pm != null && <span className="text-muted-foreground"> ± {pm.toFixed(2)}</span>}
    </span>
  )
}
