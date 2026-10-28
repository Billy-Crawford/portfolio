import { NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://portfolio-backend-0xfo.onrender.com";

export const dynamic = "force-dynamic";

export async function GET() {
  const timestamp = new Date().toISOString();
  const endpoints = ["/api/health", "/api/projects", "/api/skills", "/api/services"];

  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "GET",
        cache: "no-store",
        signal: AbortSignal.timeout(45000),
      });
      const data = await response.json().catch(() => null);
      return {
        endpoint,
        status: response.status,
        ok: response.ok,
        sample: Array.isArray(data) ? `${data.length} items` : data,
      };
    })
  );

  const summary = results.map((res, index) => {
    if (res.status === "fulfilled") {
      return res.value;
    }
    return {
      endpoint: endpoints[index],
      status: 500,
      ok: false,
      error: res.reason instanceof Error ? res.reason.message : String(res.reason),
    };
  });

  const allOk = summary.every((item) => item.ok);

  return NextResponse.json(
    {
      status: allOk ? "alive" : "partial",
      timestamp,
      backend: API_URL,
      results: summary,
    },
    { status: allOk ? 200 : 207 }
  );
}

