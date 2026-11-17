import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Search as SearchIcon,
  Calendar,
  Users,
  User as UserIcon,
} from 'lucide-react'
import { cn } from '../ui/cn'

const items = [
  { path: '/jugador', icon: Home, label: 'Inicio' },
  { path: '/partidos', icon: SearchIcon, label: 'Partidos' },
  { path: '/turnos', icon: Calendar, label: 'Turnos' },
  { path: '/comunidad', icon: Users, label: 'Comunidad' },
  { path: '/perfil/u_1', icon: UserIcon, label: 'Perfil' },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="flex items-center justify-around px-3 py-2.5">
        {items.map((item) => {
          const active = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-10 p-1.5 rounded-xl transition-colors',
                active
                  ? 'bg-brand-lime/15 text-brand-lime border border-brand-lime/30'
                  : 'text-brand-textMuted hover:text-brand-text hover:bg-slate-50',
              )}
            >
              <Icon size={20} strokeWidth={2.5} />
              <span className={`text-[10px] font-dm font-medium leading-none ${active ? '' : 'opacity-80'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
