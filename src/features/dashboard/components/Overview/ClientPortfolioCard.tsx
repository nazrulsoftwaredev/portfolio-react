import { clientPortfolio } from "./overviewData";

export const ClientPortfolioCard = () => {
  return (
    <div className="premium-card !p-0 overflow-hidden">
      <div className="p-8 flex items-center justify-between border-b border-border">
        <h3 className="text-xl font-display font-semibold tracking-tight text-foreground">
          Client portfolio
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-2xl border-4 border-background bg-muted overflow-hidden"
              >
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`}
                  alt="Client"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="w-10 h-10 rounded-2xl bg-muted border border-border flex items-center justify-center text-[10px] font-semibold text-primary">
            +6
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-muted-foreground text-xs font-medium bg-muted/30">
              <th className="px-8 py-4">Client Name</th>
              <th className="px-8 py-4">Industry</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4">Client Value</th>
              <th className="px-8 py-4 text-right">Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {clientPortfolio.map((client) => (
              <tr key={client.name} className="group hover:bg-muted/30">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs border border-primary/20">
                      {client.name[0]}
                    </div>
                    <span className="font-semibold text-sm tracking-tight text-foreground">
                      {client.name}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-xs font-medium text-muted-foreground">
                  {client.type}
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                    {client.status}
                  </span>
                </td>
                <td className="px-8 py-6 font-display font-semibold text-sm text-foreground tabular-nums">
                  {client.value}
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="text-emerald-600 font-semibold text-sm">
                    {client.growth}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
