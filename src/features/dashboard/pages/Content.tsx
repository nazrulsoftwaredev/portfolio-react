import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit3, 
  Eye, 
  Trash2, 
  Plus, 
  Layout, 
  Image as ImageIcon, 
  Type, 
  Link as LinkIcon,
  ChevronRight,
  GripVertical,
  Check,
  CloudUpload,
  Globe,
  Monitor
} from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const ProjectCard = ({ title, category, image, status }: any) => (
  <motion.div 
    variants={itemVariants}
    className="premium-card !p-0 overflow-hidden group border-white/5 hover:border-accent-primary/40 transition-all duration-500"
  >
    <div className="aspect-video relative overflow-hidden bg-surface">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700" 
        referrerPolicy="no-referrer" 
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 backdrop-blur-[2px]">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-2xl bg-white text-black shadow-xl"
        >
          <Edit3 className="w-5 h-5" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-2xl bg-accent-primary text-black shadow-xl"
        >
          <Eye className="w-5 h-5" />
        </motion.button>
      </div>
      <div className={`absolute top-5 right-5 px-4 py-1.5 rounded-full backdrop-blur-xl text-[9px] font-black uppercase tracking-[0.2em] border ${
        status === 'Published' 
          ? 'bg-emerald-500 text-white border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
          : 'bg-white/10 text-white border-white/20'
      }`}>
        {status}
      </div>
    </div>
    <div className="p-8 flex items-center justify-between bg-white/[0.01]">
      <div className="space-y-1">
        <h4 className="font-display font-black text-xl text-white italic tracking-tight uppercase">{title}</h4>
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">{category}</p>
      </div>
      <button className="p-3 rounded-xl hover:bg-red-500/10 text-on-surface-variant hover:text-red-500 transition-all border border-transparent hover:border-red-500/20 group">
        <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  </motion.div>
);

export const Content: React.FC = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-black tracking-tighter text-gradient leading-tight uppercase">
            WEBSITE CONTENT <br />ARCHITECTURE
          </h2>
          <p className="text-on-surface-variant font-bold mt-2 text-sm uppercase tracking-[0.2em]">
            DEPLOYMENT: <span className="text-accent-primary">READY</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <PremiumButton variant="outline" icon={Monitor}>
            PREVIEW LIVE
          </PremiumButton>
          <PremiumButton variant="primary" icon={Check}>
            PUBLISH SYNC
          </PremiumButton>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-10">
          <motion.div variants={itemVariants} className="premium-card space-y-8">
            <h3 className="text-xl font-display font-black flex items-center gap-4 text-white italic uppercase tracking-tight">
              <div className="p-2 rounded-xl bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                <Layout className="w-5 h-5" />
              </div>
              Site Identity
            </h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em]">Site Title</label>
                <input 
                  type="text" 
                  defaultValue="THE CURATOR PROTOCOL" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs font-black tracking-widest text-white focus:ring-4 focus:ring-accent-primary/5 focus:border-accent-primary/50 outline-none transition-all uppercase" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em]">Digital Asset Logo</label>
                <div className="w-full h-40 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-accent-primary/50 hover:bg-accent-primary/[0.02] cursor-pointer transition-all group">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <CloudUpload className="w-8 h-8 text-on-surface-variant group-hover:text-accent-primary" />
                  </div>
                  <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">DRAG ASSET OR BROWSE</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="premium-card space-y-8">
            <h3 className="text-xl font-display font-black flex items-center gap-4 text-white italic uppercase tracking-tight">
              <div className="p-2 rounded-xl bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/20">
                <Type className="w-5 h-5" />
              </div>
              Navigation Log
            </h3>
            <div className="space-y-3">
              {['HOME', 'WORK', 'ABOUT', 'CONTACT'].map((item) => (
                <motion.div 
                  key={item} 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 group cursor-move hover:border-accent-secondary/40 transition-all"
                >
                  <GripVertical className="w-4 h-4 text-on-surface-variant/40 group-hover:text-accent-secondary transition-colors" />
                  <span className="flex-1 text-[11px] font-black text-white tracking-[0.2em]">{item}</span>
                  <Edit3 className="w-4 h-4 text-on-surface-variant hover:text-white cursor-pointer transition-colors" />
                </motion.div>
              ))}
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl border border-dashed border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant hover:text-accent-secondary hover:border-accent-secondary/40 transition-all flex items-center justify-center gap-3"
              >
                <Plus className="w-4 h-4" />
                NEW NODE
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-8 space-y-10">
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-display font-black text-white italic uppercase tracking-tight">Portfolio Index</h3>
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mt-1">MASTER ARCHIVE DATA</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                <button className="px-5 py-2.5 rounded-xl bg-accent-primary text-black text-[10px] font-black uppercase tracking-widest transition-all">GRID</button>
                <button className="px-5 py-2.5 rounded-xl text-on-surface-variant hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">LIST</button>
              </div>
              <PremiumButton variant="primary" icon={Plus} size="sm" className="!h-10 !w-10 !rounded-xl !p-0">
                <span className="sr-only">ADD</span>
              </PremiumButton>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Neon Genesis', category: 'Branding & Identity', image: 'https://picsum.photos/seed/neon/800/600', status: 'Published' },
              { title: 'Aether Flow', category: 'Web Design', image: 'https://picsum.photos/seed/aether/800/600', status: 'Draft' },
              { title: 'Cyber UI', category: 'Motion Graphics', image: 'https://picsum.photos/seed/cyber/800/600', status: 'Published' },
              { title: 'Minimalist', category: 'Photography', image: 'https://picsum.photos/seed/minimal/800/600', status: 'Published' },
            ].map((project, i) => (
              <ProjectCard key={i} {...project} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
