import React from "react";
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
import { PageHeader } from "../components/common";
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
    <div className="h-[calc(100vh-12rem)] flex flex-col space-y-10">
      <div>
        <PageHeader
          title={
            <>
              Communications <br />
              interface
            </>
          }
          subtitle={
            <>
              Session: <span className="text-emerald-600">Encrypted</span>
            </>
          }
          actions={
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New message
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Message List */}
        <div className="lg:col-span-4 premium-card !p-0 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-border space-y-6 bg-muted/20">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search messages"
                className="w-full bg-background border border-border rounded-xl pl-11 pr-4"
              />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
              {["All", "Unread", "Archived", "Drafts"].map((tab, idx) => (
                <Button
                  key={tab}
                  type="button"
                  variant="outline"
                  size="sm"
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border ${
                    idx === 0
                      ? "bg-primary text-primary-foreground border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border-transparent bg-transparent"
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-border">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-6 cursor-pointer relative ${msg.unread ? "bg-primary/5" : ""}`}
              >
                {msg.unread && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                )}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-muted border border-border shrink-0 overflow-hidden">
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className="w-full h-full object-cover p-2 opacity-70"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-display font-semibold text-foreground text-base truncate">
                        {msg.sender}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        {msg.time}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-primary truncate mb-1">
                      {msg.subject}
                    </p>
                    <p className="text-xs text-muted-foreground truncate font-medium">
                      {msg.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-8 premium-card !p-0 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between bg-muted/20">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-muted border border-border overflow-hidden">
                  <img
                    src="https://api.dicebear.com/7.x/identicon/svg?seed=acme"
                    alt="Acme Corp"
                    className="w-full h-full object-cover p-2"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full border border-border flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              <div>
                <h4 className="font-display font-semibold text-xl text-foreground tracking-tight">
                  Acme Corp
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-emerald-600 font-medium">
                    Direct link active
                  </p>
                  <Hash className="w-3 h-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground font-medium">
                    Project neon
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-2xl text-muted-foreground border border-transparent"
              >
                <Phone className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-2xl text-muted-foreground border border-transparent"
              >
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-10 bg-muted/10">
            <div className="flex flex-col items-center gap-4">
              <div className="px-4 py-1.5 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground">
                Transmission log: March 24
              </div>
            </div>

            <div className="flex gap-5 max-w-[85%]">
              <div className="w-12 h-12 rounded-2xl bg-muted border border-border overflow-hidden shrink-0">
                <img
                  src="https://api.dicebear.com/7.x/identicon/svg?seed=acme"
                  alt="Acme Corp"
                  className="w-full h-full object-cover p-2 opacity-70"
                />
              </div>
              <div className="space-y-2">
                <div className="p-6 rounded-3xl rounded-tl-none bg-muted/40 border border-border text-sm leading-relaxed text-foreground font-medium">
                  Hey Nazrul, just wanted to check in on the latest designs for
                  the Neon Genesis project. The client is really excited to see
                  the progress!
                </div>
                <p className="text-xs text-muted-foreground font-medium pl-2">
                  10:24 AM · Received
                </p>
              </div>
            </div>

            <div className="flex gap-5 max-w-[85%] ml-auto flex-row-reverse">
              <div className="w-12 h-12 rounded-2xl bg-primary overflow-hidden shrink-0 flex items-center justify-center border-4 border-background">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="space-y-2 text-right">
                <div className="p-6 rounded-3xl rounded-tr-none bg-primary text-primary-foreground text-sm leading-relaxed font-semibold">
                  Hi! I'm just putting the finishing touches on the identity
                  system. I'll have the full presentation ready for you by the
                  end of the day. Stay tuned.
                </div>
                <p className="text-xs text-muted-foreground font-medium pr-2">
                  10:32 AM · Sent
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-border bg-muted/20">
            <div className="flex items-center gap-4 bg-muted border border-border rounded-[2rem] p-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-2xl text-muted-foreground"
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                type="text"
                placeholder="Type a message"
                className="flex-1 bg-transparent border-none outline-none text-sm py-2 px-2 text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-2xl text-muted-foreground"
              >
                <Smile className="w-5 h-5" />
              </Button>
              <Button size="icon" className="h-12 w-12 rounded-2xl">
                <Send className="w-5 h-5" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
