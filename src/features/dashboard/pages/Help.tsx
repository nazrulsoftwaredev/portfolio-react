import React from "react";
import { BookOpen, LifeBuoy, MessageCircleQuestion } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { PageHeader } from "../components/common";

const helpCards = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Browse product guides and workflow patterns.",
    action: "Open docs",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    description: "Send a request to the support queue.",
    action: "Contact support",
  },
  {
    icon: MessageCircleQuestion,
    title: "FAQ",
    description: "Common questions and quick answers.",
    action: "View FAQ",
  },
];

export const Help: React.FC = () => {
  const [query, setQuery] = React.useState("");

  return (
    <div className="dash-stack">
      <div>
        <PageHeader
          className="gap-5 md:gap-6"
          title={
            <>
              Help center <br />
              & resources
            </>
          }
          titleClassName="text-2xl sm:text-3xl lg:text-4xl"
          subtitle="Search docs, browse FAQs, or reach support."
          actions={
            <div className="relative w-full sm:w-96">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search help topics"
                className="bg-background border border-border rounded-xl"
              />
            </div>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 dash-grid-gap">
        {helpCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="premium-card dash-card-pad space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-display font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Button type="button" variant="outline" className="w-full">
                  {card.action}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="premium-card dash-card-pad space-y-4">
        <h3 className="text-base font-display font-semibold tracking-tight text-foreground">
          Quick tips
        </h3>
        <p className="text-xs text-muted-foreground">
          Keyboard: <span className="font-semibold">Cmd/Ctrl</span> +{" "}
          <span className="font-semibold">K</span> to focus search, then type a
          page name to navigate.
        </p>

        {query.trim() ? (
          <div className="rounded-2xl border border-border bg-muted/20 p-5">
            <p className="text-sm font-semibold text-foreground">
              Searching for: <span className="text-primary">{query}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              This page is a stub—wire a real help search backend when ready.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

