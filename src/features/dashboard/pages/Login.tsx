import React from 'react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Globe,
  User,
  MessageSquare,
  Eye,
  EyeOff
} from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-primary/30">
            <span className="text-background font-bold text-3xl">C</span>
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight">The Curator</h1>
          <p className="text-text-secondary">Welcome back. Please enter your details.</p>
        </div>

        <div className="glass rounded-[32px] p-10 space-y-8 shadow-2xl shadow-black/50">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-secondary/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-text-secondary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-text-secondary">Password</label>
                <button className="text-xs font-bold text-primary hover:underline">Forgot Password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full bg-secondary/50 border border-border rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-text-secondary/50"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={onLogin}
            className="w-full bg-primary text-background py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 group"
          >
            Sign In
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-secondary/50 px-4 text-text-secondary rounded-full border border-border">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button className="glass p-4 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all group">
              <Globe className="w-6 h-6 text-text-secondary group-hover:text-primary transition-colors" />
            </button>
            <button className="glass p-4 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all group">
              <User className="w-6 h-6 text-text-secondary group-hover:text-primary transition-colors" />
            </button>
            <button className="glass p-4 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all group">
              <MessageSquare className="w-6 h-6 text-text-secondary group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-text-secondary">
          Don't have an account? <button className="font-bold text-primary hover:underline">Create Account</button>
        </p>
      </div>
    </div>
  );
};
