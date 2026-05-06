import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
interface UserInfoCellProps {
  name: string;
  email: string;
  profilePhoto?: string;
}

const UserInfoCell = ({ name, email, profilePhoto }: UserInfoCellProps) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); // Get first 2 initials
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10 ">
        <AvatarImage src={profilePhoto} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium text-sm">{name}</span>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
};

export default UserInfoCell;
