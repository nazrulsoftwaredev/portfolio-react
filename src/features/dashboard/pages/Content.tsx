import React from 'react';
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
  GripVertical
} from 'lucide-react';

const ProjectCard = ({ title, category, image, status }: any) => (
  <div className="glass rounded-3xl overflow-hidden group hover:border-primary/30 transition-all duration-300">
    <div className="aspect-video relative overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
        <button className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform">
          <Edit3 className="w-5 h-5" />
        </button>
        <button className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform">
          <Eye className="w-5 h-5" />
        </button>
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white">
        {status}
      </div>
    </div>
    <div className="p-6 flex items-center justify-between">
      <div>
        <h4 className="font-display font-bold text-lg">{title}</h4>
        <p className="text-sm text-text-secondary">{category}</p>
      </div>
      <button className="text-text-secondary hover:text-red-400 transition-colors">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export const Content: React.FC = () => {
  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Website CMS</h2>
          <p className="text-text-secondary mt-1">Manage your portfolio content and site structure.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="glass px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
            <Eye className="w-5 h-5" />
            Preview Site
          </button>
          <button className="bg-primary text-background px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
            Publish Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="glass rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-display font-bold flex items-center gap-2">
              <Layout className="w-5 h-5 text-primary" />
              Site Identity
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Site Title</label>
                <input type="text" defaultValue="The Curator Portfolio" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Logo</label>
                <div className="w-full h-32 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary/50 cursor-pointer transition-all">
                  <ImageIcon className="w-8 h-8 text-text-secondary" />
                  <span className="text-xs text-text-secondary">Upload SVG or PNG</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-display font-bold flex items-center gap-2">
              <Type className="w-5 h-5 text-tertiary" />
              Navigation
            </h3>
            <div className="space-y-3">
              {['Home', 'Work', 'About', 'Contact'].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border group cursor-move">
                  <GripVertical className="w-4 h-4 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="flex-1 text-sm font-medium">{item}</span>
                  <Edit3 className="w-4 h-4 text-text-secondary hover:text-primary cursor-pointer" />
                </div>
              ))}
              <button className="w-full py-3 rounded-xl border border-dashed border-border text-sm font-medium text-text-secondary hover:text-primary hover:border-primary/50 transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add Nav Item
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-display font-bold">Portfolio Index</h3>
            <div className="flex items-center gap-3">
              <div className="flex bg-secondary/50 p-1 rounded-xl border border-border">
                <button className="px-4 py-1.5 rounded-lg bg-primary text-background text-xs font-bold">Grid</button>
                <button className="px-4 py-1.5 rounded-lg text-text-secondary text-xs font-bold hover:text-text-primary">List</button>
              </div>
              <button className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Neon Genesis', category: 'Branding & Identity', image: 'https://picsum.photos/seed/neon/800/600', status: 'Published' },
              { title: 'Aether Flow', category: 'Web Design', image: 'https://picsum.photos/seed/aether/800/600', status: 'Draft' },
              { title: 'Cyber Punk 2077', category: 'Motion Graphics', image: 'https://picsum.photos/seed/cyber/800/600', status: 'Published' },
              { title: 'Minimalist Living', category: 'Photography', image: 'https://picsum.photos/seed/minimal/800/600', status: 'Published' },
            ].map((project, i) => (
              <ProjectCard key={i} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
