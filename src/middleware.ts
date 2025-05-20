import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/Auth";
// import { getCurrentUser } from "./services/AuthServices";

// type TRole = keyof typeof roleBasedRoute;
const authRoutes = ["/login"];
// const roleBasedRoute = {
//   admin: [/^\/admin/],
// };

export const middleware = async (request: NextRequest) => {
  //("hello world");
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();
  // //('in',userInfo);
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`http://localhost:3000/?redirectPath=${pathname}`, request.url)
      );
    }
  }

  // if (userInfo. && roleBasedRoute[userInfo.role as TRole]) {
  //   const routes = roleBasedRoute[userInfo.role as TRole];
  //   if (routes.some((route) => pathname.match(route))) {
  //     return NextResponse.next();
  //   }
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
};

export const config = {
  matcher: ["/admin/:page", "/admin"],
};
