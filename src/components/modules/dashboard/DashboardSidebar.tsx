import { getDashboardRoute } from "@/lib/authUtiles";
import { getCommonNavItems } from "@/lib/navItems";
import { getUserInfo } from "@/services/auth.services";
import { NavSection } from "@/types/dashboard.types";
import React from "react";

const DashboardSidebar = async () => {
  const userInfo = await getUserInfo();
  const navItems: NavSection[] = getCommonNavItems(userInfo.role);
  const dashBoardHome = getDashboardRoute(userInfo.role);
  return <div>dashboard sidebar</div>;
};

export default DashboardSidebar;
