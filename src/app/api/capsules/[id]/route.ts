import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/api/proxy";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export async function GET(request: NextRequest, context: { params: Params }) {
  const { id } = await context.params;
  return proxyRequest(request, `/api/memories/${id}/`);
}

export async function PUT(request: NextRequest, context: { params: Params }) {
  const { id } = await context.params;
  return proxyRequest(request, `/api/memories/${id}/`);
}

export async function PATCH(request: NextRequest, context: { params: Params }) {
  const { id } = await context.params;
  return proxyRequest(request, `/api/memories/${id}/`);
}

export async function DELETE(request: NextRequest, context: { params: Params }) {
  const { id } = await context.params;
  return proxyRequest(request, `/api/memories/${id}/`);
}
