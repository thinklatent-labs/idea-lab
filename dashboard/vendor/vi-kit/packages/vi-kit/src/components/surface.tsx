import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@vi/ui/lib/utils"

/** The VI surface: one of the glass levels, or opaque. Wraps any content; blocks compose this. */
export const surfaceVariants = cva("relative", {
  variants: {
    surface: {
      frame: "vi-surface-frame",
      content: "vi-surface-content",
      raised: "vi-surface-raised",
      coloured: "vi-surface-coloured",
      ink: "vi-surface-ink",
      opaque: "vi-surface-opaque",
    },
    padding: { none: "", sm: "p-4", md: "p-6", lg: "p-7" },
  },
  defaultVariants: { surface: "content", padding: "md" },
})

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof surfaceVariants> {}

export function Surface({ className, surface, padding, ...props }: SurfaceProps) {
  return <div data-slot="vi-surface" data-surface={surface ?? "content"} className={cn(surfaceVariants({ surface, padding }), className)} {...props} />
}
