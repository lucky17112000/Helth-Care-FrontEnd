"use client";
import { SortingState } from "@tanstack/react-table";

import { getDoctors } from "@/services/doctor.services";
import { ApiResponse } from "@/types/api.types";
import { IDoctor } from "@/types/doctor.types";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import DataTable from "@/components/shared/table/DataTable";
import { doctorColumns } from "./doctorsColumns";

const UI_TO_API_SORT_FIELD: Record<string, string> = {
  experience: "experience",
  status: "user.status",
  createdAt: "createdAt",
};

// Reverse map keeps the sorted header highlighted even when URL uses backend field names.
const API_TO_UI_SORT_FIELD: Record<string, string> = {
  experience: "experience",
  "user.status": "status",
  status: "status",
  createdAt: "createdAt",
};

const DoctorsTable = ({
  queryString,
  queryParamsObject,
}: {
  queryString: string;
  queryParamsObject: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigationPending, startNavigationTransition] =
    React.useTransition();

  const currentPage = Number(searchParams.get("page") ?? 1);
  const safeCurrentPage =
    Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

  const {
    data: doctorsDataResponse,
    isLoading,
    isFetching,
  } = useQuery<ApiResponse<IDoctor[]>>({
    queryKey: ["doctors", queryParamsObject],
    queryFn: () => getDoctors({ queryString }),
  });

  const doctors = doctorsDataResponse?.data ?? [];
  const totalPages = doctorsDataResponse?.meta?.totalPages ?? 1;

  // Read sorting from URL so refresh/back-forward keep the same sorted view.
  const sortBy = searchParams.get("sortBy") ?? searchParams.get("sortby") ?? "";
  const sortOrder =
    searchParams.get("sortOrder") ?? searchParams.get("sortorder") ?? "";
  // console.log("sortOrder", sortOrder);
  // ekhane kun filed er upor serach kora hobe eta lekha hoyece
  const uiSortField = API_TO_UI_SORT_FIELD[sortBy] ?? "";

  const sortingState: SortingState = uiSortField
    ? [{ id: uiSortField, desc: sortOrder.toLowerCase() === "desc" }]
    : [];

  const handleSortingChange = (nextSortingState: SortingState) => {
    const params = new URLSearchParams(searchParams.toString());
    const nextSort = nextSortingState[0];

    if (!nextSort) {
      params.delete("sortBy");
      params.delete("sortOrder");
      params.delete("sortby");
      params.delete("sortorder");
    } else {
      // Convert UI column id to backend-accepted sort field.
      const apiSortField = UI_TO_API_SORT_FIELD[nextSort.id] ?? nextSort.id;
      params.set("sortBy", apiSortField);
      params.set("sortOrder", nextSort.desc ? "desc" : "asc");
      params.delete("sortby");
      params.delete("sortorder");
    }

    // Sorting changes should reset the page back to the beginning.
    params.delete("page");

    // URL update triggers server fetch with new sort params.
    const nextUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    startNavigationTransition(() => {
      router.push(nextUrl, { scroll: false });
    });
  };

  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));

    const nextUrl = `${pathname}?${params.toString()}`;
    startNavigationTransition(() => {
      router.push(nextUrl, { scroll: false });
    });
  };

  const isTableLoading = isLoading || isFetching || isNavigationPending;

  const handleView = (doctor: IDoctor) => {
    console.log("View doctor", doctor);
  };
  const handleEdit = (doctor: IDoctor) => {
    console.log("Edit doctor", doctor);
  };
  const handleDelete = (doctor: IDoctor) => {
    console.log("Delete doctor", doctor);
  };

  return (
    <DataTable
      data={doctors}
      columns={doctorColumns}
      isLoading={isTableLoading}
      emptyMessage="No Doctor Founds"
      actions={{
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
      }}
      sorting={{
        state: sortingState,
        onSortingChange: handleSortingChange,
      }}
      pagination={{
        currentPage: safeCurrentPage,
        totalPages,
        onPageChange: handlePageChange,
        isPending: isNavigationPending,
      }}
    />
  );
};

export default DoctorsTable;
