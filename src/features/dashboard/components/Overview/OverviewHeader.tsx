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
  const today = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <PageHeader
      className="gap-5 md:gap-6"
      title="Operations Overview"
      titleClassName="text-2xl sm:text-3xl lg:text-4xl"
      subtitle={
        <div className="flex flex-wrap items-center gap-2.5 text-sm text-muted-foreground">
          <span className="inline-flex items-center rounded-full bg-muted/40 px-3 py-1 text-xs font-semibold tracking-wide text-foreground">
            Executive Dashboard
          </span>
          <span className="text-xs font-medium">Reporting date: {today}</span>
        </div>
      }
      actions={
        <>
          <div className="text-xs font-medium text-muted-foreground w-full sm:w-auto">
            Last refresh: <span className="text-foreground">Just now</span>
          </div>
          <Button
            variant="outline"
            className="gap-2 min-h-11 border-transparent bg-muted/20 hover:bg-muted/30"
            type="button"
            onClick={onNewInvoice}
          >
            <Plus className="w-4 h-4" />
            New Invoice
          </Button>
          <Button
            className="gap-2 min-h-11"
            type="button"
            onClick={onNewProject}
          >
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </>
      }
    />
  );
};
