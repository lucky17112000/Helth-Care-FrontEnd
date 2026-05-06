interface DateCellProps {
  date: Date | string;
  formatString?: string;
}

import { format } from "date-fns";
import React from "react";

const DateCell = ({ date, formatString }: DateCellProps) => {
  if (!date) return <span className="text-sm text-muted-foreground">-</span>;
  const formattedDate = format(new Date(date), formatString || "MMM dd, yyyy");
  return <span className="text-sm text-muted-foreground">{formattedDate}</span>;
};

export default DateCell;
