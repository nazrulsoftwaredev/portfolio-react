import { PanelCard } from "../common";
import { clientPortfolio } from "./overviewData";

export const ClientPortfolioCard = () => {
  return (
    <PanelCard
      className="p-5 md:p-6"
      contentClassName="space-y-4"
      title="Client portfolio"
      subtitle="Active accounts, health status, and growth trend"
      actions={
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-lg bg-muted overflow-hidden ring-2 ring-background"
              >
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 171}`}
                  alt="Client"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="h-8 rounded-lg bg-muted/60 px-2.5 text-[11px] font-semibold text-primary flex items-center">
            +6 accounts
          </div>
        </div>
      }
    >
      <div className="text-xs text-muted-foreground sm:hidden">
        Mobile summary view
      </div>

      <div className="space-y-3 sm:hidden">
        {clientPortfolio.map((client) => (
          <article key={client.name} className="rounded-xl bg-muted/20 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs border border-primary/20">
                  {client.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {client.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{client.type}</p>
                </div>
              </div>
              <span className="inline-flex min-h-7 items-center px-2.5 py-1 rounded-full text-xs font-semibold border border-transparent bg-emerald-500/10 text-emerald-600">
                {client.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-muted/40 px-3 py-2">
                <p className="text-muted-foreground">Client Value</p>
                <p className="mt-1 font-semibold text-foreground tabular-nums">
                  {client.value}
                </p>
              </div>
              <div className="rounded-lg bg-muted/40 px-3 py-2">
                <p className="text-muted-foreground">Growth</p>
                <p className="mt-1 font-semibold text-emerald-500">
                  {client.growth}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden sm:block overflow-x-auto rounded-xl bg-muted/10">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="text-muted-foreground text-xs font-semibold uppercase tracking-wide bg-muted/30">
              <th className="px-4 md:px-5 py-3.5">Client Name</th>
              <th className="px-4 md:px-5 py-3.5">Industry</th>
              <th className="px-4 md:px-5 py-3.5">Status</th>
              <th className="px-4 md:px-5 py-3.5">Client Value</th>
              <th className="px-4 md:px-5 py-3.5 text-right">Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {clientPortfolio.map((client) => (
              <tr
                key={client.name}
                className="group hover:bg-muted/20 transition-colors"
              >
                <td className="px-4 md:px-5 py-4 md:py-[18px]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs border border-primary/20">
                      {client.name[0]}
                    </div>
                    <span className="font-semibold text-sm text-foreground">
                      {client.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 md:px-5 py-4 md:py-[18px] text-xs font-medium text-muted-foreground">
                  {client.type}
                </td>
                <td className="px-4 md:px-5 py-4 md:py-[18px]">
                  <span className="inline-flex min-h-7 items-center px-2.5 py-1 rounded-full text-xs font-semibold border border-transparent bg-emerald-500/10 text-emerald-600">
                    {client.status}
                  </span>
                </td>
                <td className="px-4 md:px-5 py-4 md:py-[18px] font-display font-semibold text-sm text-foreground tabular-nums">
                  {client.value}
                </td>
                <td className="px-4 md:px-5 py-4 md:py-[18px] text-right">
                  <span className="text-emerald-500 font-semibold text-sm">
                    {client.growth}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelCard>
  );
};
