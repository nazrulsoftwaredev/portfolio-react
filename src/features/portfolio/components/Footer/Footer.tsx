import React from "react";
import PropTypes from "prop-types";
import { motion } from "motion/react";
import { FOOTER_DATA_SHAPE } from "@/shared/types";

const FooterComponent = ({ data = {} }) => {
  const currentYear = new Date().getFullYear();
  const name = data?.name || "MD Nazrul Islam";

  return (
    <footer className="pt-14 md:pt-16 pb-10 md:pb-12 px-6 md:px-12 bg-background relative">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 text-[10px] font-bold uppercase tracking-[0.35em]"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <span className="font-heading text-sm md:text-base tracking-[0.06em] normal-case opacity-85 transition-opacity duration-300 hover:opacity-100">
            {name}
          </span>
          <div className="w-8 md:w-10 h-px bg-border/60" />
          <span className="opacity-45 transition-opacity duration-300 hover:opacity-70">
            Digital Architect
          </span>
        </div>

        <span className="opacity-45 transition-opacity duration-300 hover:opacity-70">
          © {currentYear}
        </span>
      </motion.div>
    </footer>
  );
};

FooterComponent.propTypes = {
  data: FOOTER_DATA_SHAPE,
};

FooterComponent.defaultProps = {
  data: {},
};

export const Footer = React.memo(FooterComponent);
