import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, Users, Ticket } from 'lucide-react'
import { Card, CardBody } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { format, parseISO } from 'date-fns'

export function MatchCard({ match, onJoin }) {
  const spots = match.maxPlayers - match.players.length
  const isFull = spots <= 0
  const dateLabel = format(parseISO(match.date), 'dd/MM')

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass rounded-3xl border border-slate-200 overflow-hidden group"
    >
      <div className="h-24 md:h-32 flex items-end p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-200/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
        <div className="relative z-10 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-dm font-bold uppercase tracking-wider text-brand-textMuted">
              {match.sport}
            </span>
            <h3 className="font-outfit font-bold text-brand-text text-lg mb-0.5 leading-tight">
              {match.title}
            </h3>
            <div className="flex items-center gap-2 text-brand-textSecondary text-sm mt-1">
              <MapPin size={14} strokeWidth={1.5} />
              {match.complexName}
            </div>
          </div>
          <Badge variant="lime">{spots} cupo{spots !== 1 ? 's' : ''}</Badge>
        </div>
      </div>

      <CardBody padded className="p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-5">
          <div className="flex items-center gap-2 text-brand-textSecondary">
            <Clock size={14} strokeWidth={1.5} className="text-brand-textMuted" />
            <span>{dateLabel} · {match.time}</span>
          </div>
          <div className="flex items-center gap-2 text-brand-textSecondary">
            <Users size={14} strokeWidth={1.5} className="text-brand-textMuted" />
            <span>{match.level}</span>
          </div>
          <div className="flex items-center gap-2 text-brand-textSecondary">
            <Ticket size={14} strokeWidth={1.5} className="text-brand-textMuted" />
            <span>${match.price.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-end gap-2 text-brand-textSecondary">
            <span className="font-dm font-semibold text-brand-text">
              {match.players.length}/{match.maxPlayers}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-5">
          {match.players.slice(0, 4).map((p) => (
            <Avatar key={p.id} name={p.name} src={p.avatar} size="sm" className="-ml-1 border-slate-200" />
          ))}
          {match.players.length > 4 && (
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-brand-textSecondary">
              +{match.players.length - 4}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant={isFull ? 'ghost' : 'primary'}
            size="sm"
            disabled={isFull}
            onClick={() => onJoin(match.id)}
            className="flex-1"
          >
            {isFull ? 'Completo' : 'Unirme al partido'}
          </Button>
          <Link
            to={`/partidos/${match.id}`}
            className="w-9 h-9 rounded-xl glass flex items-center justify-center text-brand-textSecondary hover:text-brand-text group-hover:border-brand-lime/50 transition-all"
          >
            <Ticket size={16} strokeWidth={2} />
          </Link>
        </div>
      </CardBody>
    </motion.div>
  )
}
