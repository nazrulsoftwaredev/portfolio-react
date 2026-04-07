import React from "react";
import { Download, Filter, RotateCcw, Search, Trash2 } from "lucide-react";
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
  selectedCount?: number;
  onClearSelection?: () => void;
  onDeleteSelected?: () => void;
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
  selectedCount = 0,
  onClearSelection,
  onDeleteSelected,
}) => (
  <div className="p-5 md:p-6 border-b border-border/60 flex flex-col xl:flex-row items-center justify-between gap-4 md:gap-5 bg-muted/20">
    <div className="relative w-full xl:w-[42%] group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search clients"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="w-full rounded-xl pl-11 pr-4 min-h-11 bg-muted/20 hover:bg-muted/30"
      />
    </div>

    <div className="flex items-center gap-2.5 w-full xl:w-auto">
      {selectedCount > 0 && (
        <>
          <span className="hidden 2xl:inline text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {selectedCount} Selected
          </span>
          <Button
            variant="outline"
            className="flex-1 xl:flex-none gap-2 min-h-11 bg-muted/20 hover:bg-muted/30 border-transparent"
            type="button"
            onClick={onClearSelection}
          >
            Clear Selection
          </Button>
          <Button
            variant="outline"
            className="flex-1 xl:flex-none gap-2 min-h-11 border-transparent text-red-600 hover:bg-red-500/10"
            type="button"
            onClick={onDeleteSelected}
          >
            <Trash2 className="w-4 h-4" />
            Delete Selected
          </Button>
        </>
      )}

      <Button
        variant="outline"
        className="flex-1 xl:flex-none gap-2 min-h-11 bg-muted/20 hover:bg-muted/30 border-transparent"
        type="button"
        onClick={onCycleStatusFilter}
      >
        <Filter className="w-4 h-4" />
        {statusFilter === "All" ? "Filters" : statusFilter}
      </Button>

      <Select
        value={sortBy}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger className="text-foreground rounded-lg px-4 min-h-11 h-11 bg-muted/20 hover:bg-muted/30 text-xs font-semibold">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border/60 text-foreground">
          <SelectItem value="value-desc">Value Desc</SelectItem>
          <SelectItem value="value-asc">Value Asc</SelectItem>
          <SelectItem value="name-asc">Name A-Z</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        className="flex-1 xl:flex-none gap-2 min-h-11 bg-muted/20 hover:bg-muted/30 border-transparent"
        type="button"
        onClick={onExport}
      >
        <Download className="w-4 h-4" />
        Export Data
      </Button>

      <Button
        variant="outline"
        className="flex-1 xl:flex-none gap-2 min-h-11 bg-muted/20 hover:bg-muted/30 border-transparent"
        type="button"
        onClick={onReset}
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </Button>
    </div>
  </div>
);
