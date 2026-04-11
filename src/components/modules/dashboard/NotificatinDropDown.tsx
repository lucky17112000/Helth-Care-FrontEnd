"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Bell, Calendar, Clock, Server, User } from "lucide-react";
import { mock } from "node:test";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "appoinment" | "schedule" | "system" | "user" | "general";
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Appointment Scheduled",
    message:
      "You have a new appointment with Dr. Smith on 2024-07-01 at 10:00 AM.",
    type: "appoinment",
    timestamp: new Date(Date.now() - 3600 * 1000), // 1 hour ago
    read: false,
  },
  {
    id: "2",
    title: "Schedule Updated",
    message:
      "Your schedule has been updated. Please check your calendar for details.",
    type: "schedule",
    timestamp: new Date(Date.now() - 7200 * 1000), // 2 hours ago
    read: true,
  },
  {
    id: "3",
    title: "System Maintenance",
    message:
      "The system will undergo maintenance on 2024-07-05 from 1:00 AM to 3:00 AM.",
    type: "system",
    timestamp: new Date(Date.now() - 86400 * 1000), // 1 day ago
    read: false,
  },
  {
    id: "4",
    title: "New Message from Dr. Lee",
    message:
      "You have received a new message from Dr. Lee regarding your recent test results.",
    type: "user",
    timestamp: new Date(Date.now() - 172800 * 1000), // 2 days ago
    read: true,
  },
  {
    id: "5",
    title: "General Notification",
    message:
      "Don't forget to update your profile information for better service.",
    type: "general",
    timestamp: new Date(Date.now() - 259200 * 1000), // 3 days ago
    read: false,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "appoinment":
      return <Calendar className="h-4 w-4 text-blue-500" />;
    case "schedule":
      return <Clock className="h-4 w-4 text-green-500" />;
    case "system":
      return <Server className="h-4 w-4 text-red-500" />;
    case "user":
      return <User className="h-4 w-4 text-purple-500" />;
    case "general":
      return <Bell className="h-4 w-4 text-yellow-500" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const NotificatinDropDown = () => {
  const unreadCount = mockNotifications.filter(
    (notification) => !notification.read,
  ).length;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="relative">
          <Bell className="h-5 w-5" />
          <Badge
            className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full px-1 flex items-center justify-center"
            variant={"destructive"}
          >
            <span className="text-[10px] font-bold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"end"} className="w-80 ">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant={"secondary"} className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="max-h-60">
          {mockNotifications.length > 0 ? (
            mockNotifications.map((notificatin) => (
              <DropdownMenuItem
                key={notificatin.id}
                className="flex flex-col items-center gap-2 p-3 cursor-pointer"
              >
                <div>{getNotificationIcon(notificatin.type)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notificatin.title}</p>
                    {!notificatin.read && (
                      <Badge
                        variant={"destructive"}
                        className="h-5 w-5 rounded-full p-0 flex items-center justify-center"
                      >
                        <span className="text-[10px] font-bold">New</span>
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {notificatin.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(notificatin.timestamp, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No new notifications.
            </div>
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">View All</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificatinDropDown;
