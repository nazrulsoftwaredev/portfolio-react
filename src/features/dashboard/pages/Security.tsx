import React from "react";
import { KeyRound, ShieldCheck, Smartphone } from "lucide-react";
import { Button, Input } from "@/components/ui";

export const Security: React.FC = () => {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-background p-5 flex items-start gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-muted/60 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-display font-semibold tracking-tight text-foreground">
            Security posture
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Manage password, sessions, and 2FA settings.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-muted/20 p-5 space-y-4">
        <div className="flex items-center gap-3">
          <KeyRound className="w-4 h-4 text-primary" />
          <p className="text-sm font-semibold text-foreground">Change password</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground ml-1">
              Current password
            </label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-background rounded-xl"
              autoComplete="current-password"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground ml-1">
              New password
            </label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-background rounded-xl"
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="outline" className="border-transparent bg-muted/20 hover:bg-muted/30">
            Reset
          </Button>
          <Button type="button">Update password</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-background p-5 flex items-start justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-muted/60 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">2FA</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Protect your account with a second factor.
              </p>
            </div>
          </div>
          <Button type="button" variant="outline" className="border-transparent bg-muted/20 hover:bg-muted/30">
            Enable
          </Button>
        </div>

        <div className="rounded-2xl bg-background p-5 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
            Sessions
          </p>
          <p className="text-sm font-semibold text-foreground mt-2">
            Active: Chrome (Linux)
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Last activity: 2 minutes ago
          </p>

          <div className="pt-4">
            <Button type="button" variant="outline" className="border-transparent bg-muted/20 hover:bg-muted/30">
              Sign out of all sessions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

