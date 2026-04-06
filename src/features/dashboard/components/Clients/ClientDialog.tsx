import React from "react";
import { X } from "lucide-react";
import { PremiumButton } from "../PremiumButton";
import { Button, Input } from "@/components/ui";
import { STATUS_ORDER } from "./constants";
import type { Client, ClientDialogMode, ClientValidationErrors } from "./types";

interface ClientDialogProps {
  mode: ClientDialogMode | null;
  draftClient: Client | null;
  errors: ClientValidationErrors;
  onClose: () => void;
  onSave: () => void;
  onDraftChange: (updater: (previous: Client) => Client) => void;
}

export const ClientDialog: React.FC<ClientDialogProps> = ({
  mode,
  draftClient,
  errors,
  onClose,
  onSave,
  onDraftChange,
}) => {
  if (!mode || !draftClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-white/10 rounded-2xl p-8 space-y-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary">
              {mode === "create" ? "Quick Create" : "Quick Edit"}
            </p>
            <h3 className="text-2xl font-display font-black text-white italic uppercase tracking-tight mt-1">
              {mode === "create" ? "Initiate Client" : "Edit Client"}
            </h3>
            <p className="text-xs text-on-surface-variant font-bold uppercase tracking-[0.2em] mt-2">
              {mode === "create"
                ? "Add a new client profile with complete contact details"
                : "Update client profile and protocol details"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-on-surface-variant hover:text-white"
            aria-label="Close client dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
              Client Name
            </label>
            <Input
              value={draftClient.name}
              onChange={(event) =>
                onDraftChange((previous) => ({
                  ...previous,
                  name: event.target.value,
                }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-black text-white"
              placeholder="Acme Holdings"
            />
            {errors.name && (
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
              Industry
            </label>
            <Input
              value={draftClient.industry}
              onChange={(event) =>
                onDraftChange((previous) => ({
                  ...previous,
                  industry: event.target.value,
                }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-black text-white"
              placeholder="Technology"
            />
            {errors.industry && (
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-400">
                {errors.industry}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
              Email
            </label>
            <Input
              value={draftClient.email}
              onChange={(event) =>
                onDraftChange((previous) => ({
                  ...previous,
                  email: event.target.value,
                }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-black text-white"
              placeholder="hello@client.com"
            />
            {errors.email && (
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
              Phone
            </label>
            <Input
              value={draftClient.phone}
              onChange={(event) =>
                onDraftChange((previous) => ({
                  ...previous,
                  phone: event.target.value,
                }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-black text-white"
              placeholder="+1-555-0100"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
              Website
            </label>
            <Input
              value={draftClient.website}
              onChange={(event) =>
                onDraftChange((previous) => ({
                  ...previous,
                  website: event.target.value,
                }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-black text-white"
              placeholder="https://client.com"
            />
            {errors.website && (
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-400">
                {errors.website}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
              Lifetime Value
            </label>
            <Input
              type="number"
              min={0}
              value={draftClient.value}
              onChange={(event) =>
                onDraftChange((previous) => ({
                  ...previous,
                  value: Math.max(0, Number(event.target.value || 0)),
                }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-black text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
              Momentum %
            </label>
            <Input
              type="number"
              value={draftClient.growth}
              onChange={(event) =>
                onDraftChange((previous) => ({
                  ...previous,
                  growth: Number(event.target.value || 0),
                }))
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-black text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
              Protocol Status
            </label>
            <div className="flex gap-2 flex-wrap">
              {STATUS_ORDER.map((status) => (
                <Button
                  key={status}
                  type="button"
                  onClick={() =>
                    onDraftChange((previous) => ({ ...previous, status }))
                  }
                  variant="outline"
                  className={`px-4 py-2 rounded-xl h-auto text-[10px] font-black uppercase tracking-[0.15em] border transition-all ${
                    draftClient.status === status
                      ? "bg-accent-primary text-white border-accent-primary"
                      : "bg-white/5 text-white border-white/10"
                  }`}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <PremiumButton variant="outline" type="button" onClick={onClose}>
            CANCEL
          </PremiumButton>
          <PremiumButton variant="primary" type="button" onClick={onSave}>
            {mode === "create" ? "CREATE CLIENT" : "SAVE CHANGES"}
          </PremiumButton>
        </div>
      </div>
    </div>
  );
};
