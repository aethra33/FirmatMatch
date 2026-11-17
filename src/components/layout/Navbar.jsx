import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Search, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../ui/cn'

export function Navbar({ onToggleSidebar, collapsed, isApp }) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-40 glass border-b border-slate-200',
        mobileMenuOpen ? 'bg-white/95 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="w-full px-5 sm:px-7">
        <div className="flex items-center justify-between h-16">
          {isApp && (
            <button
              onClick={onToggleSidebar}
              className="hidden md:flex mr-3 w-9 h-9 rounded-xl glass flex items-center justify-center text-brand-textSecondary hover:text-brand-text glass-hover transition-transform duration-300"
              aria-label="Sidebar"
            >
              <div className={`transition-transform duration-300 ease-in-out ${collapsed ? '-rotate-180' : 'rotate-0'}`}>
                {collapsed ? <ChevronRight size={18} strokeWidth={2} /> : <ChevronLeft size={18} strokeWidth={2} />}
              </div>
            </button>
          )}
          <Link
            to="/"
            className="flex items-center gap-2.5"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-lime to-brand-turquoise flex items-center justify-center shadow-orbe">
              <span className="text-[10px] font-outfit font-bold text-brand-text">F</span>
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight">Firmat<span className="text-brand-lime">Match</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/jugador"
              className={cn(
                'text-sm font-medium transition-colors',
                location.pathname.startsWith('/jugador')
                  ? 'text-brand-lime'
                  : 'text-brand-textSecondary hover:text-brand-text',
              )}
            >
              Jugador
            </Link>
            <Link
              to="/dueno"
              className={cn(
                'text-sm font-medium transition-colors',
                location.pathname.startsWith('/dueno')
                  ? 'text-brand-turquoise'
                  : 'text-brand-textSecondary hover:text-brand-text',
              )}
            >
              Complejos
            </Link>
            <Link
              to="/publicar"
              className="glass text-brand-text font-semibold rounded-xl px-4 py-2.5 text-sm glass-hover transition-all hover:border-brand-lime hover:bg-brand-lime/5"
            >
              Publicar partido
            </Link>
            <div className="flex items-center gap-3 ml-auto">
              <Link to="/notificaciones">
                <div className="relative w-9 h-9 rounded-2xl glass flex items-center justify-center text-brand-textSecondary hover:text-brand-text glass-hover">
                  <ShieldCheck size={20} strokeWidth={2} />
                  <span className="absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full bg-brand-lime shadow-orbe" />
                </div>
              </Link>
              <Link to="/perfil/u_1">
                <div className="w-9 h-9 rounded-2xl glass flex items-center justify-center text-brand-textSecondary hover:text-brand-text glass-hover overflow-hidden border border-slate-200">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gian"
                    alt="Perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="md:hidden w-9 h-9 rounded-xl glass flex items-center justify-center text-brand-textSecondary hover:text-brand-text glass-hover"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/90 backdrop-blur-md">
          <div className="px-5 py-4 space-y-3">
            <Link
              to="/jugador"
              className="block px-4 py-3 rounded-2xl text-brand-textSecondary hover:bg-slate-50 hover:text-brand-text transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Jugador
            </Link>
            <Link
              to="/dueno"
              className="block px-4 py-3 rounded-2xl text-brand-textSecondary hover:bg-slate-50 hover:text-brand-text transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Complejos
            </Link>
            <Link
              to="/publicar"
              className="w-full px-4 py-3 rounded-2xl bg-brand-lime text-brand-ink font-semibold text-sm text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Publicar partido
            </Link>
            <Link
              to="/perfil/u_1"
              className="block px-4 py-3 rounded-2xl text-brand-textSecondary hover:bg-slate-50 hover:text-brand-text transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mi perfil
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
