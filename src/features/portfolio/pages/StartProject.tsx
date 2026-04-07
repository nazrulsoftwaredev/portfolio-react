import React, { useMemo, useState } from "react";
import ReactLenis from "lenis/react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";

import { ErrorBoundary, SkipLink, Toast } from "@/shared/components";
import { SocialLink } from "@/shared/components/common/SocialLink";
import { PremiumBackground } from "../components/PremiumBackground";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { CustomCursor } from "../components/CustomCursor";
import { Magnetic } from "../components/Magnetic";
import { usePortfolioContent } from "../hooks/usePortfolioContent";

type BudgetRange = "Under $1k" | "$1k–$5k" | "$5k–$15k" | "$15k+" | "Not sure";
type Timeline = "ASAP" | "2–4 weeks" | "1–2 months" | "3+ months" | "Flexible";

type FormState = {
  name: string;
  email: string;
  company: string;
  budget: BudgetRange;
  timeline: Timeline;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  budget: "Not sure",
  timeline: "Flexible",
  message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const StartProject: React.FC = () => {
  const { data: portfolioData } = usePortfolioContent();
  const [form, setForm] = useState<FormState>(initialForm);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<{
    open: boolean;
    type: "success" | "error" | "info";
    message: string;
  }>({ open: false, type: "info", message: "" });

  const socials = useMemo(
    () => [
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
    ],
    [],
  );

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!emailRegex.test(form.email)) next.email = "Use a valid email.";
    if (!form.message.trim()) next.message = "Brief is required.";
    return next;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const markTouched = (key: keyof FormState) =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      company: true,
      budget: true,
      timeline: true,
      message: true,
    });

    if (!isValid) {
      setToast({
        open: true,
        type: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      return;
    }

    const subject = encodeURIComponent(`Project inquiry from ${form.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Company: ${form.company || "-"}`,
        `Budget: ${form.budget}`,
        `Timeline: ${form.timeline}`,
        "",
        "Brief:",
        form.message,
      ].join("\n"),
    );

    window.location.href = `mailto:${portfolioData.hero?.email || "hello@mdnazrul.com"}?subject=${subject}&body=${body}`;

    setToast({
      open: true,
      type: "success",
      message: "Drafted an email — add any extra details and send it over.",
    });
  };

  const showError = (key: keyof FormState) => touched[key] && errors[key];

  return (
    <ErrorBoundary name="Start Project Page">
      <ReactLenis
        root
        options={{ lerp: 0.05, duration: 1.5, smoothTouch: true }}
      >
        <div className="bg-background min-h-screen text-on-surface selection:bg-primary/30 relative z-0">
          <SkipLink targetId="main-content" />
          <CustomCursor />
          <PremiumBackground />

          <Header loading={false} data={portfolioData.hero} />

          <main
            id="main-content"
            className="relative z-10 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-background rounded-none"
            tabIndex={-1}
          >
            <section className="pt-40 md:pt-48 pb-24 md:pb-32 px-6 md:px-12 relative overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                  <div className="lg:col-span-5 space-y-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6"
                    >
                      <span className="section-label block opacity-40">
                        Start Project
                      </span>
                      <h1 className="heading-xxl font-heading tracking-tighter leading-[0.9]">
                        Let’s build a{" "}
                        <span className="font-serif italic font-normal text-primary tracking-tight">
                          polished
                        </span>{" "}
                        product.
                      </h1>
                      <p className="text-on-surface-variant text-lg font-light tracking-wide leading-relaxed opacity-60 max-w-md">
                        Share a quick brief. I’ll reply with next steps,
                        timeline, and a clear plan for execution.
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-border/40 bg-surface/20 p-6">
                        <div className="flex items-center gap-3 opacity-60">
                          <Mail size={16} />
                          <span className="text-[10px] font-bold tracking-[0.35em] uppercase">
                            Direct
                          </span>
                        </div>
                        <div className="mt-3 font-serif italic text-lg tracking-tight">
                          {portfolioData.hero?.email || "hello@mdnazrul.com"}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border/40 bg-surface/20 p-6">
                        <div className="flex items-center gap-3 opacity-60">
                          <ShieldCheck size={16} />
                          <span className="text-[10px] font-bold tracking-[0.35em] uppercase">
                            Notes
                          </span>
                        </div>
                        <div className="mt-3 text-sm text-on-surface-variant opacity-60 leading-relaxed">
                          Short briefs are fine. We’ll refine scope together.
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border/40">
                      <div className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30 mb-5">
                        Social
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {socials.map((social) => (
                          <SocialLink
                            key={social.label}
                            href={social.href}
                            label={social.label}
                            iconName={social.iconName}
                            openInNewTab
                            iconClassName="w-4 h-4"
                            magneticIntensity={0.35}
                            className="group flex items-center gap-3 px-5 py-3 rounded-full bg-surface/20 border border-border/40 hover:bg-surface/40 hover:border-primary/25 transition-colors"
                            iconWrapperClassName="opacity-50 group-hover:opacity-100 transition-opacity"
                            labelClassName="text-[11px] font-black uppercase tracking-[0.25em] opacity-70 group-hover:opacity-100 transition-opacity"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <motion.form
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.05 }}
                      onSubmit={onSubmit}
                      className="relative rounded-3xl border border-border/40 bg-surface/20 backdrop-blur-xl p-6 md:p-10 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.05] to-transparent pointer-events-none" />
                      <div className="relative z-10">
                        <div className="flex items-end justify-between gap-6 mb-10">
                          <div>
                            <div className="text-[10px] font-bold tracking-[0.45em] uppercase opacity-30 mb-3">
                              Project Brief
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading tracking-tight">
                              A few details.
                            </h2>
                          </div>
                          <div className="text-[10px] font-bold tracking-[0.35em] uppercase opacity-30 hidden md:block">
                            Response within 24–48h
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-[0.35em] uppercase opacity-40">
                              Name *
                            </label>
                            <input
                              value={form.name}
                              onChange={(e) => setField("name", e.target.value)}
                              onBlur={() => markTouched("name")}
                              className={`w-full px-5 py-4 rounded-2xl bg-black/55 border ${
                                showError("name")
                                  ? "border-red-500/40"
                                  : "border-white/15"
                              } text-white placeholder:text-white/45 caret-primary focus:outline-none focus:ring-2 focus:ring-primary/50`}
                              placeholder="Your name"
                              autoComplete="name"
                            />
                            {showError("name") && (
                              <div className="text-xs text-red-400/90">
                                {errors.name}
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-[0.35em] uppercase opacity-40">
                              Email *
                            </label>
                            <input
                              value={form.email}
                              onChange={(e) =>
                                setField("email", e.target.value)
                              }
                              onBlur={() => markTouched("email")}
                              className={`w-full px-5 py-4 rounded-2xl bg-black/55 border ${
                                showError("email")
                                  ? "border-red-500/40"
                                  : "border-white/15"
                              } text-white placeholder:text-white/45 caret-primary focus:outline-none focus:ring-2 focus:ring-primary/50`}
                              placeholder="you@company.com"
                              autoComplete="email"
                              inputMode="email"
                            />
                            {showError("email") && (
                              <div className="text-xs text-red-400/90">
                                {errors.email}
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-[0.35em] uppercase opacity-40">
                              Company (optional)
                            </label>
                            <input
                              value={form.company}
                              onChange={(e) =>
                                setField("company", e.target.value)
                              }
                              onBlur={() => markTouched("company")}
                              className="w-full px-5 py-4 rounded-2xl bg-black/55 border border-white/15 text-white placeholder:text-white/45 caret-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                              placeholder="Studio / Startup / Team"
                              autoComplete="organization"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold tracking-[0.35em] uppercase opacity-40">
                                Budget
                              </label>
                              <select
                                value={form.budget}
                                onChange={(e) =>
                                  setField(
                                    "budget",
                                    e.target.value as BudgetRange,
                                  )
                                }
                                onBlur={() => markTouched("budget")}
                                className="w-full px-5 py-4 rounded-2xl bg-black/55 border border-white/15 text-white [&>option]:bg-[#0c0c0c] [&>option]:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                              >
                                {(
                                  [
                                    "Under $1k",
                                    "$1k–$5k",
                                    "$5k–$15k",
                                    "$15k+",
                                    "Not sure",
                                  ] as BudgetRange[]
                                ).map((v) => (
                                  <option key={v} value={v}>
                                    {v}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[10px] font-bold tracking-[0.35em] uppercase opacity-40">
                                Timeline
                              </label>
                              <select
                                value={form.timeline}
                                onChange={(e) =>
                                  setField(
                                    "timeline",
                                    e.target.value as Timeline,
                                  )
                                }
                                onBlur={() => markTouched("timeline")}
                                className="w-full px-5 py-4 rounded-2xl bg-black/55 border border-white/15 text-white [&>option]:bg-[#0c0c0c] [&>option]:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                              >
                                {(
                                  [
                                    "ASAP",
                                    "2–4 weeks",
                                    "1–2 months",
                                    "3+ months",
                                    "Flexible",
                                  ] as Timeline[]
                                ).map((v) => (
                                  <option key={v} value={v}>
                                    {v}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mt-6">
                          <label className="text-[10px] font-bold tracking-[0.35em] uppercase opacity-40">
                            Brief *
                          </label>
                          <textarea
                            value={form.message}
                            onChange={(e) =>
                              setField("message", e.target.value)
                            }
                            onBlur={() => markTouched("message")}
                            className={`w-full min-h-[180px] px-5 py-4 rounded-2xl bg-black/55 border ${
                              showError("message")
                                ? "border-red-500/40"
                                : "border-white/15"
                            } text-white placeholder:text-white/45 caret-primary focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none`}
                            placeholder="What are you building, and what does success look like?"
                          />
                          {showError("message") && (
                            <div className="text-xs text-red-400/90">
                              {errors.message}
                            </div>
                          )}
                        </div>

                        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                          <div className="text-xs text-on-surface-variant opacity-50 leading-relaxed">
                            Submitting opens your email client with a prepared
                            message.
                          </div>

                          <Magnetic intensity={0.18}>
                            <button
                              type="submit"
                              data-cursor="hover"
                              className={`group inline-flex items-center gap-4 px-8 py-5 rounded-full border transition-all duration-700 ${
                                isValid
                                  ? "border-border/50 hover:bg-foreground hover:text-background"
                                  : "border-border/50 opacity-80 hover:opacity-100"
                              }`}
                              aria-disabled={!isValid}
                            >
                              <span className="text-[10px] font-black uppercase tracking-[0.25em]">
                                Send Brief
                              </span>
                              <span className="w-10 h-10 rounded-full bg-primary text-background flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                                <ArrowUpRight size={18} strokeWidth={2.5} />
                              </span>
                            </button>
                          </Magnetic>
                        </div>
                      </div>
                    </motion.form>
                  </div>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/[0.03] blur-[150px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-aura-1 blur-[150px] opacity-10 pointer-events-none" />
            </section>
          </main>

          <Footer data={portfolioData.hero} />

          <Toast
            isOpen={toast.open}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast((t) => ({ ...t, open: false }))}
          />
        </div>
      </ReactLenis>
    </ErrorBoundary>
  );
};
