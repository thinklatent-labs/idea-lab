import * as React from "react"
import { cn } from "@vi/ui/lib/utils"

/** The VI row list: floating rows, no table chrome. Columns are a grid template; cells are render functions. */
export interface DataRowsProps<T> {
  rows: T[]
  columns: string
  render: (row: T) => React.ReactNode[]
  rowKey: (row: T) => string
  header?: React.ReactNode[]
  className?: string
}
export function DataRows<T>({ rows, columns, render, rowKey, header, className }: DataRowsProps<T>) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {header && (
        <div className="grid items-center gap-3.5 px-3.5 pb-1" style={{ gridTemplateColumns: columns }}>
          {header.map((h, i) => <div key={i} className="vi-caption uppercase tracking-wider">{h}</div>)}
        </div>
      )}
      {rows.map((r) => (
        <div key={rowKey(r)} className="grid items-center gap-3.5 rounded-[20px] border border-white/80 bg-white/70 px-3.5 py-3 dark:border-white/10 dark:bg-white/5" style={{ gridTemplateColumns: columns }}>
          {render(r).map((c, i) => <div key={i} className="min-w-0">{c}</div>)}
        </div>
      ))}
    </div>
  )
}

/** Facts: label/value pairs as rows. */
export function Facts({ items }: { items: [React.ReactNode, React.ReactNode][] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map(([k, v], i) => (
        <div key={i} className="flex items-center justify-between rounded-[20px] border border-white/80 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5">
          <span className="text-xs text-muted-foreground">{k}</span><span className="vi-num">{v}</span>
        </div>
      ))}
    </div>
  )
}
