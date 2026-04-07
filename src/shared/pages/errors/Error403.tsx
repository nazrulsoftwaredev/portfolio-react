import React from "react";
import { ErrorLayout } from "./ErrorLayout";

function Barrier() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/10 via-background to-amber-500/10">
      <div className="absolute inset-0 bg-grid-technical opacity-50" />
      <div className="absolute inset-0 bg-vignette" />

      <div className="absolute left-1/2 top-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-2xl border border-border bg-card/45 p-6 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Access control
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                Clearance denied
              </p>
            </div>
            <div className="h-12 w-12 rounded-2xl border border-border bg-background/40 grid place-items-center">
              <span className="text-lg font-black text-foreground/80">⛔</span>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted/40">
              <div className="h-full w-full bg-gradient-to-r from-rose-500/50 via-amber-400/40 to-rose-500/50 ag-barrier" />
            </div>
            <div className="h-3 w-5/6 overflow-hidden rounded-full bg-muted/30">
              <div className="h-full w-full bg-gradient-to-r from-amber-400/35 via-rose-500/35 to-amber-400/35 ag-barrier ag-barrier-delay" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Error403() {
  return (
    <ErrorLayout
      status={403}
      title="You can’t go there"
      message="This page is real — it’s just not available for your current permissions."
      hint="If you think this is a mistake, try a different account or contact support."
      actions={[
        { kind: "link", label: "Go Home", to: "/" },
        { kind: "link", label: "Dashboard", to: "/dashboard" },
        { kind: "back", label: "Go Back" },
      ]}
      art={<Barrier />}
    />
  );
}

