"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
// import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.types";
import { UserInfo } from "@/types/user.types";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashBoardHome: string;
}

const DashBoardSidebarContent = ({
  userInfo,
  navItems,
  dashBoardHome,
}: DashboardSidebarContentProps) => {
  const pathName = usePathname();
  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-card">
      {/* logo/brand */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href={dashBoardHome}>
          <span className="text-xl font-bold text-primary">PH HelthCare</span>
        </Link>
      </div>
      {/* navigation area */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navItems.map((section, sectionId) => (
            <div key={sectionId}>
              {section.title && (
                <h4
                  key={sectionId}
                  className="px-3 mt-4 mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider uppercase"
                >
                  {section.title}
                </h4>
              )}
              <div className="space-y-1">
                {section.items.map((item, id) => {
                  const isActive = pathName === item.href;
                  const Icon = getIconComponent(item.icon as string);
                  return (
                    <Link
                      href={item.href || "/"}
                      key={id}
                      className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                        isActive
                          ? "bg-accent"
                          : "transparent hover:bg-accent hover:accent-foreground",
                      )}
                    >
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* user info at bottom */}
      <div className="border-t px-3 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {userInfo.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{userInfo.name}</p>
            <p className="truncate text-xs text-muted-foreground capitalize">
              {userInfo.role.toLocaleLowerCase().replace("-", " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSidebarContent;
