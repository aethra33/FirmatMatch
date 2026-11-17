import { cn } from './cn'

export function Input({ className, type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={cn(
        'w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-brand-text placeholder-brand-textMuted text-sm outline-none transition-all focus:border-brand-lime focus:ring-1 focus:ring-brand-lime',
        className,
      )}
      {...props}
    />
  )
}
