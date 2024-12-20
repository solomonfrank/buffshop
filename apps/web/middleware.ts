import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  try {
    // Your middleware logic
    const url = req.nextUrl;

    // Get hostname of request (e.g. demo.vms.com, demo.localhost:3000)
    const hostname = req.headers.get("host");
    const query = req.nextUrl.searchParams.toString();

    console.log("hostname", hostname);

    let currentHost;
    if (process.env.NODE_ENV === "production") {
      currentHost = hostname?.replace(
        `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        ""
      );
    } else {
      currentHost = hostname?.replace(".localhost:3000", "");
    }

    if (!currentHost) {
      return NextResponse.next();
    }

    // Get the pathname of the request (e.g. /, /home)
    const path = url.pathname;

    const res = req.cookies.get("accessToken");

    const role = req.cookies.get("role");

    const token = res?.value;

    if (path === "/") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (path.startsWith("/auth/login")) {
      if (token) {
        const redirectTo =
          role?.value === "superadmin" ? "/dashboard" : "/dashboard";
        return NextResponse.redirect(new URL(redirectTo, req.url));
      }
    }

    if (path.startsWith("/app")) {
      if (!token) {
        const from = req.cookies.get("from");

        const path = "/auth/login";
        return NextResponse.redirect(new URL(path, req.url));
      }
    }
    // rewrites for app pages
    if (hostname == `app.${process.env.ROOT_DOMAIN}`) {
      return NextResponse.rewrite(
        new URL(`/app${path === "/" ? "" : path}?${query}`, req.url)
      );
    }

    // rewrite everything else to `/[domain]/[path] dynamic route
    return NextResponse.rewrite(new URL(``, req.url));
  } catch (error) {
    console.error("Middleware error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
