import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, Users, Ticket, Mail, ChevronLeft } from 'lucide-react'
import { Card, CardBody } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { Button } from '../components/ui/Button'
import { matches, players, getComplexById } from '../data/mockData'
import { toast } from 'sonner'

export default function MatchDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const match = matches.find((m) => m.id === id)
  const complex = match ? getComplexById(match.complexId) : null

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="font-outfit font-bold text-brand-text text-xl">Partido no encontrado</h2>
        <Button variant="outline" onClick={() => navigate('/partidos')}>
          Volver al feed
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft size={16} strokeWidth={2} /> Volver
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl border border-slate-200 overflow-hidden"
      >
        <div className="h-48 md:h-64 flex items-end p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-200/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
          <div className="relative z-10 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-dm font-bold uppercase tracking-wider text-brand-textMuted">{match.sport}</span>
              <h1 className="font-outfit font-bold text-brand-text text-2xl mb-1">{match.title}</h1>
              <div className="flex items-center gap-2 text-brand-textSecondary text-sm mt-1">
                <MapPin size={14} strokeWidth={1.5} />
                {match.complexName} — {match.complexAddress}
              </div>
            </div>
            <Badge variant="lime">{match.level}</Badge>
          </div>
        </div>

        <CardBody padded={false} className="p-6 md:p-8">
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <span className="text-[11px] font-dm font-bold uppercase tracking-wider text-brand-textMuted">Fecha y horario</span>
              <div className="flex items-center gap-3 text-lg font-semibold text-brand-text">
                <Clock size={18} strokeWidth={2} />
                <span>{new Date(match.date).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                <span className="text-brand-textMuted text-sm font-normal">· {match.time}</span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-dm font-bold uppercase tracking-wider text-brand-textMuted">Precio por persona</span>
              <div className="text-lg font-bold text-brand-lime">${match.price.toLocaleString()}</div>
            </div>
            <div className="col-span-2 space-y-2">
              <span className="text-[11px] font-dm font-bold uppercase tracking-wider text-brand-textMuted">Descripción</span>
              <p className="text-brand-textSecondary text-sm leading-relaxed">{match.description}</p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-outfit font-bold text-brand-text text-lg">Participantes</h3>
              <span className="text-brand-textSecondary text-sm">{match.players.length} de {match.maxPlayers} cupos</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {match.players.map((p) => {
                const player = players.find((pl) => pl.id === p.id) || p
                return (
                  <div key={p.id} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <Avatar name={player.name} src={player.avatar} />
                    <div>
                      <p className="text-sm font-medium text-brand-text">{player.name}</p>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        p.status === 'confirmed' ? 'bg-brand-lime/20 text-brand-lime border border-brand-lime/30' : 'bg-slate-50 text-brand-textMuted border border-slate-200'
                      }`}>
                        {p.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                )
              })}
              {match.players.length < match.maxPlayers && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 border-dashed">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-brand-textMuted">
                    +
                  </div>
                  <span className="text-brand-textSecondary text-sm">Cupo disponible</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <Button onClick={() => toast.success('Solicitud enviada')}>
              <Users size={18} strokeWidth={2} /> Unirme al partido
            </Button>
            <Button variant="outline" onClick={() => toast.success('Compartido por WhatsApp')}>
              <Mail size={18} strokeWidth={2} /> Compartir
            </Button>
          </div>
        </CardBody>
      </motion.div>
    </div>
  )
}
