import { getDashboardRoute } from "@/lib/authUtiles";
import { getCommonNavItems, getNavItemsByRole } from "@/lib/navItems";
import { getUserInfo } from "@/services/auth.services";
import { NavSection } from "@/types/dashboard.types";
import React from "react";
import DashBoardSidebarContent from "./DashBoardSidebarContent";

const DashboardSidebar = async () => {
  const userInfo = await getUserInfo();
  // const navItems: NavSection[] = getCommonNavItems(userInfo.role);
  const navItems = getNavItemsByRole(userInfo.role);
  const dashBoardHome = getDashboardRoute(userInfo.role);
  return (
    <DashBoardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashBoardHome={dashBoardHome}
    />
  );
};

export default DashboardSidebar;
