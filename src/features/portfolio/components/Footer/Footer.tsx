import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { SocialLink } from "@/shared/components/common/SocialLink";
import { FOOTER_DATA_SHAPE } from "@/shared/types";
import { Link } from "react-router-dom";

const FooterComponent = ({ data = {} }) => {
  const currentYear = new Date().getFullYear();
  const name = data?.name || "MD Nazrul Islam";

  const socials = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nazrulsoftwaredev/",
      iconName: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/nazrulsoftwaredev",
      iconName: "github",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/nazrulilam3144/",
      iconName: "facebook",
    },
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Expertise", href: "#expertise" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="pt-24 md:pt-28 pb-14 px-8 md:px-16 bg-background relative overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-20">
        {/* Top Section: Editorial Connect */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 0.3, x: 0 }}
              className="section-label mb-12 block"
            >
              Let's Connect — {currentYear}
            </motion.div>
            <h3 className="heading-xxl font-heading tracking-tighter leading-[0.85] mb-8">
              Building{" "}
              <span className="font-serif italic font-normal text-primary tracking-tight">
                digital experiences
              </span>
              <br />
              that matter.
            </h3>
            <p className="text-on-surface-variant text-lg font-light tracking-wide leading-relaxed opacity-50 max-w-md">
              Building digital products with a focus on motion, performance, and
              human-centric design.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30">
                Quick Links
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-[11px] font-black uppercase tracking-[0.25em] opacity-50 hover:opacity-100 hover:text-primary transition-all duration-500"
                    data-cursor="hover"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="pt-6 border-t border-border/40">
                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] opacity-60 hover:opacity-100 hover:text-primary transition-all duration-500"
                  data-cursor="hover"
                >
                  Start Project
                  <span className="w-10 h-10 rounded-full bg-card/40 border border-border/40 flex items-center justify-center">
                    ↗
                  </span>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30">
                Social
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-8">
                {socials.map((social) => (
                  <SocialLink
                    key={social.label}
                    href={social.href}
                    label={social.label}
                    iconName={social.iconName}
                    openInNewTab
                    iconClassName="w-3.5 h-3.5"
                    magneticIntensity={null}
                    className="group flex flex-col gap-3 text-[11px] font-black uppercase tracking-[0.3em] hover:text-primary transition-all duration-500"
                    iconWrapperClassName="opacity-30 group-hover:opacity-100 transition-all duration-700 bg-card/40 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Auto Year & Credit */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-12 border-t border-border/40 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
          <div className="flex items-center gap-8">
            <span className="hover:opacity-100 transition-opacity cursor-default">
              © {currentYear} // {name}
            </span>
            <div className="w-12 h-px bg-border/60" />
            <span className="italic font-serif normal-case tracking-normal">
              Digital Architect
            </span>
          </div>

          <div className="flex items-center gap-8 italic font-serif normal-case tracking-normal opacity-60">
            Handcrafted in{" "}
            <span className="underline decoration-primary/40 underline-offset-8">
              Dhaka
            </span>{" "}
            // Modern Web Vision
          </div>
        </div>
      </div>

      {/* Atmospheric localized aura */}
      <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[70%] h-[300px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
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
