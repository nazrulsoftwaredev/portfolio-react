import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type ErrorAction =
  | { kind: "link"; label: string; to: string }
  | { kind: "back"; label: string }
  | { kind: "reload"; label: string };

type ErrorLayoutProps = {
  status: number;
  title: string;
  message: string;
  hint?: string;
  actions?: ErrorAction[];
  art?: React.ReactNode;
  footer?: React.ReactNode;
};

export function ErrorLayout({
  status,
  title,
  message,
  hint,
  actions = [
    { kind: "link", label: "Go Home", to: "/" },
    { kind: "back", label: "Go Back" },
  ],
  art,
  footer,
}: ErrorLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-technical-fade opacity-70" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, var(--aura-1) 0%, transparent 45%), radial-gradient(circle at 80% 30%, var(--aura-3) 0%, transparent 40%), radial-gradient(circle at 50% 85%, var(--aura-2) 0%, transparent 45%)",
          }}
        />
        <div className="absolute inset-0 bg-vignette" />
      </div>

      <a
        href="#error-actions"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 rounded-lg bg-background px-3 py-2 text-sm font-semibold text-foreground shadow"
      >
        Skip to actions
      </a>

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-10">
        <header className="mb-10 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur hover:bg-card/60 transition-colors"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-primary/80" />
            <span>Portfolio</span>
          </Link>
        </header>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
              <span
                className="inline-flex h-2 w-2 rounded-full"
                style={{
                  background:
                    status >= 500
                      ? "color-mix(in oklab, var(--destructive) 75%, transparent)"
                      : "color-mix(in oklab, var(--primary) 70%, transparent)",
                }}
              />
              Error {status}
            </p>

            <h1 className="heading-lg">{title}</h1>
            <p className="max-w-xl text-base text-muted-foreground">{message}</p>
            {hint ? (
              <p className="max-w-xl text-sm text-muted-foreground/90">
                <span className="font-semibold text-foreground/90">Tip:</span>{" "}
                {hint}
              </p>
            ) : null}

            <div
              id="error-actions"
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              {actions.map((action, idx) => {
                if (action.kind === "link") {
                  return (
                    <Link
                      key={`${action.kind}-${idx}-${action.to}`}
                      to={action.to}
                      className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                    >
                      {action.label}
                    </Link>
                  );
                }

                if (action.kind === "back") {
                  return (
                    <button
                      key={`${action.kind}-${idx}`}
                      type="button"
                      onClick={() => navigate(-1)}
                      className="inline-flex items-center justify-center rounded-xl border border-border bg-card/30 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-card/50 transition-colors"
                    >
                      {action.label}
                    </button>
                  );
                }

                return (
                  <button
                    key={`${action.kind}-${idx}`}
                    type="button"
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-card/30 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-card/50 transition-colors"
                  >
                    {action.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-6">
              <div className="rounded-2xl border border-border bg-card/30 p-4 text-xs text-muted-foreground backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono">
                    <span className="text-foreground/80">Path:</span>{" "}
                    <span className="break-all">{location.pathname}</span>
                  </p>
                  <p className="font-mono">
                    <span className="text-foreground/80">When:</span>{" "}
                    {new Date().toLocaleString()}
                  </p>
                </div>
                {footer ? <div className="mt-3">{footer}</div> : null}
              </div>
            </div>
          </section>

          <aside className="relative">
            <div className="rounded-3xl border border-border bg-card/25 p-6 backdrop-blur">
              {art ?? (
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-destructive/10" />
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

