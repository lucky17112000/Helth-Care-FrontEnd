import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type TablePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isPending?: boolean;
};

const getVisiblePages = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    "ellipsis",
    totalPages,
  ];
};

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isPending,
}: TablePaginationProps) => {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage <= 1 || isPending}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>

        {visiblePages.map((pageItem, index) => {
          if (pageItem === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-sm text-muted-foreground"
              >
                ...
              </span>
            );
          }

          if (typeof pageItem !== "number") {
            return null;
          }

          const isActive = pageItem === currentPage;

          return (
            <Button
              key={pageItem}
              type="button"
              size="sm"
              variant={isActive ? "default" : "outline"}
              disabled={isPending}
              className={cn(isActive && "pointer-events-none")}
              onClick={() => onPageChange(pageItem)}
            >
              {pageItem}
            </Button>
          );
        })}

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages || isPending}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
