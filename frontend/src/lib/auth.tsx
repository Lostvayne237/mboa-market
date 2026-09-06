import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api, getAccess, setTokens } from "./api";
import type { Role, User } from "./types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (data: {
    email: string;
    username: string;
    password: string;
    role: Role;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAccess()) {
      setLoading(false);
      return;
    }
    api<User>("/api/auth/me/", { auth: true })
      .then(setUser)
      .catch(() => setTokens(null, null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await api<{ access: string; refresh: string }>(
      "/api/auth/login/",
      { method: "POST", body: { email, password } },
    );
    setTokens(data.access, data.refresh);
    const me = await api<User>("/api/auth/me/", { auth: true });
    setUser(me);
    return me;
  }, []);

  const register = useCallback(
    async (data: { email: string; username: string; password: string; role: Role }) => {
      await api("/api/auth/register/", { method: "POST", body: data });
      await login(data.email, data.password);
    },
    [login],
  );

  const logout = useCallback(() => {
    setTokens(null, null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
