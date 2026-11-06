import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@kit/ui/lib/utils"

/** The kit surface: one of the glass levels, or opaque. Wraps any content; blocks compose this. */
export const surfaceVariants = cva("relative", {
  variants: {
    surface: {
      frame: "kit-surface-frame",
      content: "kit-surface-content",
      raised: "kit-surface-raised",
      coloured: "kit-surface-coloured",
      ink: "kit-surface-ink",
      opaque: "kit-surface-opaque",
    },
    padding: { none: "", sm: "p-4", md: "p-6", lg: "p-7" },
  },
  defaultVariants: { surface: "content", padding: "md" },
})

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof surfaceVariants> {}

export function Surface({ className, surface, padding, ...props }: SurfaceProps) {
  return <div data-slot="kit-surface" data-surface={surface ?? "content"} className={cn(surfaceVariants({ surface, padding }), className)} {...props} />
}
