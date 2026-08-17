import { Link } from "react-router-dom";

export function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff1f2,#fffbeb_45%,#f8fafc)] px-4 py-10 text-slate-900 sm:px-6">
      <section className="mx-auto max-w-xl rounded-3xl border border-rose-200 bg-white/90 p-6 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.7)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-700 sm:text-xs">Access Control</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">Unauthorized</h1>
        <p className="mt-2 text-sm text-slate-700">
          This page requires admin access. Please login with an admin account.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/login"
            className="rounded-xl border border-cyan-500 bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
          >
            Go to Login
          </Link>
          <Link
            to="/react"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50"
          >
            Open Learner Site
          </Link>
        </div>
      </section>
    </div>
  );
}