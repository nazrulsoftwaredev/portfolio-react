import React from "react";
import { Button } from "@/components/ui";

type PaginationItem =
  | { type: "page"; page: number; active: boolean }
  | { type: "ellipsis"; key: string };

const buildItems = (currentPage: number, totalPages: number): PaginationItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }).map((_, idx) => {
      const page = idx + 1;
      return { type: "page", page, active: page === currentPage } as const;
    });
  }

  const items: PaginationItem[] = [];
  const pushPage = (page: number) =>
    items.push({ type: "page", page, active: page === currentPage });

  pushPage(1);

  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  if (left > 2) items.push({ type: "ellipsis", key: "left" });
  for (let p = left; p <= right; p += 1) pushPage(p);
  if (right < totalPages - 1) items.push({ type: "ellipsis", key: "right" });

  pushPage(totalPages);
  return items;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  const items = buildItems(currentPage, totalPages);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        variant="outline"
        size="sm"
        className="rounded-lg text-xs font-semibold bg-muted/20 hover:bg-muted/30"
      >
        Prev
      </Button>

      {items.map((item) => {
        if (item.type === "ellipsis") {
          return (
            <span
              key={item.key}
              className="px-2 text-xs font-semibold text-muted-foreground select-none"
              aria-hidden="true"
            >
              …
            </span>
          );
        }

        return (
          <Button
            key={item.page}
            type="button"
            onClick={() => onPageChange(item.page)}
            variant="outline"
            size="sm"
            className={`rounded-lg border text-xs font-semibold ${
              item.active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground bg-muted/20 hover:bg-muted/30"
            }`}
            aria-current={item.active ? "page" : undefined}
          >
            {item.page}
          </Button>
        );
      })}

      <Button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        variant="outline"
        size="sm"
        className="rounded-lg text-xs font-semibold bg-muted/20 hover:bg-muted/30"
      >
        Next
      </Button>
    </div>
  );
}

