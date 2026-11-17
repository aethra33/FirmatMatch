import { cn } from './cn'

export function Avatar({ src, name, className, size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : ''

  return (
    <div
      className={cn(
        'relative flex-shrink-0 rounded-full overflow-hidden border border-slate-200',
        sizes[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="flex items-center justify-center bg-brand-surface text-brand-textSecondary font-outfit font-semibold text-sm">
          {initials}
        </div>
      )}
      <div className="absolute -right-1 -bottom-1 w-3 h-3 rounded-full border-2 border-brand-bg bg-brand-lime" />
    </div>
  )
}
