import React from "react";
import { Download, Filter, RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui";
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
  <div className="p-8 border-b border-border flex flex-col xl:flex-row items-center justify-between gap-8 bg-muted/20">
    <div className="relative w-full xl:w-2/5 group">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="SEARCH CLIENT DATABASE..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="w-full bg-background border-border rounded-2xl h-auto py-4 pl-14 pr-6 text-[11px] font-semibold tracking-widest text-foreground uppercase placeholder:text-muted-foreground"
      />
    </div>

    <div className="flex items-center gap-4 w-full xl:w-auto">
      <Button
        variant="outline"
        className="flex-1 xl:flex-none gap-2"
        type="button"
        onClick={onCycleStatusFilter}
      >
        <Filter className="w-4 h-4" />
        {statusFilter === "All" ? "FILTERS" : statusFilter}
      </Button>

      <Select
        value={sortBy}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger className="bg-background text-foreground border-border rounded-2xl px-4 py-3 h-auto text-[10px] font-semibold uppercase tracking-widest">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border text-foreground">
          <SelectItem value="value-desc">Value Desc</SelectItem>
          <SelectItem value="value-asc">Value Asc</SelectItem>
          <SelectItem value="name-asc">Name A-Z</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        className="flex-1 xl:flex-none gap-2"
        type="button"
        onClick={onExport}
      >
        <Download className="w-4 h-4" />
        Export Data
      </Button>

      <Button
        variant="outline"
        className="flex-1 xl:flex-none gap-2"
        type="button"
        onClick={onReset}
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </Button>
    </div>
  </div>
);
