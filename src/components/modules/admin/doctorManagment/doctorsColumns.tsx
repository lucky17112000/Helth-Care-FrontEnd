import DateCell from "@/components/shared/Cell/DateCell";
import StatusBadgeCell from "@/components/shared/Cell/StatusBadgeCell";
import UserInfoCell from "@/components/shared/Cell/UserInfoCell";
import { Badge } from "@/components/ui/badge";
import { IDoctor } from "@/types/doctor.types";
import { ColumnDef } from "@tanstack/react-table";

export const doctorColumns: ColumnDef<IDoctor>[] = [
  //id or accesorkey is same as the key in data object
  { id: "id", accessorKey: "id", header: "ID", enableSorting: false },
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <UserInfoCell
          name={row.original.name}
          email={row.original.email}
          profilePhoto={row.original.profilePhoto}
        />
      );
    },
  },
  {
    id: "specialization",
    accessorKey: "specialization",
    header: "Specialization",
    enableSorting: false,

    cell: ({ row }) => {
      const specialties = Array.isArray(row.original.specialties)
        ? row.original.specialties
        : [];

      if (specialties.length === 0) {
        return <span className="text-xs text-muted-foreground">N/A</span>;
      }

      return (
        <div className="flex flex-col">
          {specialties.map((item, id) => {
            const title = item?.specialty?.title ?? "N/A";
            return (
              <Badge key={id} variant="outline" className="text-xs">
                {" "}
                {title}{" "}
              </Badge>
            );
          })}
        </div>
      );
    },
  },

  {
    id: "contactNumber",
    accessorKey: "contactNumber",
    header: "Contact Number",
    enableSorting: false,
    cell: ({ row }) => {
      return <span>{row.original?.contactNumber ?? "N/A"}</span>;
    },
  },
  {
    id: "experience",
    accessorKey: "experience",
    header: "Experience",
    cell: ({ row }) => {
      return <span>{row.original?.experience ?? 0}years</span>;
    },
  },
  {
    id: "appointmentFee",
    accessorKey: "appointmentFee",
    header: "Appointment Fee",
    enableSorting: false,
    cell: ({ row }) => {
      return <span>${row.original?.appointmentFee ?? 0}</span>;
    },
  },
  {
    id: "averageRating",
    accessorKey: "averageRating",
    header: "Average Rating",
    enableSorting: false,
    cell: ({ row }) => {
      return <span>{row.original?.averageRating ?? 0}⭐</span>;
    },
  },
  {
    id: "gender",
    accessorKey: "gender",
    header: "Gender",
    enableSorting: false,
    cell: ({ row }) => {
      return <span>{row.original?.gender ?? "N/A"}</span>;
    },
  },

  {
    id: "status",
    accessorKey: "user.status",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => {
      return <StatusBadgeCell status={row.original.user.status} />;
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Joined On",
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
      );
    },
  },
];
