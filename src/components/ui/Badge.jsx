import { cn } from './cn'

export function Badge({ children, className, variant = 'default' }) {
  const variants = {
    default: 'bg-slate-100 border border-slate-200 text-slate-600',
    lime: 'bg-lime-50 border border-lime-200 text-lime-800',
    turquoise: 'bg-turquoise-50 border border-turquoise-200 text-turquoise-800',
    success: 'bg-green-50 border border-green-200 text-green-700',
    warning: 'bg-amber-50 border border-amber-200 text-amber-700',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-dm font-semibold uppercase tracking-wider',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
