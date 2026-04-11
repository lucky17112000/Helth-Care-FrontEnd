interface StatsCardProps {
  title: string;
  value: string | number;
  iconName: string;
  description?: string;
  className?: string;
}
import React, { createElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { create } from "domain";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";

const StatsCard = ({
  title,
  value,
  iconName,
  description,
  className,
}: StatsCardProps) => {
  return (
    <Card className={cn("hover:shadow-md transition-shadow ", className)}>
      <CardHeader className="flex flex-row items-center justify-between pd-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          {createElement(getIconComponent(iconName), { className: "w-6 h-6" })}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
