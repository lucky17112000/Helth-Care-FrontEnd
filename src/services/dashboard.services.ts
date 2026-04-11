"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IAdminDashboardData } from "@/types/dashboard.types";

export async function getDashBoardData() {
  try {
    const response = await httpClient.get<IAdminDashboardData>("/stats");
    return response;
  } catch (error: any) {
    console.error("Error fetching dashboard data:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message || "Failed to fetch dashboard data",
      data: null,
      meta: null,
    };
  }
}
