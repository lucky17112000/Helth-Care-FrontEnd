"use server";

import { setTokenInCookie } from "@/lib/tokenUtiles";
import { cookies } from "next/headers";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_API_URL) {
  throw new Error("BASE_API_URL is not defined in environment variables");
}

export async function getNewTokenWithRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
      // body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) {
      return false;
    }

    // return true;
    const { data } = await res.json();
    const { accessToken, refreshToken: newRefreshToken, token } = data;
    if (accessToken) {
      await setTokenInCookie("accessToken", accessToken);
    }
    if (newRefreshToken) {
      await setTokenInCookie("refreshToken", newRefreshToken);
    }
    if (token) {
      await setTokenInCookie("better-auth.session_token", token, 24 * 60 * 60); // Set session token with a fallback max age of 1 day`);
    }
    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

export async function getUserInfo() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;
  if (!accessToken) {
    return {
      id: "",
      email: "",
      role: "",
      needPasswordChange: false,
    };
  }
  const res = await fetch(`${BASE_API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken} ; better-auth.session_token=${sessionToken}`,
    },
  });
  if (!res.ok) {
    return {
      id: "",
      email: "",
      role: "",
      needPasswordChange: false,
    };
  }
  const { data } = await res.json();
  return data;
}
