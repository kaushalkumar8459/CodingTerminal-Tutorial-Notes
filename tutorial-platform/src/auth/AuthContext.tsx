import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthContext, type AuthUser, type AuthContextValue, type UserRole } from "./authContextObject";

const AUTH_STORAGE_KEY = "tutorial-platform-auth";
const authApiBaseUrl = import.meta.env.VITE_AUTH_API_BASE_URL?.trim() ?? "";

const credentialBook: Record<UserRole, { username: string; password: string }> = {
  admin: { username: "admin", password: "admin123" },
  user: { username: "user", password: "user123" },
};

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawValue) {
      return;
    }

    try {
      const parsed = JSON.parse(rawValue) as AuthUser;

      if (parsed?.username && (parsed.role === "admin" || parsed.role === "user")) {
        setUser(parsed);
      }
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const login: AuthContextValue["login"] = async ({ username, password, role }) => {
      if (authApiBaseUrl) {
        try {
          const response = await fetch(`${authApiBaseUrl}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
              role,
            }),
          });

          if (!response.ok) {
            const payload = (await response.json().catch(() => null)) as { message?: string } | null;
            return {
              ok: false,
              message: payload?.message ?? "Invalid credentials. Please check username/password.",
            };
          }

          const payload = (await response.json()) as {
            ok: boolean;
            message?: string;
            token?: string;
            user?: { username?: string; role?: UserRole };
          };

          if (!payload.ok || !payload.user?.username || (payload.user.role !== "admin" && payload.user.role !== "user")) {
            return {
              ok: false,
              message: payload.message ?? "Unexpected auth response.",
            };
          }

          const loggedInUser: AuthUser = {
            username: payload.user.username,
            role: payload.user.role,
            token: payload.token,
          };

          setUser(loggedInUser);
          window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));

          return {
            ok: true,
            message: payload.message ?? "Login successful.",
          };
        } catch {
          return {
            ok: false,
            message: "Auth API is unreachable. Please check backend service.",
          };
        }
      }

      const credential = credentialBook[role];
      const normalizedUsername = username.trim().toLowerCase();

      if (normalizedUsername !== credential.username || password !== credential.password) {
        return { ok: false, message: "Invalid credentials. Please check username/password." };
      }

      const loggedInUser: AuthUser = {
        username: credential.username,
        role,
      };

      setUser(loggedInUser);
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));

      return { ok: true, message: "Login successful." };
    };

    const logout = () => {
      setUser(null);
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    };

    return {
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

