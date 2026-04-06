import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  User,
  Phone,
  Plus,
  Hash,
} from "lucide-react";
import { PremiumButton } from "../components/PremiumButton";
import { PageHeader } from "../components/common";
import {
  dashboardContainerVariants,
  dashboardItemVariants,
} from "../constants/animationVariants";
import { Button, Input } from "@/components/ui";

const messages = [
  {
    id: 1,
    sender: "Acme Corp",
    subject: "Project Neon Genesis",
    preview: "Hey Nazrul, just wanted to check in on the latest designs...",
    time: "2h ago",
    unread: true,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=acme",
  },
  {
    id: 2,
    sender: "Global Tech",
    subject: "Web Design Inquiry",
    preview: "We are looking for a creative partner to help us redesign...",
    time: "5h ago",
    unread: false,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=global",
  },
  {
    id: 3,
    sender: "Studio X",
    subject: "Motion Graphics Feedback",
    preview: "The latest motion graphics look amazing! Minor tweaks...",
    time: "1d ago",
    unread: false,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=studio",
  },
  {
    id: 4,
    sender: "Future Labs",
    subject: "Partnership Opportunity",
    preview: "We are impressed by your portfolio and would like to...",
    time: "2d ago",
    unread: false,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=future",
  },
];

export const Messages: React.FC = () => {
  return (
    <motion.div
      variants={dashboardContainerVariants}
      initial={false}
      animate="visible"
      className="h-[calc(100vh-12rem)] flex flex-col space-y-10"
    >
      <motion.div variants={dashboardItemVariants}>
        <PageHeader
          title={
            <>
              COMMUNICATIONS <br />
              INTERFACE
            </>
          }
          subtitle={
            <>
              SESSION: <span className="text-emerald-400">ENCRYPTED</span>
            </>
          }
          actions={
            <PremiumButton variant="primary" icon={Plus}>
              NEW PROTOCOL
            </PremiumButton>
          }
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Message List */}
        <motion.div
          variants={dashboardItemVariants}
          className="lg:col-span-4 premium-card !p-0 flex flex-col overflow-hidden"
        >
          <div className="p-6 border-b border-white/5 space-y-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-accent-primary transition-colors" />
              <Input
                type="text"
                placeholder="SEARCH TRANSMISSIONS..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[10px] font-black tracking-widest text-white focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary/50 transition-all uppercase placeholder:text-on-surface-variant/40"
              />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
              {["ALL", "UNREAD", "ARCHIVED", "DRAFTS"].map((tab, idx) => (
                <Button
                  key={tab}
                  type="button"
                  variant="outline"
                  size="sm"
                  className={`px-4 py-2 rounded-xl text-[10px] font-black whitespace-nowrap tracking-[0.15em] transition-all border ${
                    idx === 0
                      ? "bg-accent-primary text-black border-accent-primary"
                      : "text-on-surface-variant hover:text-white hover:bg-white/5 border-transparent bg-transparent"
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-white/5">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                className={`p-6 cursor-pointer transition-colors relative group ${msg.unread ? "bg-accent-primary/5" : ""}`}
              >
                {msg.unread && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary shadow-[0_0_10px_rgba(172,199,255,0.5)]"></div>
                )}
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-surface border border-white/5 group-hover:border-accent-primary/50 transition-colors shrink-0 overflow-hidden">
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className="w-full h-full object-cover p-2 opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-display font-black text-white italic text-base truncate uppercase tracking-tight">
                        {msg.sender}
                      </p>
                      <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-[0.2em]">
                        {msg.time}
                      </p>
                    </div>
                    <p className="text-xs font-bold text-accent-primary truncate mb-1 uppercase tracking-wider">
                      {msg.subject}
                    </p>
                    <p className="text-[10px] text-on-surface-variant truncate font-medium">
                      {msg.preview}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat Window */}
        <motion.div
          variants={dashboardItemVariants}
          className="lg:col-span-8 premium-card !p-0 flex flex-col overflow-hidden"
        >
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-surface border border-white/5 overflow-hidden">
                  <img
                    src="https://api.dicebear.com/7.x/identicon/svg?seed=acme"
                    alt="Acme Corp"
                    className="w-full h-full object-cover p-2"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-black rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
              </div>
              <div>
                <h4 className="font-display font-black text-2xl text-white italic tracking-tight uppercase">
                  ACME CORP
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em]">
                    DIRECT LINK ACTIVE
                  </p>
                  <Hash className="w-3 h-3 text-on-surface-variant" />
                  <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em]">
                    PROJECT_NEON
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-2xl text-on-surface-variant border border-transparent hover:border-white/10 hover:bg-white/5"
              >
                <Phone className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-2xl text-on-surface-variant border border-transparent hover:border-white/10 hover:bg-white/5"
              >
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-10 bg-[radial-gradient(circle_at_top_right,rgba(172,199,255,0.03),transparent_40%)]">
            <div className="flex flex-col items-center gap-4">
              <div className="px-5 py-1.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-on-surface-variant">
                TRANS MISSION LOG: MARCH 24
              </div>
            </div>

            <div className="flex gap-5 max-w-[85%]">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-white/5 overflow-hidden shrink-0">
                <img
                  src="https://api.dicebear.com/7.x/identicon/svg?seed=acme"
                  alt="Acme Corp"
                  className="w-full h-full object-cover p-2 opacity-60"
                />
              </div>
              <div className="space-y-2">
                <div className="p-6 rounded-3xl rounded-tl-none bg-white/[0.03] border border-white/5 text-sm leading-relaxed text-white font-medium">
                  Hey Nazrul, just wanted to check in on the latest designs for
                  the Neon Genesis project. The client is really excited to see
                  the progress!
                </div>
                <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-widest pl-2">
                  10:24 AM / RECEIVED
                </p>
              </div>
            </div>

            <div className="flex gap-5 max-w-[85%] ml-auto flex-row-reverse">
              <div className="w-12 h-12 rounded-2xl bg-accent-primary overflow-hidden shrink-0 flex items-center justify-center border-4 border-surface shadow-[0_0_20px_rgba(172,199,255,0.2)]">
                <User className="w-6 h-6 text-black" />
              </div>
              <div className="space-y-2 text-right">
                <div className="p-6 rounded-3xl rounded-tr-none bg-accent-primary text-black text-sm leading-relaxed font-black">
                  Hi! I'm just putting the finishing touches on the identity
                  system. I'll have the full presentation ready for you by the
                  end of the day. Stay tuned.
                </div>
                <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-widest pr-2">
                  10:32 AM / TRANSMITTED
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-[2rem] p-3 focus-within:border-accent-primary/40 focus-within:ring-4 focus-within:ring-accent-primary/5 transition-all">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-2xl text-on-surface-variant hover:bg-white/5"
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                type="text"
                placeholder="TYPE NEW PROTOCOL..."
                className="flex-1 bg-transparent border-none outline-none text-[10px] font-black tracking-widest py-2 px-2 text-white placeholder:text-on-surface-variant/40"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-2xl text-on-surface-variant hover:bg-white/5"
              >
                <Smile className="w-5 h-5" />
              </Button>
              <PremiumButton
                variant="primary"
                size="sm"
                icon={Send}
                className="!h-12 !w-12 !rounded-2xl !p-0"
              >
                <span className="sr-only">SEND</span>
              </PremiumButton>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
