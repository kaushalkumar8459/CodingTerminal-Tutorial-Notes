type SpinnerProps = Readonly<{
  className?: string;
}>;

export function Spinner({ className = "h-4 w-4 border-2 border-slate-300 border-t-slate-700" }: SpinnerProps) {
  return <span aria-hidden="true" className={`inline-block animate-spin rounded-full ${className}`} />;
}
