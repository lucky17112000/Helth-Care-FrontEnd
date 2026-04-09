export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
] as const;

export const isAuthRoute = (pathName: string) => {
  return authRoutes.some((router: string) => router === pathName);
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const patientProtectedRoutes: RouteConfig = {
  pattern: [/^\/dashboard/],
  exact: ["/payment/success"],
};
export const commonProtectedRoutes: RouteConfig = {
  pattern: [],
  exact: ["/my-profile", "/change-password"],
};
export const doctorProtectedRoutes: RouteConfig = {
  pattern: [/^\/doctor\/dashboard/],
  exact: [],
};
export const adminorSuperAdminProtectedRoutes: RouteConfig = {
  pattern: [/^\/admin\/dashboard/],
  exact: [],
};
export const isRoutesMatches = (pathName: string, routeConfig: RouteConfig) => {
  if (routeConfig.exact.includes(pathName)) return true;
  return routeConfig.pattern.some((pattern) => pattern.test(pathName));
};

export const getRoutesOnwner = (
  pathName: string,
): "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
  if (isRoutesMatches(pathName, patientProtectedRoutes)) return "PATIENT";
  if (isRoutesMatches(pathName, doctorProtectedRoutes)) return "DOCTOR";
  if (isRoutesMatches(pathName, adminorSuperAdminProtectedRoutes))
    return "ADMIN";
  if (isRoutesMatches(pathName, commonProtectedRoutes)) return "COMMON";
  return null;
};
export const getDashboardRoute = (role: UserRole) => {
  if (role === "PATIENT") return "/dashboard";
  if (role === "DOCTOR") return "/doctor/dashboard";
  if (role === "ADMIN" || role === "SUPER_ADMIN") return "/admin/dashboard";
  return "/";
};

export const isvalidRedirectForRole = (
  redirectpath: string,
  role: UserRole,
): boolean => {
  const unifyedRole = role === "SUPER_ADMIN" ? "ADMIN" : role;
  role = unifyedRole;
  const routeOwner = getRoutesOnwner(redirectpath);
  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }
  if (routeOwner === role) return true;
  return false;
};
