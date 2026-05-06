import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import React from "react";
import TablePagination from "./TablePagination";

interface DataTableActions<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: DataTableActions<TData>;
  emptyMessage?: string;
  isLoading?: boolean;

  sorting?: {
    state: SortingState;
    onSortingChange: (state: SortingState) => void;
  };
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isPending?: boolean;
  };
}

const DataTable = <TData,>({
  data,
  columns,
  actions,
  emptyMessage,
  isLoading,
  sorting,
  pagination,
}: DataTableProps<TData>) => {
  const tableColumns: ColumnDef<TData>[] = actions
    ? [
        ...columns,
        {
          id: "actions", // unique id for the column
          header: "Actions",
          enableSorting: false,
          cell: ({ row }) => {
            const rowData = row.original;
            // console.log("rowData", rowData);
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {actions.onView && (
                    <DropdownMenuItem onClick={() => actions.onView?.(rowData)}>
                      view
                    </DropdownMenuItem>
                  )}
                  {actions.onEdit && (
                    <DropdownMenuItem onClick={() => actions.onEdit?.(rowData)}>
                      Edit
                    </DropdownMenuItem>
                  )}
                  {actions.onDelete && (
                    <DropdownMenuItem
                      onClick={() => actions.onDelete?.(rowData)}
                    >
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ]
    : columns;
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    // Table data is already sorted by backend when server-side sorting is enabled.
    manualSorting: Boolean(sorting),

    // Controlled sorting state comes from parent (DoctorsTable), not local table state.
    state: {
      ...(sorting ? { sorting: sorting.state } : {}),
    },
    // Header click triggers this callback; parent decides URL/query update.
    onSortingChange: sorting
      ? (updater) => {
          const currentSorting = sorting.state;

          const nextSortingState =
            typeof updater === "function" ? updater(currentSorting) : updater;
          sorting.onSortingChange(nextSortingState);
        }
      : undefined,
  });
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </div>
      )}
      {/* table component with actions dropdown menu */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <Button
                        variant={"ghost"}
                        className="h-auto cursor-pointer p-0 font-semibold hover:bg-transparent hover:text-inherit focus-visible:ring-0"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                    {header.column.getCanSort() ? (
                      header.column.getIsSorted() === "asc" ? (
                        <ArrowUp className="inline-block h-3 w-3" />
                      ) : header.column.getIsSorted() === "desc" ? (
                        <ArrowDown className="inline-block h-3 w-3" />
                      ) : (
                        <ArrowUpDown className="inline-block h-3 w-3 opacity-50" />
                      )
                    ) : null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {getRowModel().rows.length > 0 ? (
              getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="text-center py-4"
                >
                  {emptyMessage || "No data available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination ? (
        <TablePagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
          isPending={pagination.isPending}
        />
      ) : null}
    </div>
  );
};

export default DataTable;
