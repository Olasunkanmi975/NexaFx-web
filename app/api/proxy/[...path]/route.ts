import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

<<<<<<< HEAD
async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    const pathname = path.join("/");

    const targetUrl = new URL(`${BACKEND_URL}/${pathname}`);
    // Forward query string as-is
    req.nextUrl.searchParams.forEach((value, key) => {
        targetUrl.searchParams.set(key, value);
    });

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    // Use token from client cookie/header if present
    const token = req.headers.get("x-client-token") ?? req.cookies.get("access_token")?.value;
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const backendRes = await fetch(targetUrl.toString(), {
        method: req.method,
        headers,
        body: req.method !== "GET" && req.method !== "HEAD" ? await req.text() : undefined,
    });

    const body = await backendRes.text();

    return new NextResponse(body, {
        status: backendRes.status,
        headers: {
            "Content-Type": backendRes.headers.get("Content-Type") ?? "application/json",
        },
    });
=======
async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const pathname = path.join("/");

  const targetUrl = new URL(`${BACKEND_URL}/${pathname}`);
  req.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value);
  });

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const clientToken =
    req.headers.get("x-client-token") ??
    req.cookies.get("access_token")?.value;
  if (clientToken) {
    headers.set("Authorization", `Bearer ${clientToken}`);
  }

  const backendRes = await fetch(targetUrl.toString(), {
    method: req.method,
    headers,
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.text()
        : undefined,
  });

  const body = await backendRes.text();

  return new NextResponse(body, {
    status: backendRes.status,
    headers: {
      "Content-Type":
        backendRes.headers.get("Content-Type") ?? "application/json",
    },
  });
>>>>>>> 764c305853999c314cc80ab46a510043b8848d49
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
