"use client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

import { getDoctors } from "@/services/doctor.services";
import { ApiResponse } from "@/types/api.types";
import { IDoctor } from "@/types/doctor.types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTable from "@/components/shared/table/DataTable";

const DoctorsTable = () => {
  const { data: doctorsDataResponse, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const { data: doctors } = doctorsDataResponse! || [];
  //   console.log("doctors", doctors);

  const handleView = (doctor: IDoctor) => {
    console.log("View doctor", doctor);
  };
  const handleEdit = (doctor: IDoctor) => {
    console.log("Edit doctor", doctor);
  };
  const handleDelete = (doctor: IDoctor) => {
    console.log("Delete doctor", doctor);
  };

  const doctorColumns: ColumnDef<IDoctor>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    // { accessorKey: "specialization", header: "Specialization" },
    // { accessorKey: "experience", header: "Experience" },
    // { accessorKey: "rating", header: "Rating" },
    // { accessorKey: "name", header: "Name" },
  ];

  // const { getHeaderGroups, getRowModel } = useReactTable({
  //   data: doctors,
  //   columns: doctorColumns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  return (
    <DataTable
      data={doctors}
      columns={doctorColumns}
      isLoading={isLoading}
      emptyMessage="No Doctor Founds"
      actions={{
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
      }}
    />
  );
};

export default DoctorsTable;
