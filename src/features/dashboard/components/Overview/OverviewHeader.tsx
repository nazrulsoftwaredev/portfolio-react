import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { PageHeader } from "../common";

interface OverviewHeaderProps {
  onNewInvoice: () => void;
  onNewProject: () => void;
}

export const OverviewHeader = ({
  onNewInvoice,
  onNewProject,
}: OverviewHeaderProps) => {
  return (
    <PageHeader
      className="gap-6"
      title={
        <>
          Business <br />
          command center
        </>
      }
      titleClassName="text-3xl md:text-4xl"
      subtitle={
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Operations active
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
            Live overview
          </span>
        </div>
      }
      actions={
        <>
          <div className="text-xs font-medium text-muted-foreground">
            Last sync: <span className="text-foreground">2m ago</span>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            type="button"
            onClick={onNewInvoice}
          >
            <Plus className="w-4 h-4" />
            New Invoice
          </Button>
          <Button className="gap-2" type="button" onClick={onNewProject}>
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </>
      }
    />
  );
};
