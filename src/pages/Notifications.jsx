import { motion } from 'framer-motion'
import { Clock, CheckCircle2, ThumbsUp, ShieldAlert, Mail, Bell } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { useNotifications } from '../hooks/useNotifications'
import { toast } from 'sonner'

const TYPE_ICON = {
  confirmation: <CheckCircle2 size={20} strokeWidth={2} className="text-brand-lime" />,
  request: <ShieldAlert size={20} strokeWidth={2} className="text-brand-turquoise" />,
  change: <Clock size={20} strokeWidth={2} className="text-amber-400" />,
  rating: <ThumbsUp size={20} strokeWidth={2} className="text-rose-400" />,
  turn: <Mail size={20} strokeWidth={2} className="text-indigo-400" />,
}

export default function Notifications() {
  const { list, markAsRead, markAllAsRead, unreadCount } = useNotifications()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-outfit text-3xl font-bold text-brand-text">Notificaciones</h1>
          <p className="text-brand-textSecondary text-sm">Mantenete al tanto de tu actividad en FirmatMatch</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Marcar todo como leído ({unreadCount})
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {list.map((n) => (
          <motion.div
            key={n.id}
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
            className={`glass rounded-2xl p-4 border border-slate-200 transition-all ${!n.read ? 'border-brand-lime/40 bg-slate-50' : ''}`}
            onClick={() => markAsRead(n.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-surface flex items-center justify-center">
                  {TYPE_ICON[n.type]}
                </div>
                <div>
                  <p className={cnTitle(!n.read)}>{n.title}</p>
                  <p className="text-[11px] text-brand-textMuted">{n.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-dm text-brand-textMuted">{n.time}</span>
                {!n.read && <span className="w-2 h-2 rounded-full bg-brand-lime shadow-orbe" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {list.length === 0 && (
        <Card className="p-16 text-center">
          <Bell size={40} strokeWidth={2} className="mx-auto mb-4 text-brand-textMuted" />
          <h3 className="font-outfit font-bold text-brand-text">Sin notificaciones nuevas</h3>
          <p className="text-brand-textMuted text-sm">Cuando lleguen novedades, las verás aquí.</p>
        </Card>
      )}
    </div>
  )
}

function cnTitle(unread) {
  return `font-outfit font-semibold text-sm ${unread ? 'text-brand-text' : 'text-brand-textSecondary'}`
}
