import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/features/portfolio/components/Magnetic";
import { SocialLink } from "@/shared/components/common/SocialLink";
import { ArrowUpRight, Globe, Clock, MapPin } from "lucide-react";

export const Contact = ({ data = {} }) => {
  const email = data.email || "hello@mdnazrul.com";
  const formatDhakaTime = () =>
    new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Dhaka",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
  const [currentTime, setCurrentTime] = useState(formatDhakaTime);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(formatDhakaTime());
    }, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const socials = [
    {
      name: "GitHub",
      iconName: "github",
      href: "https://github.com/nazrulsoftwaredev",
    },
    {
      name: "LinkedIn",
      iconName: "linkedin",
      href: "https://www.linkedin.com/in/nazrulsoftwaredev/",
    },
    {
      name: "Facebook",
      iconName: "facebook",
      href: "https://www.facebook.com/nazrulilam3144/",
    },
  ];

  return (
    <section
      className="py-24 md:py-32 px-6 md:px-12 bg-background relative overflow-hidden group"
      id="contact"
    >
      {/* Technical Grid Background */}
      <div className="absolute inset-0 bg-grid-technical-fade opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.4, x: 0 }}
            viewport={{ once: true }}
            className="section-label mb-4 block"
          >
            Contact
          </motion.span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="text-5xl md:text-7xl font-heading leading-[0.9] tracking-tight">
              Let’s ship <br /> something great.
            </h2>
            <p className="text-on-surface-variant text-lg font-light tracking-wide leading-relaxed opacity-55 max-w-xl">
              If you have a project in mind, I’ll help you turn it into a clean,
              high-performing product with sharp UX and smooth motion.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Statement & Portal */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border/40 bg-surface/20 p-6">
                <div className="text-[10px] font-bold tracking-[0.35em] uppercase opacity-30 mb-3">
                  Primary
                </div>
                <div className="text-sm text-on-surface-variant opacity-55 mb-2">
                  Email
                </div>
                <div className="font-serif italic text-xl tracking-tight">
                  {email}
                </div>
              </div>
              <div className="rounded-2xl border border-border/40 bg-surface/20 p-6">
                <div className="text-[10px] font-bold tracking-[0.35em] uppercase opacity-30 mb-3">
                  Response
                </div>
                <div className="text-sm text-on-surface-variant opacity-55 mb-2">
                  Typical
                </div>
                <div className="font-serif italic text-xl tracking-tight">
                  24–48 hours
                </div>
              </div>
            </div>

            {/* Magnetic Contact Portal */}
            <div className="relative w-full max-w-2xl">
              <Magnetic intensity={0.15}>
                <motion.a
                  href={`mailto:${email}`}
                  data-cursor="hover"
                  className="group/portal relative flex items-center gap-8 py-8 px-12 rounded-2xl bg-surface/30 border border-border/40 hover:border-primary/30 transition-colors duration-500 overflow-hidden"
                >
                  {/* Glass highlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.06] to-transparent opacity-0 group-hover/portal:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-2">
                      INITIATE_CONTACT
                    </span>
                    <span className="text-2xl md:text-4xl font-serif italic tracking-tight">
                      {email}
                    </span>
                  </div>

                  <div className="relative z-10 ml-auto p-4 md:p-6 rounded-full bg-primary text-background group-hover/portal:rotate-45 transition-transform duration-500">
                    <ArrowUpRight
                      strokeWidth={2.5}
                      size={32}
                      className="w-6 h-6 md:w-8 md:h-8"
                    />
                  </div>
                </motion.a>
              </Magnetic>

              {/* Decorative technical lines */}
              <div className="absolute -left-4 -top-4 w-8 h-8 border-t border-l border-primary/20" />
              <div className="absolute -right-4 -bottom-4 w-8 h-8 border-b border-r border-primary/20" />
            </div>
          </div>

          {/* Social Cluster & Metadata Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:pt-2">
            {/* Social Grid */}
            <div className="space-y-6">
              <div className="flex items-end justify-between gap-6">
                <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted-foreground/60">
                  Network
                </h4>
                <div className="hidden sm:block text-[10px] font-bold tracking-[0.35em] uppercase opacity-25">
                  Follow / DM
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {socials.map((social) => (
                  <SocialLink
                    key={social.name}
                    href={social.href}
                    label={social.name}
                    iconName={social.iconName}
                    openInNewTab
                    iconClassName="w-5 h-5"
                    magneticIntensity={0.4}
                    className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-surface/20 border border-border/40 hover:bg-surface/40 hover:text-primary transition-colors duration-300 gap-3"
                    labelClassName="text-[9px] font-bold tracking-widest uppercase opacity-40"
                  />
                ))}
              </div>
            </div>

            {/* Technical Metadata Table */}
            <div className="rounded-3xl border border-border/40 bg-surface/20 p-7 md:p-8">
              <div className="flex items-center justify-between gap-6 mb-6">
                <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted-foreground/60">
                  Logistics
                </h4>
                <div className="text-[10px] font-bold tracking-[0.35em] uppercase opacity-25">
                  Snapshot
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between gap-6 group/meta">
                  <div className="flex items-center gap-3 text-on-surface-variant/45">
                    <MapPin
                      size={14}
                      className="group-hover/meta:text-primary transition-colors"
                    />
                    <span className="text-[11px] font-bold tracking-wider uppercase">
                      Location
                    </span>
                  </div>
                  <span className="text-[11px] font-mono tracking-wider">
                    DHAKA, BD
                  </span>
                </div>

                <div className="flex items-center justify-between gap-6 group/meta">
                  <div className="flex items-center gap-3 text-on-surface-variant/45">
                    <Clock
                      size={14}
                      className="group-hover/meta:text-primary transition-colors"
                    />
                    <span className="text-[11px] font-bold tracking-wider uppercase">
                      Local Time
                    </span>
                  </div>
                  <span className="text-[11px] font-mono tracking-wider uppercase">
                    {currentTime} (GMT+6)
                  </span>
                </div>

                <div className="flex items-center justify-between gap-6 group/meta">
                  <div className="flex items-center gap-3 text-on-surface-variant/45">
                    <Globe
                      size={14}
                      className="group-hover/meta:text-primary transition-colors"
                    />
                    <span className="text-[11px] font-bold tracking-wider uppercase">
                      Status
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-500/80">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/[0.03] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-aura-1 blur-[80px] opacity-10 pointer-events-none" />
    </section>
  );
};

