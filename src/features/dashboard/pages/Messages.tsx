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
import { useDashboardSearch } from "../components/Layout/DashboardSearchContext";
import { Toast } from "@/shared/components";
import { AnimatePresence } from "framer-motion";

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

type MessageTab = "All" | "Unread" | "Archived" | "Drafts";

export const Messages: React.FC = () => {
  const { searchQuery, setSearchQuery } = useDashboardSearch();
  const [activeTab, setActiveTab] = React.useState<MessageTab>("All");
  const [selectedMessageId, setSelectedMessageId] = React.useState<number>(
    messages[0]?.id ?? 0,
  );
  const [composerValue, setComposerValue] = React.useState("");
  const [archivedIds, setArchivedIds] = React.useState<Set<number>>(
    () => new Set(),
  );
  const [draftIds] = React.useState<Set<number>>(() => new Set([4]));
  const [threadMessages, setThreadMessages] = React.useState<
    Record<number, Array<{ id: string; role: "client" | "me"; text: string; timestamp: string }>>
  >({
    1: [
      { id: "1-a", role: "client", text: "Hey Nazrul, just wanted to check in on the latest designs...", timestamp: "10:24 AM · Received" },
      { id: "1-b", role: "me", text: "Hi! I'm finalizing the identity system. I will send the full presentation by end of day.", timestamp: "10:32 AM · Sent" },
    ],
    2: [
      { id: "2-a", role: "client", text: "We are looking for a creative partner to help us redesign our platform.", timestamp: "09:20 AM · Received" },
    ],
    3: [
      { id: "3-a", role: "client", text: "The latest motion graphics look amazing! Minor tweaks are needed.", timestamp: "Yesterday · Received" },
    ],
    4: [{ id: "4-a", role: "client", text: "We are impressed by your portfolio and would like to discuss partnership.", timestamp: "2 days ago · Received" }],
  });
  const [toasts, setToasts] = React.useState<
    Array<{
      id: string;
      message: string;
      type: "info" | "success" | "error" | "warning";
    }>
  >([]);

  const pushToast = React.useCallback(
    (message: string, type: "info" | "success" | "error" | "warning" = "info") =>
      setToasts((previous) => [
        ...previous,
        { id: crypto.randomUUID(), message, type },
      ]),
    [],
  );

  const filteredMessages = React.useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    return messages.filter((message) => {
      const matchesTab =
        activeTab === "All"
          ? !archivedIds.has(message.id) && !draftIds.has(message.id)
          : activeTab === "Unread"
            ? message.unread && !archivedIds.has(message.id)
            : activeTab === "Archived"
              ? archivedIds.has(message.id)
              : draftIds.has(message.id);
      const matchesSearch = normalized
        ? [message.sender, message.subject, message.preview, message.time]
            .join(" ")
            .toLowerCase()
            .includes(normalized)
        : true;
      return matchesTab && matchesSearch;
    });
  }, [activeTab, archivedIds, draftIds, searchQuery]);

  React.useEffect(() => {
    if (filteredMessages.length === 0) {
      return;
    }
    if (!filteredMessages.some((item) => item.id === selectedMessageId)) {
      setSelectedMessageId(filteredMessages[0].id);
    }
  }, [filteredMessages, selectedMessageId]);

  const activeMessage =
    filteredMessages.find((item) => item.id === selectedMessageId) ??
    filteredMessages[0] ??
    null;

  return (
    <div className="dash-stack flex flex-col min-h-0">
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
            <Button
              className="gap-2"
              type="button"
              onClick={() =>
                pushToast("New message composer opened for quick outreach.", "success")
              }
            >
              <Plus className="w-4 h-4" />
              New message
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 dash-grid-gap flex-1 min-h-0">
        {/* Message List */}
        <div className="lg:col-span-4 premium-card !p-0 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-border/60 space-y-6 bg-muted/20">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search messages"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full bg-background rounded-xl pl-11 pr-4"
              />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
              {(["All", "Unread", "Archived", "Drafts"] as MessageTab[]).map((tab) => (
                <Button
                  key={tab}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border border-transparent ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40 bg-transparent"
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-border/50">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessageId(msg.id)}
                  className={`p-6 cursor-pointer relative ${msg.unread ? "bg-primary/5" : ""} ${selectedMessageId === msg.id ? "ring-1 ring-primary/30 bg-primary/10" : ""}`}
                >
                  {msg.unread && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-muted/60 shrink-0 overflow-hidden">
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
              ))
            ) : (
              <div className="p-8 text-center text-sm font-medium text-muted-foreground">
                No conversations match your search.
              </div>
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-8 premium-card !p-0 flex flex-col overflow-hidden">
          {activeMessage ? (
            <>
          <div className="p-6 border-b border-border/60 flex items-center justify-between bg-muted/20">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-muted/60 overflow-hidden">
                  <img
                    src={activeMessage.avatar}
                    alt={activeMessage.sender}
                    className="w-full h-full object-cover p-2"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full shadow-sm flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              <div>
                <h4 className="font-display font-semibold text-xl text-foreground tracking-tight">
                  {activeMessage.sender}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-emerald-600 font-medium">
                    Direct link active
                  </p>
                  <Hash className="w-3 h-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground font-medium">
                    {activeMessage.subject}
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
                onClick={() =>
                  pushToast(`Calling ${activeMessage.sender}...`, "info")
                }
              >
                <Phone className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-2xl text-muted-foreground border border-transparent"
                onClick={() => {
                  setArchivedIds((previous) => {
                    const next = new Set(previous);
                    next.add(activeMessage.id);
                    return next;
                  });
                  setActiveTab("All");
                  pushToast(`${activeMessage.sender} moved to archive.`, "success");
                }}
              >
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-10 bg-muted/10">
            <div className="flex flex-col items-center gap-4">
              <div className="px-4 py-1.5 rounded-full bg-muted/60 text-xs font-medium text-muted-foreground">
                Transmission log: March 24
              </div>
            </div>

            {(threadMessages[activeMessage.id] ?? []).map((entry) => (
              <div
                key={entry.id}
                className={`flex gap-5 max-w-[85%] ${entry.role === "me" ? "ml-auto flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center ${
                    entry.role === "me"
                      ? "bg-primary border-4 border-background"
                      : "bg-muted/60"
                  }`}
                >
                  {entry.role === "me" ? (
                    <User className="w-6 h-6 text-primary-foreground" />
                  ) : (
                    <img
                      src={activeMessage.avatar}
                      alt={activeMessage.sender}
                      className="w-full h-full object-cover p-2 opacity-70"
                    />
                  )}
                </div>
                <div className={`space-y-2 ${entry.role === "me" ? "text-right" : ""}`}>
                  <div
                    className={`p-6 rounded-3xl text-sm leading-relaxed ${
                      entry.role === "me"
                        ? "rounded-tr-none bg-primary text-primary-foreground font-semibold"
                        : "rounded-tl-none bg-muted/40 text-foreground font-medium"
                    }`}
                  >
                    {entry.text}
                  </div>
                  <p
                    className={`text-xs text-muted-foreground font-medium ${entry.role === "me" ? "pr-2" : "pl-2"}`}
                  >
                    {entry.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-border/60 bg-muted/20">
            <div className="flex items-center gap-4 bg-muted/60 rounded-[2rem] p-3">
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
                value={composerValue}
                onChange={(event) => setComposerValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key !== "Enter") {
                    return;
                  }
                  event.preventDefault();
                  if (!composerValue.trim()) {
                    pushToast("Type a message before sending.", "warning");
                    return;
                  }
                  setThreadMessages((previous) => ({
                    ...previous,
                    [activeMessage.id]: [
                      ...(previous[activeMessage.id] ?? []),
                      {
                        id: crypto.randomUUID(),
                        role: "me",
                        text: composerValue.trim(),
                        timestamp: "Now · Sent",
                      },
                    ],
                  }));
                  setComposerValue("");
                  pushToast("Message sent.", "success");
                }}
                className="flex-1 bg-transparent border-none outline-none text-sm py-2 px-2 text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-2xl text-muted-foreground"
                onClick={() => pushToast("Emoji picker will open here.", "info")}
              >
                <Smile className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                className="h-12 w-12 rounded-2xl"
                onClick={() => {
                  if (!composerValue.trim()) {
                    pushToast("Type a message before sending.", "warning");
                    return;
                  }
                  setThreadMessages((previous) => ({
                    ...previous,
                    [activeMessage.id]: [
                      ...(previous[activeMessage.id] ?? []),
                      {
                        id: crypto.randomUUID(),
                        role: "me",
                        text: composerValue.trim(),
                        timestamp: "Now · Sent",
                      },
                    ],
                  }));
                  setComposerValue("");
                  pushToast("Message sent.", "success");
                }}
              >
                <Send className="w-5 h-5" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground font-medium">
              No active conversation. Try switching tabs or clearing search.
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-6 left-6 z-[1060] flex max-w-sm flex-col gap-3">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              isOpen
              message={toast.message}
              type={toast.type}
              onClose={() =>
                setToasts((previous) => previous.filter((item) => item.id !== toast.id))
              }
              inline
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
