import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Search as SearchIcon,
  Calendar,
  Users,
  User as UserIcon,
  Building2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '../ui/cn'

const items = [
  { path: '/jugador', icon: Home, label: 'Inicio' },
  { path: '/partidos', icon: SearchIcon, label: 'Partidos' },
  { path: '/turnos', icon: Calendar, label: 'Turnos' },
  { path: '/comunidad', icon: Users, label: 'Comunidad' },
  { path: '/perfil/u_1', icon: UserIcon, label: 'Perfil' },
]

export function Sidebar({ className, collapsed }) {
  const location = useLocation()

  return (
    <aside className={cn(
      'hidden md:flex flex-col border-r border-slate-200 pt-16 transition-[width] duration-300 ease-out',
      collapsed ? 'w-16' : 'w-72',
      className,
    )}>
      <div className={cn('px-4', collapsed ? 'px-2 pt-3 pb-3' : 'p-6')}>
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-lime to-brand-turquoise flex items-center justify-center shadow-orbe">
            <span className="text-[10px] font-outfit font-bold text-brand-text">F</span>
          </div>
          {!collapsed && (
            <span className="font-outfit font-bold text-xl tracking-tight">Firmat<span className="text-brand-lime">Match</span></span>
          )}
        </Link>
        {!collapsed && (
          <p className="mt-3 text-[11px] text-brand-textMuted uppercase tracking-wider">
            Partido &amp; comunidad
          </p>
        )}
      </div>

      <nav className={`flex-1 py-4 space-y-1 ${collapsed ? 'px-1' : 'px-4'}`}>
        {items.map((item) => {
          const Icon = item.icon
          const active = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-xl text-sm font-medium transition-all',
                collapsed ? 'px-2 py-2.5' : 'px-3 py-2.5',
                active
                  ? 'bg-brand-lime/10 text-brand-lime border border-brand-lime/20'
                  : 'text-brand-textSecondary hover:bg-slate-50 hover:text-brand-text',
              )}
            >
              <div className="w-6 flex justify-center">
                <Icon size={18} strokeWidth={2} />
              </div>
              {!collapsed && item.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-4 border-t border-slate-200">
        <Link
          to="/dueno"
          className={`flex items-center gap-3 rounded-xl text-sm font-medium transition-all text-brand-textSecondary hover:bg-slate-50 hover:text-brand-text ${collapsed ? 'px-2 py-2.5' : 'px-3 py-2.5'}`}
        >
          <Building2 size={18} strokeWidth={2} />
          {!collapsed && 'Panel del complejo'}
        </Link>
      </div>
    </aside>
  )
}
