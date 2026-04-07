import React from "react";
import { ErrorLayout } from "./ErrorLayout";

function LockedTerminal() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-background to-indigo-500/10">
      <div className="absolute inset-0 bg-grid-technical opacity-60" />
      <div className="absolute inset-0 bg-vignette" />

      <div className="absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-2xl border border-border bg-card/50 p-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Secure session
            </p>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
              <span className="h-2 w-2 rounded-full bg-amber-400/70" />
              <span className="h-2 w-2 rounded-full bg-rose-400/70" />
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-background/50 p-4 font-mono text-[12px] leading-6 text-foreground/90">
            <p>
              <span className="text-muted-foreground">$</span> auth status
            </p>
            <p className="text-rose-400/90">unauthorized: token missing</p>
            <p>
              <span className="text-muted-foreground">$</span> hint{" "}
              <span className="text-muted-foreground">(login)</span>
            </p>
            <p className="text-emerald-300/90">
              run: <span className="text-foreground/90">/dashboard/login</span>
              <span className="ag-blink">▌</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Error401() {
  return (
    <ErrorLayout
      status={401}
      title="Login required"
      message="You found a protected area. To continue, you’ll need to authenticate."
      hint="If you expected access here, try signing in again."
      actions={[
        { kind: "link", label: "Go Home", to: "/" },
        { kind: "link", label: "Go to Dashboard", to: "/dashboard" },
        { kind: "back", label: "Go Back" },
      ]}
      art={<LockedTerminal />}
    />
  );
}

