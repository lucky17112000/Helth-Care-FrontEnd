"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IDoctor } from "@/types/doctor.types";

export const getDoctors = async ({ queryString }: { queryString: string }) => {
  try {
    const doctors = await httpClient.get<ApiResponse<IDoctor[]>>(
      queryString ? `/doctors?${queryString}` : "/doctors",
    );
    return doctors;
  } catch (error: any) {
    console.error("Error fetching doctors:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch doctors",
      data: null,
      meta: null,
    };
  }
};
