import React from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  Globe,
  User,
  MessageSquare,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button, Input } from "@/components/ui";

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <span className="text-background font-bold text-3xl">C</span>
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight">
            The Curator
          </h1>
          <p className="text-text-secondary">
            Welcome back. Please enter your details.
          </p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 space-y-8 shadow-sm">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                <Input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-background border border-border rounded-xl pl-12 pr-4"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-text-secondary">
                  Password
                </label>
                <button className="text-xs font-bold text-primary hover:underline">
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-background border border-border rounded-xl pl-12 pr-12"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Button
            onClick={onLogin}
            className="w-full h-auto bg-primary text-background py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition group"
          >
            Sign In
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs font-semibold">
              <span className="bg-background px-4 text-text-secondary rounded-full border border-border">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button className="bg-background border border-border p-4 rounded-2xl flex items-center justify-center hover:bg-muted/60 transition-all group">
              <Globe className="w-6 h-6 text-text-secondary group-hover:text-primary transition-colors" />
            </button>
            <button className="bg-background border border-border p-4 rounded-2xl flex items-center justify-center hover:bg-muted/60 transition-all group">
              <User className="w-6 h-6 text-text-secondary group-hover:text-primary transition-colors" />
            </button>
            <button className="bg-background border border-border p-4 rounded-2xl flex items-center justify-center hover:bg-muted/60 transition-all group">
              <MessageSquare className="w-6 h-6 text-text-secondary group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-text-secondary">
          Don't have an account?{" "}
          <button className="font-bold text-primary hover:underline">
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};
