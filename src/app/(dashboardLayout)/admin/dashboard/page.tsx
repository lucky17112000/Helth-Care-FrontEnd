import AdminDashBoardContent from "@/components/modules/dashboard/AdminDashBoardContent";
import { getDashBoardData } from "@/services/dashboard.services";
import { ApiResponse } from "@/types/api.types";
import { IAdminDashboardData } from "@/types/dashboard.types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const AdmindashboardPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashBoardData,
    staleTime: 0, // 30 second ei data ta fresh thakbe mane 30 second por abar call hobe data fetch korar jonno
    gcTime: 1000 * 60 * 5, // 5 minute por ei data ta memory theke remove kore dibe
  });
  // if i want load data i here when i havenot any interection that means in server action
  // const dashBoardData = queryClient.getQueryData([
  //   "admin-dashboard-data",
  // ]) as ApiResponse<IAdminDashboardData>;
  // console.log("dashBoardData in page:", dashBoardData.data);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashBoardContent />
    </HydrationBoundary>
  );
};

export default AdmindashboardPage;
