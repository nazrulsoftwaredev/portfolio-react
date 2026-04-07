import React from "react";
import { ErrorLayout } from "./ErrorLayout";

function Starfield() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950/60 via-background to-indigo-950/40">
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.55)_0_1px,transparent_1px),radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.35)_0_1px,transparent_1px),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.4)_0_1px,transparent_1px)] [background-size:180px_180px,220px_220px,260px_260px]" />
      <div className="absolute inset-0 ag-star-drift" />

      <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2">
        <div className="ag-float rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-bold tracking-widest text-white/70 uppercase">
                Navigation probe
              </p>
              <p className="text-sm font-semibold text-white">
                Signal lost. Reacquiring…
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/15 ag-pulse-soft" />
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-indigo-400/70 via-sky-300/60 to-transparent ag-scan" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Error404() {
  return (
    <ErrorLayout
      status={404}
      title="Page not found"
      message="This route drifted off the map. The page might have moved, been renamed, or never existed."
      hint="Try going home, or use the back button to return to safe orbit."
      art={<Starfield />}
    />
  );
}

