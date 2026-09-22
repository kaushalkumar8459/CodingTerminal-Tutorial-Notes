import { createContext } from "react";

export type UserRole = "admin" | "user";

export type AuthUser = {
  username: string;
  role: UserRole;
  token?: string;
};

export type LoginPayload = {
  username: string;
  password: string;
  role: UserRole;
};

export type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<{ ok: boolean; message: string }>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
