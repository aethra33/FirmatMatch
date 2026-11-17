import { cn } from './cn'

export function Card({ children, className, padded = true, hover = false }) {
  return (
    <div
      className={cn(
        'glass rounded-2xl overflow-hidden relative',
        padded && 'p-5',
        hover && 'glass-hover',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }) {
  return <div className={cn('flex flex-col gap-1', className)}>{children}</div>
}

export function CardBody({ children, className }) {
  return <div className={cn('mt-2', className)}>{children}</div>
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn('mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3', className)}>
      {children}
    </div>
  )
}
