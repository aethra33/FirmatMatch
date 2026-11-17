import { cn } from './cn'

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const variants = {
    primary:
      'bg-brand-lime text-brand-ink font-dm font-semibold rounded-xl px-5 py-3 text-sm transition-all hover:bg-brand-limeDark hover:shadow-orbe disabled:opacity-50 disabled:pointer-events-none',
    secondary:
      'glass text-brand-text font-dm font-semibold rounded-xl px-5 py-3 text-sm transition-all glass-hover disabled:opacity-50 disabled:pointer-events-none',
    outline:
      'border border-brand-border text-brand-text font-dm font-semibold rounded-xl px-5 py-3 text-sm transition-all hover:border-brand-lime hover:bg-brand-lime/5 disabled:opacity-50 disabled:pointer-events-none',
    ghost:
      'text-brand-text/70 font-dm font-medium rounded-xl px-5 py-3 text-sm transition-all hover:bg-white/5 hover:text-brand-text disabled:opacity-50 disabled:pointer-events-none',
    danger:
      'bg-red-500/10 text-red-400 border border-red-500/30 font-dm font-semibold rounded-xl px-5 py-3 text-sm transition-all hover:bg-red-500/20 hover:border-red-500 disabled:opacity-50 disabled:pointer-events-none',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex items-center justify-center gap-2 min-w-[44px] touch-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
