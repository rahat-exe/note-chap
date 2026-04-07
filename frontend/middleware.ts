import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = ["/welcome", "/sign-in"];

export function middleware(request: NextRequest) {
  const session = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.includes(pathname);

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // exclude Next.js internals
  ],
};

// import { NextRequest, NextResponse } from "next/server";
// import { getSessionCookie } from "better-auth/cookies";

// export default function middleware(request: NextRequest) {
//   const session = getSessionCookie(request);
//   const { pathname } = request.nextUrl;

//   // If not logged in and trying to access app, redirect to /welcome
//   if (!session && pathname === "/") {
//     return NextResponse.redirect(new URL("/welcome", request.url));
//   }

//   // If logged in and trying to access /welcome or /sign-in, redirect to app
//   if (session && (pathname === "/welcome" || pathname === "/sign-in")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/", "/welcome", "/sign-in"],
// };
