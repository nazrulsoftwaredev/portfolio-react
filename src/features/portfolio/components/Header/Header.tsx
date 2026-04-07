import React, { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { HEADER_DATA_SHAPE } from "@/shared/types";
import { Magnetic } from "@/features/portfolio/components/Magnetic";

const HeaderComponent = ({ loading, data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const hiddenRef = useRef(false);

  // Hide header on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    lastScrollY.current = latest;

    const delta = latest - previous;
    const shouldBeScrolled = latest > 50;

    const hideThreshold = 160;
    const showThreshold = 80;
    const minDelta = 6;

    let nextHidden = hiddenRef.current;
    if (latest > hideThreshold && delta > minDelta) {
      nextHidden = true;
    } else if (latest < showThreshold || delta < -minDelta) {
      nextHidden = false;
    }

    if (nextHidden !== hiddenRef.current) {
      hiddenRef.current = nextHidden;
      setHidden(nextHidden);
    }

    setScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));
  });

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  const navLinks = (
    data?.navigation?.length
      ? data.navigation
      : [
          { label: "About", href: "#about" },
          { label: "Work", href: "#work" },
          { label: "Expertise", href: "#expertise" },
          { label: "Tech Stack", href: "#tech-stack" },
          { label: "Contact", href: "#contact" },
          { label: "Dashboard", href: "/dashboard", isRoute: true },
        ]
  ).map((item, index) => ({ ...item, num: `0${index + 1}` }));

  const handleSectionNavigation = (href, closeMenu = false) => {
    if (!href?.startsWith("#")) return;

    if (closeMenu) {
      setIsMenuOpen(false);
    }

    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }

    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -20, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-[100] px-8 md:px-16 py-10 flex justify-between items-center pointer-events-none transition-[background-color,backdrop-filter,padding,border-color] duration-700 ${scrolled ? "backdrop-blur-2xl bg-background/40 py-6 border-b border-border/40" : ""}`}
      >
        <div
          className="flex items-center gap-12 pointer-events-auto cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-cursor="hover"
        >
          <div className="flex flex-col">
            <span className="font-heading text-2xl tracking-tighter leading-none group-hover:text-primary transition-all duration-500 italic">
              {data?.name || "MD Nazrul Islam"}
            </span>
            <div className="flex items-center gap-2 mt-2 overflow-hidden h-3">
              <motion.span
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 4 }}
                className="text-[8px] uppercase tracking-[0.4em] opacity-30 font-black leading-none block"
              >
                SOFTWARE DEVELOPER
              </motion.span>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 pointer-events-auto">
          {navLinks.map((link) => (
            <Magnetic key={link.label}>
              {link.isRoute ? (
                <Link
                  to={link.href}
                  data-cursor="hover"
                  className="text-[11px] font-black tracking-[0.2em] uppercase px-5 py-2 hover:text-primary transition-all duration-500"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSectionNavigation(link.href);
                  }}
                  data-cursor="hover"
                  className="text-[11px] font-black tracking-[0.2em] uppercase px-5 py-2 hover:text-primary transition-all duration-500"
                >
                  {link.label}
                </a>
              )}
            </Magnetic>
          ))}
          <div className="w-16 h-px bg-border/60 mx-6" />
          <Magnetic>
            <Link
              to="/start-project"
              className="text-[10px] font-black uppercase tracking-[0.25em] px-10 py-4 rounded-full border border-border/50 hover:bg-foreground hover:text-background transition-all duration-700"
              data-cursor="hover"
            >
              Start Project
            </Link>
          </Magnetic>
        </nav>

        <button
          className="md:hidden pointer-events-auto mix-blend-difference invert dark:invert-0 p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
          onClick={() => setIsMenuOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsMenuOpen(true);
            }
          }}
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          data-cursor="hover"
        >
          <Menu size={32} strokeWidth={1} />
        </button>
      </motion.header>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[200] bg-background flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex justify-between items-center p-8 md:p-12">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-30">
                Menu
              </span>
              <button
                className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-on-surface/5 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 md:px-24">
              <nav className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1 * i + 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group py-6 border-b border-border/40 flex items-end justify-between hover:pl-6 transition-all duration-700"
                      >
                        <span className="text-7xl md:text-9xl font-serif italic tracking-tighter leading-[0.8] group-hover:text-primary">
                          {link.label}
                        </span>
                        <span className="text-sm font-bold opacity-30 group-hover:opacity-100 transition-opacity pb-4">
                          {link.num}
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSectionNavigation(link.href, true);
                        }}
                        className="group py-6 border-b border-border/40 flex items-end justify-between hover:pl-6 transition-all duration-700"
                      >
                        <span className="text-7xl md:text-9xl font-serif italic tracking-tighter leading-[0.8] group-hover:text-primary">
                          {link.label}
                        </span>
                        <span className="text-sm font-bold opacity-30 group-hover:opacity-100 transition-opacity pb-4">
                          {link.num}
                        </span>
                      </a>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="p-8 md:p-24 flex flex-col md:flex-row justify-between items-end gap-10">
              <div className="flex flex-col gap-6">
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-20">
                  Connect
                </span>
                <div className="flex gap-10">
                  {[
                    {
                      label: "GitHub",
                      href: "https://github.com/nazrulsoftwaredev",
                    },
                    {
                      label: "LinkedIn",
                      href: "https://www.linkedin.com/in/nazrulsoftwaredev/",
                    },
                    {
                      label: "Facebook",
                      href: "https://www.facebook.com/nazrulilam3144/",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-serif italic hover:text-primary transition-colors"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-20 hidden md:block">
                Selected Works — 2026 Edition
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

HeaderComponent.propTypes = {
  loading: PropTypes.bool,
  data: HEADER_DATA_SHAPE,
};

HeaderComponent.defaultProps = {
  loading: false,
  data: {},
};

export const Header = React.memo(HeaderComponent);
