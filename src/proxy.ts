// import { match } from "assert";
import { NextRequest, NextResponse } from "next/server";
import { jwtUtiles } from "./lib/jwtUtiles";
import {
  getDashboardRoute,
  getRoutesOnwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtiles";

import {
  getNewTokenWithRefreshToken,
  getUserInfo,
} from "./services/auth.services";
import { isTokenExpiredSoon } from "./lib/tokenUtiles";

// proteted page e tha kalin jate token expire na hot se jonno refresh korar kaj korci'
async function refreshTokenMiddlware(refreshToken: string): Promise<boolean> {
  try {
    const resfresh = await getNewTokenWithRefreshToken(refreshToken);
    if (!resfresh) return false;
    return true;
  } catch (error) {
    console.error("Error refreshing token in middleware:", error);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  try {
    //   return NextResponse.redirect(new URL("/home", request.url));
    // console.log(request);

    const { pathname } = request.nextUrl; //eg:/dashboard or /doctor/dashboard or /admin/dashboard

    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const decodedAccessToken =
      accessToken &&
      jwtUtiles.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      ).data;

    const isValidAccessToken =
      accessToken &&
      jwtUtiles.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      ).success;
    let userRole: UserRole | null = null;
    if (decodedAccessToken) {
      userRole = decodedAccessToken.role as UserRole;
    }

    const routeOwner = getRoutesOnwner(pathname);
    const unifyedUserRole = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole; // Treat SUPER_ADMIN as ADMIN for routing purposes
    userRole = unifyedUserRole;
    const isAuth = isAuthRoute(pathname);
    //!SECTION poractive refesh token if access token is expired or about to expire within 5 minute

    if (
      isValidAccessToken &&
      refreshToken &&
      (await isTokenExpiredSoon(accessToken))
    ) {
      const requestHeader = new Headers(request.headers);
      const response = NextResponse.next({
        request: { headers: requestHeader },
      });

      try {
        const refreshed = await refreshTokenMiddlware(refreshToken);
        if (refreshed) {
          requestHeader.set("x-token-refreshed", "1");
        }
        return NextResponse.next({
          request: { headers: requestHeader },
          headers: response.headers,
        });
      } catch (error) {
        console.error("Error refreshing token in middleware:", error);
      }
      return response;
    }

    //!ROLE1 ->  User is logged in but trying to access auth route (e.g: login, register) -> redirect to dashboard
    if (isAuth && isValidAccessToken) {
      return NextResponse.redirect(
        new URL(getDashboardRoute(userRole as UserRole), request.url),
      );
    }

    //user trying to access reset password page

    if (pathname === "/reset-password") {
      const email = request.nextUrl.searchParams.get("email");
      //!SECTION user has needpasswordchange ture
      if (email && accessToken) {
        const userInfo = await getUserInfo();
        if (userInfo?.needPasswordChange) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(
            new URL(getDashboardRoute(userRole as UserRole), request.url),
          );
        }
      }
      //!SECTION user coming from forgot password flow
      if (email) {
        return NextResponse.next();
      }

      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    //!RULE-2 -> User trying to access public routes
    if (routeOwner === null) {
      return NextResponse.next();
    }
    //!RULE-3 -> User is trying to access protected route without login -> redirect to login
    if (!accessToken || !isValidAccessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    //!SECTION enforcing user to stay in reset-password page or verify-email pagr if their needpasswordchange or isEmailVerified flag is true respectivly
    if (accessToken) {
      const userInfo = await getUserInfo();
      if (userInfo?.emailVerified === false) {
        if (pathname !== "/verify-email") {
          const verifyEmailUrl = new URL("/verify-email", request.url);
          verifyEmailUrl.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(verifyEmailUrl);
        }
        return NextResponse.next();
      }
      if (userInfo && userInfo?.emailVerified && pathname === "/verify-email") {
        return NextResponse.redirect(
          new URL(getDashboardRoute(userRole as UserRole), request.url),
        );
      }
      //!SECTION
      if (userInfo?.needPasswordChange) {
        if (pathname !== "/reset-password") {
          const resetPasswordUrl = new URL("/reset-password", request.url);
          resetPasswordUrl.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(resetPasswordUrl);
        }
        return NextResponse.next();
      }
      if (
        userInfo &&
        !userInfo?.needPasswordChange &&
        pathname === "/reset-password"
      ) {
        return NextResponse.redirect(
          new URL(getDashboardRoute(userRole as UserRole), request.url),
        );
      }
    }
    //!Rule-4 -> User is trying to access protected route with login but doesn't have the role -> redirect to dashboard

    if (routeOwner === "COMMON") {
      return NextResponse.next();
    }
    //!Rule=5 => User is trying to acces roled based page but dosenot have required role -> redirect to dashboard
    if (
      routeOwner === "ADMIN" ||
      routeOwner === "DOCTOR" ||
      routeOwner === "PATIENT"
    ) {
      if (routeOwner !== userRole) {
        return NextResponse.redirect(
          new URL(getDashboardRoute(userRole as UserRole), request.url),
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in proxy middleware:", error);
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
