"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IDoctor } from "@/types/doctor.types";

export const getDoctors = async () => {
  try {
    const doctors = await httpClient.get<IDoctor>("/doctors");
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
