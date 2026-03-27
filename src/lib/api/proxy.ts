import { NextRequest, NextResponse } from "next/server";
import { config } from "../../../config";

const BACKEND_BASE_URL = config.api_base_url;

export const proxyRequest = async (request: NextRequest, path: string) => {
  const url = new URL(path, BACKEND_BASE_URL);

  const upstream = await fetch(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
  });

  const nextResponse = new NextResponse(upstream.body, {
    status: upstream.status,
  });

  upstream.headers.forEach((value, key) => {
    nextResponse.headers.set(key, value);
  });

  return nextResponse;
}
