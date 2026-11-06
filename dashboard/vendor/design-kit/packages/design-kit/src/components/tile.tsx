import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@kit/ui/lib/utils"
import { Button } from "@kit/ui/components/button"
import { Surface, type SurfaceProps } from "./surface"

/** The kit's tile atom: ring icon top-left, round arrow top-right, display number bottom-left, a mono sparkline bottom-right. */
export interface TileProps extends Omit<SurfaceProps, "title"> {
  icon: React.ReactNode
  title: React.ReactNode
  value: React.ReactNode
  unit?: React.ReactNode
  spark?: React.ReactNode
  onOpen?: () => void
  tone?: "default" | "ink" | "coloured"
  /** 52 for numbers (default); 36 for short words such as "Medium" */
  valueSize?: 52 | 36
  /** one line under the number, for context that is not a unit */
  caption?: React.ReactNode
}

export function Tile({ icon, title, value, unit, spark, onOpen, tone = "default", valueSize = 52, caption, className, ...props }: TileProps) {
  return (
    <Surface
      surface={tone === "coloured" ? "coloured" : tone === "ink" ? "ink" : "content"}
      padding="none"
      className={cn("flex min-h-[188px] flex-col justify-between p-[22px_22px_20px]", className)}
      {...props}
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex size-9 items-center justify-center rounded-full border border-current/20 [&_svg]:size-[18px]">{icon}</span>
        {onOpen && (
          <Button size="icon" variant={tone === "ink" ? "secondary" : "ghost"} className="rounded-full" aria-label="Open" onClick={onOpen}>
            <ArrowUpRight />
          </Button>
        )}
      </div>
      <div className="mt-3.5 text-[15px] font-medium">{title}</div>
      <div className="flex min-w-0 items-end justify-between gap-2.5">
        <div className="min-w-0">
          <div className={cn("kit-display kit-num whitespace-nowrap", valueSize === 52 ? "text-[52px]" : "text-[36px] leading-tight")}>
            {value}
            {unit && <span className="ml-1 text-base font-normal tracking-normal opacity-60">{unit}</span>}
          </div>
          {caption && <div className="mt-1.5 text-xs opacity-60">{caption}</div>}
        </div>
        {spark && <div className="shrink-0">{spark}</div>}
      </div>
    </Surface>
  )
}
