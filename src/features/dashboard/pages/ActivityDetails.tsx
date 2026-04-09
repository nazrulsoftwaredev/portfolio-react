import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  FileText,
  MessageSquare,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { PageHeader } from "../components/common";
import {
  recentActivities,
  type ActivityType,
} from "../components/Overview/overviewData";

const destinationByType: Record<ActivityType, string> = {
  invoice: "/dashboard/invoices",
  client: "/dashboard/clients",
  message: "/dashboard/messages",
};

const typeMeta: Record<
  ActivityType,
  {
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    tone: string;
  }
> = {
  invoice: {
    label: "Invoice activity",
    description: "Payment and billing updates related to your clients.",
    icon: FileText,
    tone: "text-emerald-500",
  },
  client: {
    label: "Client activity",
    description: "Relationship and profile changes from your client pipeline.",
    icon: Building2,
    tone: "text-blue-500",
  },
  message: {
    label: "Message activity",
    description: "Conversation updates from contacts and prospects.",
    icon: MessageSquare,
    tone: "text-amber-500",
  },
};

export const ActivityDetails: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reduceMotion = useReducedMotion();

  const typeParam = searchParams.get("type");
  const labelParam = searchParams.get("label");

  const selectedType =
    typeParam === "invoice" || typeParam === "client" || typeParam === "message"
      ? typeParam
      : null;

  const activity = React.useMemo(() => {
    if (!selectedType || !labelParam) {
      return null;
    }

    return (
      recentActivities.find(
        (item) => item.type === selectedType && item.label === labelParam,
      ) ?? null
    );
  }, [labelParam, selectedType]);

  if (!activity || !selectedType) {
    return (
      <div className="dash-stack">
        <PageHeader
          title="Activity details"
          subtitle="We could not find that activity event."
          titleClassName="text-2xl sm:text-3xl lg:text-4xl"
        />
        <div className="premium-card dash-card-pad space-y-4">
          <p className="text-sm text-muted-foreground">
            The selected item may have been removed or the link is incomplete.
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard/activity")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground min-h-11 px-4 text-xs font-semibold hover:opacity-95 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to activity
          </button>
        </div>
      </div>
    );
  }

  const meta = typeMeta[selectedType];
  const TypeIcon = meta.icon;

  return (
    <motion.div
      className="dash-stack"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
      >
        <PageHeader
          className="gap-5 md:gap-6"
          title="Activity details"
          titleClassName="text-2xl sm:text-3xl lg:text-4xl"
          subtitle="Full context for this event and quick next actions."
        />
      </motion.div>

      <motion.div
        className="premium-card !p-0 overflow-hidden"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
      >
        <div className="dash-card-pad border-b border-border/60 bg-muted/10">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3 md:gap-4">
              <div className={`p-3 rounded-xl ${activity.color}`}>
                <activity.icon className={`w-6 h-6 ${activity.textColor}`} />
              </div>
              <div className="min-w-0">
                <p className="text-lg md:text-xl font-display font-semibold tracking-tight text-foreground break-words">
                  {activity.label}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1 break-words">
                  {activity.client ||
                    activity.industry ||
                    activity.preview ||
                    "No secondary context"}
                </p>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1.5 text-xs font-semibold ${meta.tone}`}
            >
              <TypeIcon className="w-3.5 h-3.5" />
              {meta.label}
            </span>
          </div>
        </div>

        <div className="dash-card-pad grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
          <div className="rounded-xl bg-muted/20 px-4 py-3.5 space-y-1.5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">
              Category
            </p>
            <p className="text-sm font-semibold text-foreground capitalize">
              {activity.type}
            </p>
          </div>

          <div className="rounded-xl bg-muted/20 px-4 py-3.5 space-y-1.5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">
              Reference
            </p>
            <p className="text-sm font-semibold text-foreground break-words">
              {activity.label}
            </p>
          </div>

          <div className="rounded-xl bg-muted/20 px-4 py-3.5 space-y-1.5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">
              Amount / Value
            </p>
            <p className="text-sm font-semibold text-emerald-500">
              {activity.amount || "Not available"}
            </p>
          </div>
        </div>

        <div className="dash-card-pad border-t border-border/60 bg-muted/5 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate(destinationByType[activity.type])}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground min-h-11 px-4 text-xs font-semibold hover:opacity-95 transition"
          >
            Open related page
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard/activity")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-muted/30 text-foreground min-h-11 px-4 text-xs font-semibold hover:bg-muted/50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to activity
          </button>

          <p className="w-full text-xs text-muted-foreground md:w-auto md:ml-auto">
            {meta.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
