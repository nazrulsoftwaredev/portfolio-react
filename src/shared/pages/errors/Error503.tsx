import React from "react";
import { ErrorLayout } from "./ErrorLayout";

function MaintenanceBot() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500/10 via-background to-violet-500/10">
      <div className="absolute inset-0 bg-grid-technical opacity-55" />
      <div className="absolute inset-0 bg-vignette" />

      <div className="absolute left-1/2 top-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2">
        <div className="ag-wobble rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-2xl bg-background/50 border border-border grid place-items-center">
              <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary/15 border border-border grid place-items-center">
                <span className="ag-gear text-xs">⚙</span>
              </div>
              <span className="text-2xl">🤖</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Maintenance mode
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                Tuning things up…
                <span className="inline-flex items-center" aria-hidden="true">
                  <span className="ag-blink ml-1">.</span>
                  <span className="ag-blink [animation-delay:0.15s]">.</span>
                  <span className="ag-blink [animation-delay:0.3s]">.</span>
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                We’ll be back shortly.
              </p>
            </div>
          </div>

          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted/35">
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-sky-400/60 via-violet-400/55 to-transparent ag-scan" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Error503() {
  return (
    <ErrorLayout
      status={503}
      title="Temporarily unavailable"
      message="The service is taking a quick breather for maintenance (or a short outage)."
      hint="Try reloading in a moment. If the issue persists, come back later."
      actions={[
        { kind: "reload", label: "Retry" },
        { kind: "link", label: "Go Home", to: "/" },
        { kind: "back", label: "Go Back" },
      ]}
      art={<MaintenanceBot />}
    />
  );
}

