import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { UserRole } from "../auth/authContextObject";
import { useAuth } from "../auth/useAuth";

function useRedirectPath() {
  const location = useLocation();

  return useMemo(() => {
    const query = new URLSearchParams(location.search);
    const redirect = query.get("redirect");

    if (!redirect) {
      return "/react";
    }

    try {
      const decoded = decodeURIComponent(redirect);
      return decoded.startsWith("/") ? decoded : "/react";
    } catch {
      return "/react";
    }
  }, [location.search]);
}

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const redirectPath = useRedirectPath();

  const [role, setRole] = useState<UserRole>("user");
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("user123");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated && user) {
    return <LinkGuard redirectPath={redirectPath} role={user.role} />;
  }

  const handleRoleChange = (nextRole: UserRole) => {
    setRole(nextRole);
    setUsername(nextRole);
    setPassword(nextRole === "admin" ? "admin123" : "user123");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const result = await login({ username, password, role });

    setIsSubmitting(false);

    if (!result.ok) {
      setErrorMessage(result.message);
      return;
    }

    navigate(role === "admin" ? redirectPath : "/react", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#fff8e7_42%,#eef2ff)] px-4 py-8 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-lg rounded-3xl border border-white/60 bg-white/85 p-6 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.7)] backdrop-blur sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700 sm:text-xs">Authentication</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">Login to Continue</h1>
        <p className="mt-2 text-sm text-slate-700">
          Admin can manage tutorials. User role can access learning routes.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-semibold text-slate-700" htmlFor="role">
            Role
            <select
              id="role"
              value={role}
              onChange={(event) => handleRoleChange(event.target.value as UserRole)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-cyan-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700" htmlFor="username">
            Username
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-cyan-500"
              autoComplete="username"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700" htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-cyan-500"
              autoComplete="current-password"
              required
            />
          </label>

          {errorMessage ? <p className="text-sm font-semibold text-rose-700">{errorMessage}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl border border-cyan-500 bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
          >
            {isSubmitting ? "Checking..." : "Login"}
          </button>
        </form>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
          <p>Demo credentials:</p>
          <p>User: user / user123</p>
          <p>Admin: admin / admin123</p>
        </div>

        <Link
          to="/react"
          className="mt-4 inline-flex rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-cyan-50"
        >
          Continue as learner
        </Link>
      </div>
    </div>
  );
}

type LinkGuardProps = {
  redirectPath: string;
  role: UserRole;
};

function LinkGuard({ redirectPath, role }: Readonly<LinkGuardProps>) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(role === "admin" ? redirectPath : "/react", { replace: true });
  }, [navigate, redirectPath, role]);

  return null;
}