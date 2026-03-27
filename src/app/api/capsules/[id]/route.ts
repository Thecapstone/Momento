import { NextRequest } from "next/server";
import { proxyRequest } from "@/lib/api/proxy";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return proxyRequest(request, `/api/memories/${params.id}/`);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  return proxyRequest(request, `/api/memories/${params.id}/`);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return proxyRequest(request, `/api/memories/${params.id}/`);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return proxyRequest(request, `/api/memories/${params.id}/`);
}
