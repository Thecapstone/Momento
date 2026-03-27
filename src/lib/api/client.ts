import { config } from "../../../config";

export const API_BASE_URL = config.api_base_url;

export class ApiError extends Error {
  constructor(public readonly status: number, message: string, public readonly body?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

function getUrl(path: string) {
  if (path.startsWith("http")) {
    return path;
  }

  return new URL(path, API_BASE_URL).toString();
}

function shouldSerializeBody(body: unknown): body is Record<string, unknown> {
  return Boolean(
    body &&
      typeof body === "object" &&
      !(body instanceof FormData) &&
      !(body instanceof URLSearchParams)
  );
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = getUrl(path);
  const headers = new Headers(init.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const requestInit: RequestInit = { ...init, headers };

  if (requestInit.body && shouldSerializeBody(requestInit.body)) {
    headers.set("Content-Type", "application/json");
    requestInit.body = JSON.stringify(requestInit.body);
  }

  const response = await fetch(url, requestInit);

  if (!response.ok) {
    const text = await response.text();
    let parsed: unknown;

    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }

    const message =
      typeof parsed === "object" && parsed !== null && "detail" in parsed
        ? (parsed as { detail?: string }).detail || response.statusText
        : typeof parsed === "string"
        ? parsed
        : response.statusText;

    throw new ApiError(response.status, message ?? "Request failed", parsed);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type");

  if (contentType && !contentType.includes("json")) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
