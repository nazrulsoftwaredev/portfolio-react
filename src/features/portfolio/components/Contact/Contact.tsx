import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Magnetic } from "@/features/portfolio/components/Magnetic";
import { CONTACT_DATA_SHAPE } from "@/shared/types";
import { SocialLink } from "@/shared/components/common/SocialLink";
import { ArrowUpRight, Globe, Clock, MapPin } from 'lucide-react';

export const Contact = ({ data = {} }) => {
  const email = data.email || 'hello@mdnazrul.com';

  // Real-time metadata (simulated)
  const currentTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Dhaka',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  });

  const socials = [
    { name: 'GitHub', iconName: 'github', href: '#' },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-background relative overflow-hidden group" id="contact">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 bg-grid-technical opacity-[0.03] pointer-events-none" />

      {/* Scanner animation */}
      <motion.div
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-10 opacity-30"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-end">

          {/* Main Statement & Portal */}
          <div className="lg:col-span-8 flex flex-col gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-primary text-xs font-bold tracking-[0.5em] uppercase flex items-center gap-4">
                <span className="w-12 h-px bg-primary/30" />
                Next Chapter
              </h3>
              <h2 className="heading-md font-heading leading-[0.95] tracking-tighter uppercase text-on-surface/80">
                Ready to <span className="text-primary italic font-serif lowercase tracking-normal font-normal">collaborate?</span>
              </h2>
            </motion.div>

            {/* Magnetic Contact Portal */}
            <div className="relative w-full max-w-2xl">
              <Magnetic intensity={0.15}>
                <motion.a
                  href={`mailto:${email}`}
                  data-cursor="hover"
                  className="group/portal relative flex items-center gap-8 py-8 px-12 rounded-2xl bg-surface/30 border border-white/5 hover:border-primary/30 transition-colors duration-500 overflow-hidden"
                >
                  {/* Glass highlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover/portal:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-2">INITIATE_CONTACT</span>
                    <span className="text-2xl md:text-4xl font-serif italic tracking-tight">{email}</span>
                  </div>

                  <div className="relative z-10 ml-auto p-4 md:p-6 rounded-full bg-primary text-background group-hover/portal:rotate-45 transition-transform duration-500">
                    <ArrowUpRight strokeWidth={2.5} size={32} className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </motion.a>
              </Magnetic>

              {/* Decorative technical lines */}
              <div className="absolute -left-4 -top-4 w-8 h-8 border-t border-l border-primary/20" />
              <div className="absolute -right-4 -bottom-4 w-8 h-8 border-b border-r border-primary/20" />
            </div>
          </div>

          {/* Social Cluster & Metadata Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-16 lg:pb-8">

            {/* Social Grid */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 ml-2">NETWORK</h4>
              <div className="grid grid-cols-3 gap-2">
                {socials.map((social) => (
                  <SocialLink
                    key={social.name}
                    href={social.href}
                    label={social.name}
                    iconName={social.iconName}
                    iconClassName="w-5 h-5"
                    magneticIntensity={0.4}
                    className="flex flex-col items-center justify-center p-6 rounded-xl bg-surface/20 border border-white/5 hover:bg-surface/40 hover:text-primary transition-all duration-300 gap-3"
                    labelClassName="text-[9px] font-bold tracking-widest uppercase opacity-40"
                  />
                ))}
              </div>
            </div>

            {/* Technical Metadata Table */}
            <div className="space-y-6 pt-12 border-t border-white/5">
              <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 ml-2">LOGISTICS</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between group/meta">
                  <div className="flex items-center gap-3 text-on-surface-variant/40">
                    <MapPin size={14} className="group-hover/meta:text-primary transition-colors" />
                    <span className="text-[11px] font-bold tracking-wider uppercase">Location</span>
                  </div>
                  <span className="text-[11px] font-mono tracking-wider">DHAKA, BD</span>
                </div>

                <div className="flex items-center justify-between group/meta">
                  <div className="flex items-center gap-3 text-on-surface-variant/40">
                    <Clock size={14} className="group-hover/meta:text-primary transition-colors" />
                    <span className="text-[11px] font-bold tracking-wider uppercase">Local Time</span>
                  </div>
                  <span className="text-[11px] font-mono tracking-wider uppercase">{currentTime} (GMT+6)</span>
                </div>

                <div className="flex items-center justify-between group/meta">
                  <div className="flex items-center gap-3 text-on-surface-variant/40">
                    <Globe size={14} className="group-hover/meta:text-primary transition-colors" />
                    <span className="text-[11px] font-bold tracking-wider uppercase">Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-500/80">Available</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-aura-1 blur-[150px] opacity-10 pointer-events-none" />
    </section>
  );
};

Contact.propTypes = {
  data: CONTACT_DATA_SHAPE,
};

Contact.defaultProps = {
  data: {},
};
