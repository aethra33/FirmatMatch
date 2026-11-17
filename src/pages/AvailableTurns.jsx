import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Clock, DollarSign, ChevronRight } from 'lucide-react'
import { Card, CardBody } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { lastMinuteTurns, complexes, formatDateShort } from '../data/mockData'

export default function AvailableTurns() {
  const [filter, setFilter] = useState('todos')
  const [openRequest, setOpenRequest] = useState(null)

  const filtered = lastMinuteTurns.filter(
    (t) => filter === 'todos' || t.sport === filter,
  )

  const requestTurn = (turn) => {
    setOpenRequest(turn)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-outfit text-3xl font-bold text-brand-text">Turnos disponibles</h1>
          <p className="text-brand-textSecondary text-sm">
            Canchas libres con descuentos de último momento
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-48">
            <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted" />
            <input
              type="text"
              placeholder="Buscar complejo o deporte"
              className="w-full bg-brand-surface border border-brand-border rounded-xl px-3 pl-10 py-3 text-brand-text outline-none focus:border-brand-lime"
            />
          </div>
          <Button size="sm">
            <MapPin size={18} strokeWidth={2} /> Filtro en mapa
          </Button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {['todos', 'Fútbol 5', 'Pádel'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`whitespace-nowrap rounded-xl border px-4 py-2 text-xs font-medium transition-all ${
              filter === s
                ? 'bg-brand-turquoise border-brand-turquoise text-brand-ink'
                : 'border-slate-200 text-brand-textSecondary hover:border-brand-turquoise/50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((turn) => {
          const complex = complexes.find((c) => c.id === turn.complexId)
          return (
            <motion.div
              key={turn.id}
              whileHover={{ y: -4 }}
              className="glass rounded-3xl border border-slate-200 overflow-hidden group"
            >
              <CardBody padded={false} className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-outfit font-bold text-brand-text text-sm">{complex ? complex.name : turn.complexName}</h4>
                    <p className="text-brand-textMuted text-xs">{turn.sport} · {formatDateShort(turn.date)} {turn.time}</p>
                  </div>
                  <Badge variant="turquoise">-{turn.discount}%</Badge>
                </div>
                <div className="flex items-end gap-3 mb-5">
                  <span className="font-outfit font-bold text-xl text-brand-lime">${turn.promoPrice.toLocaleString()}</span>
                  <span className="text-brand-textMuted text-xs line-through">${turn.regularPrice.toLocaleString()}</span>
                  <span className="text-brand-textMuted text-xs">por persona</span>
                </div>
                <div className="flex items-center gap-2 text-brand-textSecondary text-sm mb-5">
                  <MapPin size={14} strokeWidth={1.5} />
                  <span>{turn.courts} cancha{turn.courts !== 1 ? 's' : ''} disponible{turn.courts !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => requestTurn(turn)} className="flex-1">
                    Solicitar reserva
                  </Button>
                  <ChevronRight size={16} strokeWidth={2} className="text-brand-textMuted group-hover:text-brand-text" />
                </div>
              </CardBody>
            </motion.div>
          )
        })}
      </div>

      <div className="glass rounded-3xl p-6 md:p-8 border border-slate-200">
        <h2 className="font-outfit font-bold text-brand-text text-lg mb-5">¿Cómo funciona?</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-brand-textSecondary">
          <div className="flex items-center gap-3">
            <Clock size={16} strokeWidth={2} className="text-brand-turquoise" />
            <div>
              <div className="text-brand-text font-semibold">Elegí el turno</div>
              <div className="text-xs">Filtrá por complejo, deporte y horario</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign size={16} strokeWidth={2} className="text-brand-lime" />
            <div>
              <div className="text-brand-text font-semibold">Pagá menos</div>
              <div className="text-xs">Precios con hasta 42% de descuento</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ChevronRight size={16} strokeWidth={2} className="text-brand-text" />
            <div>
              <div className="text-brand-text font-semibold">Solicitá la reserva</div>
              <div className="text-xs">El complejo confirma tu turno al instante</div>
            </div>
          </div>
        </div>
      </div>

      {openRequest && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center" onClick={() => setOpenRequest(null)}>
          <div className="glass rounded-3xl border border-slate-200 w-full max-w-md p-6 shadow-glass-hover" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-outfit font-bold text-brand-text text-lg mb-1">Solicitar reserva</h3>
            <p className="text-brand-textSecondary text-sm mb-5">
              ¿Reservar {openRequest.sport} en <strong className="text-brand-text">{openRequest.complexName}</strong> para el {formatDateShort(openRequest.date)} a las {openRequest.time}?
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => setOpenRequest(null)}>Cancelar</Button>
              <Button size="sm" onClick={() => {
                setOpenRequest(null)
                toast.success('Solicitud de reserva enviada')
              }}>Confirmar solicitud</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
