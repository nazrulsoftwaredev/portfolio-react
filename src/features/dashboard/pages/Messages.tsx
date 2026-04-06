import React from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Send, 
  Paperclip, 
  Smile, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  ArrowUpRight, 
  TrendingDown,
  Plus
} from 'lucide-react';

const messages = [
  { id: 1, sender: 'Acme Corp', subject: 'Project Neon Genesis Update', preview: 'Hey Nazrul, just wanted to check in on the latest designs for the Neon Genesis project...', time: '2h ago', unread: true, avatar: 'https://i.pravatar.cc/100?u=acme' },
  { id: 2, sender: 'Global Tech', subject: 'Inquiry: Web Design Services', preview: 'We are looking for a creative partner to help us redesign our corporate website...', time: '5h ago', unread: false, avatar: 'https://i.pravatar.cc/100?u=global' },
  { id: 3, sender: 'Studio X', subject: 'Feedback on Motion Graphics', preview: 'The latest motion graphics look amazing! We have a few minor tweaks to suggest...', time: '1d ago', unread: false, avatar: 'https://i.pravatar.cc/100?u=studio' },
  { id: 4, sender: 'Future Labs', subject: 'Partnership Opportunity', preview: 'We are impressed by your portfolio and would like to discuss a potential partnership...', time: '2d ago', unread: false, avatar: 'https://i.pravatar.cc/100?u=future' },
];

export const Messages: React.FC = () => {
  return (
    <div className="h-full flex flex-col space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Messages</h2>
          <p className="text-text-secondary mt-1">Manage your project enquiries and client feedback.</p>
        </div>
        <button className="bg-primary text-background px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" />
          New Message
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[600px]">
        <div className="lg:col-span-1 glass rounded-3xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border space-y-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full bg-secondary/50 border border-border rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['All', 'Unread', 'Archived', 'Drafts'].map((tab) => (
                <button key={tab} className={`px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  tab === 'All' ? 'bg-primary text-background' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`p-6 border-b border-border cursor-pointer hover:bg-white/[0.02] transition-colors relative group ${msg.unread ? 'bg-primary/5' : ''}`}>
                {msg.unread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary overflow-hidden border border-border group-hover:border-primary/50 transition-colors">
                    <img src={msg.avatar} alt={msg.sender} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-display font-bold text-lg truncate">{msg.sender}</p>
                      <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">{msg.time}</p>
                    </div>
                    <p className="text-sm font-medium text-text-primary truncate mt-1">{msg.subject}</p>
                    <p className="text-xs text-text-secondary truncate mt-1">{msg.preview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 glass rounded-3xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary overflow-hidden border border-border">
                <img src="https://i.pravatar.cc/100?u=acme" alt="Acme Corp" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xl">Acme Corp</h4>
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-xl hover:bg-white/10 text-text-secondary transition-all">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-xl hover:bg-white/10 text-text-secondary transition-all">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto space-y-8">
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="px-4 py-1 rounded-full bg-secondary text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                Today, March 24
              </div>
            </div>

            <div className="flex gap-4 max-w-[80%]">
              <div className="w-10 h-10 rounded-xl bg-secondary overflow-hidden shrink-0">
                <img src="https://i.pravatar.cc/100?u=acme" alt="Acme Corp" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-2">
                <div className="p-4 rounded-2xl rounded-tl-none bg-secondary/50 border border-border text-sm leading-relaxed">
                  Hey Nazrul, just wanted to check in on the latest designs for the Neon Genesis project. The client is really excited to see the progress!
                </div>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">10:24 AM</p>
              </div>
            </div>

            <div className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
              <div className="w-10 h-10 rounded-xl bg-primary overflow-hidden shrink-0 flex items-center justify-center">
                <User className="w-6 h-6 text-background" />
              </div>
              <div className="space-y-2 text-right">
                <div className="p-4 rounded-2xl rounded-tr-none bg-primary text-background text-sm leading-relaxed font-medium">
                  Hi! I'm just putting the finishing touches on the identity system. I'll have the full presentation ready for you by the end of the day.
                </div>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">10:32 AM</p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-border bg-white/[0.02]">
            <div className="flex items-center gap-4 bg-secondary/50 border border-border rounded-2xl p-2 focus-within:border-primary/50 transition-all">
              <button className="p-2.5 rounded-xl hover:bg-white/10 text-text-secondary transition-all">
                <Paperclip className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 bg-transparent border-none outline-none text-sm py-2 px-2"
              />
              <button className="p-2.5 rounded-xl hover:bg-white/10 text-text-secondary transition-all">
                <Smile className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-xl bg-primary text-background hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
