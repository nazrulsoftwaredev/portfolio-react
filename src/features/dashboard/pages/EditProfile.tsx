import React from "react";
import { User, Camera } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { PageHeader } from "../components/common";

export const EditProfile: React.FC = () => {
  const [fullName, setFullName] = React.useState("Nazrul Islam");
  const [role, setRole] = React.useState("Creative Lead");
  const [email, setEmail] = React.useState("admin@mdnazrul.com");

  return (
    <div className="dash-stack">
      <div>
        <PageHeader
          className="gap-5 md:gap-6"
          title={
            <>
              Edit profile <br />
              identity
            </>
          }
          titleClassName="text-2xl sm:text-3xl lg:text-4xl"
          subtitle="Update your public display name and contact details."
          actions={
            <Button type="button" className="gap-2">
              <Camera className="w-4 h-4" />
              Change avatar
            </Button>
          }
        />
      </div>

      <div className="premium-card dash-card-pad space-y-6 md:space-y-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-muted/60 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-display font-semibold tracking-tight text-foreground">
              Profile details
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              These fields are used across the dashboard UI.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground ml-1">
              Full name
            </label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-background rounded-xl"
              placeholder="Your name"
              autoComplete="name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground ml-1">
              Role
            </label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-background rounded-xl"
              placeholder="Your role"
              autoComplete="organization-title"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground ml-1">
              Email
            </label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background rounded-xl"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-border/60">
          <Button type="button" variant="outline" className="border-transparent bg-muted/20 hover:bg-muted/30">
            Cancel
          </Button>
          <Button type="button">Save changes</Button>
        </div>
      </div>
    </div>
  );
};

