"use server";
import {
  getDashboardRoute,
  isvalidRedirectForRole,
  UserRole,
} from "@/lib/authUtiles";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookie } from "@/lib/tokenUtiles";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import axios from "axios";
import { redirect } from "next/navigation";

export const loginAction = async (
  payload: ILoginPayload,
  redirectpath?: string,
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
    const { role, emailVerified, needPasswordChange, email } = user;
    //server action e server to server communication hoy tai jkhn server action hoye tkhn direct cokkie browser e hoy na tai manually broser e cookie set korte hobe sbrowser e
    // console.log(token);
    await setTokenInCookie("accessToken", accessToken);
    await setTokenInCookie("refreshToken", refreshToken);
    await setTokenInCookie("better-auth.session_token", token);

    // redirect("/dashboard");
    // if (!emailVerified) {
    //   redirect("/verify-email");
    // } else
    if (needPasswordChange) {
      redirect(`/reset-password?email=${email}`);
    } else {
      const targetPath =
        redirectpath && isvalidRedirectForRole(redirectpath, role as UserRole)
          ? redirectpath
          : getDashboardRoute(role as UserRole);
      redirect(targetPath);
    }
  } catch (error: any) {
    (console.log("vvvvvvvv", error.response), "vvvvvv");
    if (axios.isAxiosError(error)) {
      const code = error.response?.data?.error?.body?.code;
      const message = error.response?.data?.error?.body?.message;

      if (code === "EMAIL_NOT_VERIFIED" || message === "Email not verified") {
        redirect(`/verify-email?email=${payload.email}`);
      }
    }

    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error; // Rethrow the redirect error to be handled by Next.js
    }

    console.error("Login error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
};
