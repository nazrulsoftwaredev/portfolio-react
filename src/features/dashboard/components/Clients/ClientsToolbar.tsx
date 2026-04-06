import React from "react";
import { Download, Filter, RotateCcw, Search } from "lucide-react";
import { PremiumButton } from "../PremiumButton";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import type { ClientStatus, SortOption } from "./types";

interface ClientsToolbarProps {
  query: string;
  statusFilter: "All" | ClientStatus;
  sortBy: SortOption;
  onQueryChange: (query: string) => void;
  onCycleStatusFilter: () => void;
  onSortChange: (sortBy: SortOption) => void;
  onExport: () => void;
  onReset: () => void;
}

export const ClientsToolbar: React.FC<ClientsToolbarProps> = ({
  query,
  statusFilter,
  sortBy,
  onQueryChange,
  onCycleStatusFilter,
  onSortChange,
  onExport,
  onReset,
}) => (
  <div className="p-8 border-b border-white/5 flex flex-col xl:flex-row items-center justify-between gap-8 bg-white/[0.01]">
    <div className="relative w-full xl:w-2/5 group">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant group-focus-within:text-accent-primary transition-colors" />
      <Input
        type="text"
        placeholder="SEARCH CLIENT DATABASE..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="w-full bg-white/5 border-white/10 rounded-2xl h-auto py-4 pl-14 pr-6 text-[11px] font-black tracking-widest text-white focus:ring-4 focus:ring-accent-primary/5 focus:border-accent-primary/50 uppercase placeholder:text-on-surface-variant/40"
      />
    </div>

    <div className="flex items-center gap-4 w-full xl:w-auto">
      <PremiumButton
        variant="outline"
        icon={Filter}
        className="flex-1 xl:flex-none"
        type="button"
        onClick={onCycleStatusFilter}
      >
        {statusFilter === "All" ? "FILTERS" : statusFilter}
      </PremiumButton>

      <Select
        value={sortBy}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger className="bg-transparent text-white border-white/10 rounded-2xl px-4 py-3 h-auto text-[10px] font-black uppercase tracking-widest">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent className="bg-surface border-white/10 text-white">
          <SelectItem value="value-desc">Value Desc</SelectItem>
          <SelectItem value="value-asc">Value Asc</SelectItem>
          <SelectItem value="name-asc">Name A-Z</SelectItem>
        </SelectContent>
      </Select>

      <PremiumButton
        variant="outline"
        icon={Download}
        className="flex-1 xl:flex-none"
        type="button"
        onClick={onExport}
      >
        EXPORT DATA
      </PremiumButton>

      <PremiumButton
        variant="outline"
        icon={RotateCcw}
        className="flex-1 xl:flex-none"
        type="button"
        onClick={onReset}
      >
        RESET
      </PremiumButton>
    </div>
  </div>
);
