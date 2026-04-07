import React from "react";
import { ErrorLayout } from "./ErrorLayout";

type Error500Props = {
  errorId?: string | null;
  error?: Error | null;
  componentStack?: string | null;
  onReset?: () => void;
};

function GlitchCore() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/10 via-background to-indigo-500/10">
      <div className="absolute inset-0 bg-grid-technical opacity-55" />
      <div className="absolute inset-0 bg-vignette" />

      <div className="absolute inset-0 grid place-items-center">
        <div className="relative w-[86%] rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="absolute -inset-px rounded-2xl ag-glow-ring" />
          <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
            Crash signal
          </p>
          <div className="mt-3">
            <p className="text-4xl font-black tracking-tight text-foreground ag-glitch">
              500
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Something broke mid-flight. We captured the details.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-400/70 ag-pulse-soft" />
            <span className="h-2 w-2 rounded-full bg-amber-300/60 ag-pulse-soft ag-pulse-delay" />
            <span className="h-2 w-2 rounded-full bg-indigo-400/60 ag-pulse-soft ag-pulse-delay-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Error500({
  errorId,
  error,
  componentStack,
  onReset,
}: Error500Props) {
  const isDevelopment = import.meta.env.DEV;

  return (
    <ErrorLayout
      status={500}
      title="Something went wrong"
      message="We hit an unexpected error. It’s been recorded so it can be fixed."
      hint="Try again. If it keeps happening, go home and refresh later."
      actions={[
        ...(onReset ? [{ kind: "reload" as const, label: "Reload" }] : []),
        { kind: "link", label: "Go Home", to: "/" },
        { kind: "back", label: "Go Back" },
      ]}
      footer={
        <div className="space-y-3">
          {errorId ? (
            <p className="font-mono">
              <span className="text-foreground/80">Error ID:</span>{" "}
              <span className="text-primary break-all">{errorId}</span>
            </p>
          ) : null}

          {isDevelopment && (error || componentStack) ? (
            <details className="rounded-xl border border-border bg-background/40 p-3">
              <summary className="cursor-pointer text-xs font-semibold text-foreground/90">
                Error details (dev only)
              </summary>
              <div className="mt-3 space-y-3">
                {error ? (
                  <pre className="whitespace-pre-wrap break-words text-[11px] leading-5 text-rose-300/90">
                    {String(error)}
                  </pre>
                ) : null}
                {componentStack ? (
                  <pre className="whitespace-pre-wrap break-words text-[11px] leading-5 text-rose-300/80">
                    {componentStack}
                  </pre>
                ) : null}
              </div>
            </details>
          ) : null}

          {onReset ? (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card/30 px-4 py-2 text-xs font-semibold text-foreground hover:bg-card/50 transition-colors"
            >
              Try again (reset)
            </button>
          ) : null}
        </div>
      }
      art={<GlitchCore />}
    />
  );
}

