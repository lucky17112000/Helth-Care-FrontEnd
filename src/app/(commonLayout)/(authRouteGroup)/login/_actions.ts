"use server";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookie } from "@/lib/tokenUtiles";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const loginAction = async (
  payload: ILoginPayload,
): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsedPayLoad = loginZodSchema.safeParse(payload);
  if (!parsedPayLoad.success) {
    return {
      success: false,
      message: parsedPayLoad.error.message,
    };
  }
  try {
    const response = await httpClient.post<ILoginResponse>(
      "/auth/login",
      parsedPayLoad.data,
    );
    const { accessToken, refreshToken, token, user } = response.data;
    //server action e server to server communication hoy tai jkhn server action hoye tkhn direct cokkie browser e hoy na tai manually broser e cookie set korte hobe sbrowser e
    await setTokenInCookie("accessToken", accessToken);
    await setTokenInCookie("refreshToken", refreshToken);
    await setTokenInCookie("better-auth.session_token", token);

    redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};
