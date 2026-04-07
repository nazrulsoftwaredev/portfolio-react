import {
  ClientPortfolioCard,
  OverviewHeader,
  OverviewStatsGrid,
  RecentActivityCard,
  RevenueInsightsCard,
} from "@/features/dashboard/components/Overview";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { ActivityType } from "@/features/dashboard/components/Overview/overviewData";

export const Overview: React.FC = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const handleNewInvoice = () => {
    navigate("/dashboard/invoices");
  };

  const handleNewProject = () => {
    navigate("/dashboard/pipeline");
  };

  const handleViewAllActivity = () => {
    navigate("/dashboard/activity");
  };

  const handleActivityClick = (type: ActivityType, label: string) => {
    void type;
    navigate(`/dashboard/activity?focus=${encodeURIComponent(label)}`);
  };

  const handleStatClick = (label: string) => {
    if (label === "Monthly Revenue" || label === "Pending Invoices") {
      navigate("/dashboard/invoices");
      return;
    }

    if (label === "Active Clients") {
      navigate("/dashboard/clients");
      return;
    }

    navigate("/dashboard/pipeline");
  };

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
        <OverviewHeader
          onNewInvoice={handleNewInvoice}
          onNewProject={handleNewProject}
        />
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
      >
        <OverviewStatsGrid onStatClick={handleStatClick} />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 xl:grid-cols-3 dash-grid-gap"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
      >
        <RevenueInsightsCard />
        <RecentActivityCard
          onViewAll={handleViewAllActivity}
          onActivityClick={handleActivityClick}
        />
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
      >
        <ClientPortfolioCard />
      </motion.div>
    </motion.div>
  );
};
