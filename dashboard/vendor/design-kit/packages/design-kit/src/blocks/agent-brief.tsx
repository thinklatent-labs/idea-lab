import * as React from "react"
import { Bot } from "lucide-react"
import { Surface } from "../components/surface"

/** Agents propose; people decide. Every agent output carries the agent chip, confidence, a basis line and sources. */
export function AgentBrief({ agent, confidence, time, headline, tail, children, actions, coloured = true }: {
  agent: string; confidence: string; time: string; headline: React.ReactNode; tail?: React.ReactNode; children?: React.ReactNode; actions?: React.ReactNode; coloured?: boolean
}) {
  return (
    <Surface surface={coloured ? "coloured" : "content"} className="flex min-h-[300px] flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="kit-caption inline-flex items-center gap-2 text-current/75"><span className="inline-flex size-7 items-center justify-center rounded-full border border-current/40"><Bot className="size-3.5" /></span>{agent} · {confidence}</span>
          <span className="text-xs text-current/70">{time}</span>
        </div>
        <p className="mt-5 max-w-[560px] text-2xl leading-snug">{headline}{tail && <span className="opacity-70"> {tail}</span>}</p>
      </div>
      <div>{children}{actions && <div className="mt-4 flex flex-wrap gap-2">{actions}</div>}</div>
    </Surface>
  )
}
