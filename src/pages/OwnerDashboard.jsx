import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Clock, CreditCard, Percent, Building2, ToggleRight, ToggleLeft } from 'lucide-react'
import { Card, CardBody } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'
import { toast } from 'sonner'

const COURTS = [
  { id: 'cancha-1', name: 'Cancha 1', sport: 'Fútbol 5' },
  { id: 'cancha-2', name: 'Cancha 2', sport: 'Fútbol 5' },
  { id: 'cancha-3', name: 'Cancha 3', sport: 'Pádel' },
  { id: 'cancha-4', name: 'Cancha 4', sport: 'Pádel' },
]

const TIME_SLOTS = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']

// Estado inicial de la grilla: libre / reservado / mantenimiento
const initialGrid = {}
COURTS.forEach((c) => {
  initialGrid[c.id] = TIME_SLOTS.reduce((acc, t) => {
    acc[t] = Math.random() < 0.15 ? 'mantenimiento' : Math.random() < 0.45 ? 'reservado' : 'libre'
    return acc
  }, {})
})

export default function OwnerDashboard() {
  const [grid, setGrid] = useState(initialGrid)
  const [pendingRequests, setPendingRequests] = useState(3)

  const cellLabel = (state) => {
    if (state === 'libre') return 'Libre'
    if (state === 'reservado') return 'Reservado'
    return 'Mantenimiento'
  }

  const cellColor = (state) => {
    if (state === 'libre') return 'bg-brand-lime/5 border border-brand-lime/10'
    if (state === 'reservado') return 'bg-brand-lime/20 border border-brand-lime/30'
    return 'bg-red-50 border border-red-100'
  }

  const cellTextColor = (state) => {
    if (state === 'libre') return 'text-brand-lime'
    if (state === 'reservado') return 'text-brand-limeDark'
    return 'text-red-600'
  }

  const toggleCell = (courtId, time) => {
    setGrid((prev) => {
      const next = { ...prev, [courtId]: { ...prev[courtId] } }
      const current = next[courtId][time]
      const states = ['libre', 'reservado', 'mantenimiento']
      const idx = states.indexOf(current)
      next[courtId][time] = states[(idx + 1) % states.length]
      toast.success(`Cancha ${courtId.split('-')[1]}: ${cellLabel(next[courtId][time])}`)
      return next
    })
  }

  const stats = [
    { label: 'Ingresos del mes', value: '$1.240.000', icon: <CreditCard size={20} strokeWidth={2} />, delta: '+12% vs mes pasado', color: 'text-brand-turquoise' },
    { label: 'Ocupación', value: '68%', icon: <Users size={20} strokeWidth={2} />, delta: 'vs 52% la semana pasada', color: 'text-brand-turquoise' },
    { label: 'Reservas activas', value: '14', icon: <Clock size={20} strokeWidth={2} />, delta: 'Hoy', color: 'text-brand-lime' },
    { label: 'Solicitudes pendientes', value: pendingRequests, icon: <Percent size={20} strokeWidth={2} />, delta: 'Requieren acción', color: 'text-brand-limeDark' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-outfit text-3xl font-bold text-brand-text">Panel del complejo</h1>
          <p className="text-brand-textSecondary text-sm">Club Atlético Firmat · Gestión de canchas y reservas</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Building2 size={18} strokeWidth={2} /> Administrar canchas
          </Button>
          <Button size="sm">
            <Clock size={18} strokeWidth={2} /> Publicar turno
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <Card key={s.label} hover>
            <CardBody padded={false} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-dm font-bold uppercase tracking-wider text-brand-textMuted">{s.label}</span>
                {s.icon}
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`rounded-xl p-1.5 ${s.color.replace('text-', 'bg-')}/10 flex items-center justify-center mb-2`}>{s.icon}</span>
                <span className="font-outfit font-bold text-2xl text-brand-text">{s.value}</span>
                <span className={`text-xs font-semibold ${s.color}`}>{s.delta}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Grilla horaria */}
      <div className="glass rounded-3xl p-6 md:p-8 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-outfit font-bold text-brand-text text-lg">Grilla horaria — Hoy</h2>
            <p className="text-brand-textMuted text-xs">Hacé clic en una celda para cambiar su estado</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2">
            <span className="flex items-center gap-1 text-[10px] font-dm text-brand-lime">
              <span className="w-2 h-2 rounded-full bg-brand-lime/10 border border-brand-lime/20" /> Libre
            </span>
            <span className="flex items-center gap-1 text-[10px] font-dm text-brand-limeDark">
              <span className="w-2 h-2 rounded-full bg-brand-lime/20 border border-brand-lime/30" /> Reservado
            </span>
            <span className="flex items-center gap-1 text-[10px] font-dm text-red-600">
              <span className="w-2 h-2 rounded-full bg-red-50 border border-red-100" /> Mantenimiento
            </span>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="text-[11px] font-dm font-bold uppercase tracking-wider text-brand-textMuted sticky left-0 bg-brand-surface/50 z-10 pl-4 py-4 border-b border-slate-200">
                  Cancha
                </th>
                {TIME_SLOTS.map((t) => (
                  <th key={t} className="text-[11px] font-dm font-bold uppercase tracking-wider text-brand-textMuted py-4 border-b border-slate-200 w-24">
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COURTS.map((court) => (
                <tr key={court.id} className="border-b border-slate-200">
                  <th className="sticky left-0 bg-brand-surface/80 z-20 pl-4 py-4 font-dm font-medium text-sm text-brand-text backdrop-blur">
                    {court.name}
                    <span className="ml-2 text-[10px] font-bold text-brand-textMuted uppercase">{court.sport}</span>
                  </th>
                  {TIME_SLOTS.map((t) => (
                    <td
                      key={t}
                      className={`w-24 h-12 rounded-xl text-[10px] font-dm font-bold flex items-center justify-center transition-all hover:scale-105 relative cursor-pointer ${
                        cellColor(grid[court.id][t])
                      } ${cellTextColor(grid[court.id][t])} border border-transparent`}
                      onClick={() => toggleCell(court.id, t)}
                    >
                      {cellLabel(grid[court.id][t])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button variant="outline" size="sm" disabled>
            <ToggleLeft size={16} strokeWidth={2} /> Día anterior
          </Button>
          <Button variant="outline" size="sm" disabled>
            Día siguiente <ToggleRight size={16} strokeWidth={2} />
          </Button>
        </div>
      </div>

      {/* Solicitudes pendientes */}
      <div className="glass rounded-3xl p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-outfit font-bold text-brand-text text-lg">Solicitudes de reserva</h2>
          <Badge variant="warning">{pendingRequests} pendientes</Badge>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Lucía Gómez', sport: 'Pádel', time: 'Mañana 18:30', court: 'Cancha 3' },
            { name: 'Martín Ruiz', sport: 'Fútbol 5', time: 'Mañana 20:00', court: 'Cancha 1' },
            { name: 'Valeria Ríos', sport: 'Pádel', time: 'Pasado 21:00', court: 'Cancha 4' },
          ].map((req, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <Avatar name={req.name} size="sm" />
                <div>
                  <span className="text-sm font-medium text-brand-text">{req.name}</span>
                  <p className="text-[11px] text-brand-textMuted">{req.sport} · {req.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-brand-lime text-brand-ink hover:bg-brand-limeDark" onClick={() => {
                  setPendingRequests((p) => p - 1)
                  toast.success('Reserva aceptada')
                }}>
                  Aceptar
                </Button>
                <Button size="sm" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-900" onClick={() => {
                  setPendingRequests((p) => p - 1)
                  toast.error('Reserva rechazada')
                }}>
                  Rechazar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
