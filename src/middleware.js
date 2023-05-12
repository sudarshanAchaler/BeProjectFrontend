import { NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "./router/routes";

export function middleware(request) {
  const currentUser = request.cookies.get("user")?.value;

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!currentUser || Date.now() > JSON.parse(currentUser).expiry)
  ) {
    request.cookies.delete("user");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("user");

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
}