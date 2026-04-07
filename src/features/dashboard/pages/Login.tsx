import React from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Shield } from "lucide-react";
import { Button, Input } from "@/components/ui";
import type { AuthCredentials } from "../api";

interface LoginProps {
  onLogin: (credentials: AuthCredentials) => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
}

export const Login: React.FC<LoginProps> = ({ onLogin, loading, error }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onLogin({ email, password });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Shield className="w-8 h-8 text-background" />
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight">
            Admin Login
          </h1>
          <p className="text-text-secondary">
            Authorized admins only. Enter your credentials to continue.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-3xl p-8 space-y-8 shadow-sm"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary ml-1">
                Admin Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mdnazrul.com"
                  className="w-full bg-background rounded-xl pl-12 pr-4"
                  autoComplete="username"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background rounded-xl pl-12 pr-12"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  disabled={loading}
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

          {error ? (
            <p className="text-sm font-medium text-red-500" role="alert">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-auto bg-primary text-background py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition group"
          >
            {loading ? "Signing In..." : "Log In as Admin"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </div>
    </div>
  );
};
