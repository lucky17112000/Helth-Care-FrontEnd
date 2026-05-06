import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/types/doctor.types";
import React from "react";

interface StatusBadgeCellProps {
  status: UserStatus;
}

const StatusBadgeCell = ({ status }: StatusBadgeCellProps) => {
  return (
    <div>
      <Badge
        variant={
          status === UserStatus.ACTIVE
            ? "default"
            : status === UserStatus.BLOCKED
              ? "destructive"
              : "secondary"
        }
      >
        <span className="text-sm capitalize ">{status.toLowerCase()}</span>
      </Badge>
    </div>
  );
};

export default StatusBadgeCell;
