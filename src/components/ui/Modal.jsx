import { useEffect } from 'react'
import { cn } from './cn'
import { X } from 'lucide-react'

export function Modal({ isOpen, onClose, children, className }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-200 bg-white shadow-glass-hover overflow-auto max-h-[90vh] slide-up',
          className,
        )}
      >
        <div className="flex items-center justify-between p-6">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl glass flex items-center justify-center text-brand-textSecondary hover:text-brand-text transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </>
  )
}
