const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

const ACCESS_KEY = "mboa_access";
const REFRESH_KEY = "mboa_refresh";

export function getAccess(): string | null {
  return localStorage.getItem(ACCESS_KEY);
}

export function setTokens(access: string | null, refresh: string | null) {
  if (access) localStorage.setItem(ACCESS_KEY, access);
  else localStorage.removeItem(ACCESS_KEY);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
  else localStorage.removeItem(REFRESH_KEY);
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, data: unknown) {
    super(`API error ${status}`);
    this.status = status;
    this.data = data;
  }

  /** Flatten DRF error payloads into one readable message. */
  firstMessage(): string {
    const d = this.data as Record<string, unknown> | null;
    if (!d || typeof d !== "object") return "Something went wrong.";
    for (const value of Object.values(d)) {
      if (typeof value === "string") return value;
      if (Array.isArray(value) && typeof value[0] === "string") return value[0];
    }
    return "Something went wrong.";
  }
}

async function refreshAccess(): Promise<boolean> {
  const refresh = localStorage.getItem(REFRESH_KEY);
  if (!refresh) return false;
  const res = await fetch(`${BASE}/api/auth/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  if (!res.ok) {
    setTokens(null, null);
    return false;
  }
  const data = await res.json();
  localStorage.setItem(ACCESS_KEY, data.access);
  return true;
}

export async function api<T>(
  path: string,
  options: { method?: string; body?: unknown; auth?: boolean } = {},
): Promise<T> {
  const { method = "GET", body, auth = false } = options;

  const doFetch = () => {
    const headers: Record<string, string> = {};
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const token = getAccess();
    if (auth && token) headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  };

  let res = await doFetch();
  if (res.status === 401 && auth && (await refreshAccess())) {
    res = await doFetch();
  }

  if (!res.ok) {
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      /* non-JSON error body */
    }
    throw new ApiError(res.status, data);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}
