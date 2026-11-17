import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Filter, Clock as ClockIcon, Trophy, Award, Smile, ArrowLeft } from 'lucide-react'
import { useMatches } from '../hooks/useMatches'
import { MatchCard } from '../components/feed/MatchCard'
import { CreateMatchModal } from '../components/feed/CreateMatchModal'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardBody } from '../components/ui/Card'
import { Avatar } from '../components/ui/Avatar'
import { toast } from 'sonner'
import { currentUser } from '../data/mockData'

const SPORTS = ['todos', 'Fútbol 5', 'Pádel']
const DATES = ['todos', 'hoy', 'próximos']
const LEVELS = ['todos', 'Principiante', 'Intermedio', 'Avanzado']

export default function PlayerDashboard({ onGoHome }) {
  const { matches, filter, setFilter, complexes, addMatch } = useMatches()
  const [openPublish, setOpenPublish] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onGoHome}>
            <ArrowLeft size={16} strokeWidth={2} /> Volver al inicio
          </Button>
          <div>
            <h1 className="font-outfit text-3xl font-bold text-brand-text">Hola, {currentUser.name}</h1>
            <p className="text-brand-textSecondary text-sm">
              Partidos disponibles esta semana en tu ciudad
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setOpenPublish(true)}>
            <Plus size={18} strokeWidth={2} /> Publicar partido
          </Button>
          <Button size="sm">
            <Filter size={18} strokeWidth={2} /> Filtros
          </Button>
        </div>
      </div>

      {/* Filtros rápidos */}
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-2">
          <span className="text-[10px] font-dm font-bold uppercase text-brand-textMuted">Deporte</span>
          {SPORTS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter({ ...filter, sport: s })}
              className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                filter.sport === s
                  ? 'bg-brand-lime border-brand-lime text-brand-ink'
                  : 'border-slate-200 text-brand-textSecondary hover:border-brand-lime/50 hover:bg-slate-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] font-dm font-bold uppercase text-brand-textMuted">Fecha</span>
          {DATES.map((d) => (
            <button
              key={d}
              onClick={() => setFilter({ ...filter, date: d === 'próximos' ? today : d })}
              className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                filter.date === (d === 'próximos' ? today : d)
                  ? 'bg-brand-turquoise border-brand-turquoise text-brand-ink'
                  : 'border-slate-200 text-brand-textSecondary hover:border-brand-turquoise/50 hover:bg-slate-50'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] font-dm font-bold uppercase text-brand-textMuted">Nivel</span>
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setFilter({ ...filter, level: l })}
              className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                filter.level === l
                  ? 'bg-slate-50 border-slate-200 text-brand-text'
                  : 'border-slate-200 text-brand-textSecondary hover:border-brand-lime/50 hover:bg-slate-50'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Tu resumen */}
      <div className="glass rounded-3xl p-6 md:p-8 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-lime flex items-center justify-center text-brand-text text-xs font-bold">
              <Trophy size={16} strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-outfit font-bold text-brand-text">Tu resumen</h3>
              <p className="text-brand-textMuted text-xs">Tu actividad en FirmatMatch</p>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card key="matches" hover>
            <CardBody padded={false} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-dm font-bold uppercase text-brand-textMuted">Partidos jugados</span>
                <div className="w-6 h-6 rounded-full bg-brand-lime/10 flex items-center justify-center text-brand-lime">
                  <Trophy size={12} strokeWidth={2} />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-outfit font-bold text-2xl text-brand-text">{currentUser.matchesPlayed}</span>
                <span className="text-brand-textMuted text-xs">este mes</span>
              </div>
            </CardBody>
          </Card>
          <Card key="punctuality" hover>
            <CardBody padded={false} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-dm font-bold uppercase text-brand-textMuted">Puntualidad</span>
                <div className="w-6 h-6 rounded-full bg-brand-turquoise/10 flex items-center justify-center text-brand-turquoise">
                  <ClockIcon size={12} strokeWidth={2} />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-outfit font-bold text-2xl text-brand-text">{currentUser.punctuality}%</span>
                <span className="text-brand-textMuted text-xs">de asistencia</span>
              </div>
            </CardBody>
          </Card>
          <Card key="level" hover>
            <CardBody padded={false} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-dm font-bold uppercase text-brand-textMuted">Nivel de juego</span>
                <div className="w-6 h-6 rounded-full bg-brand-lime/10 flex items-center justify-center text-brand-lime">
                  <Award size={12} strokeWidth={2} />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-outfit font-bold text-2xl text-brand-text">{currentUser.gameLevel}</span>
                <span className="text-brand-textMuted text-xs">promedio</span>
              </div>
            </CardBody>
          </Card>
          <Card key="vibe" hover>
            <CardBody padded={false} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-dm font-bold uppercase text-brand-textMuted">Buena onda</span>
                <div className="w-6 h-6 rounded-full bg-brand-turquoise/10 flex items-center justify-center text-brand-turquoise">
                  <Smile size={12} strokeWidth={2} />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-outfit font-bold text-2xl text-brand-text">{currentUser.goodVibe}</span>
                <span className="text-brand-textMuted text-xs">/ 5 valoración</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Feed de partidos + Turnos lado a lado en desktop */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Feed de partidos */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-outfit text-xl font-bold text-brand-text flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-lime" /> Partidos abiertos
            </h2>
            <span className="text-brand-textSecondary text-sm">{matches.length} disponible{matches.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {matches.length > 0 ? (
              matches.map((m) => (
                <MatchCard key={m.id} match={m} onJoin={(id) => {
                  toast.success('Te uniste al partido')
                }} />
              ))
            ) : (
              <div className="col-span-3 glass rounded-3xl p-16 flex flex-col items-center justify-center text-center border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-brand-lime/10 flex items-center justify-center text-brand-lime mb-3">
                  <ClockIcon size={20} strokeWidth={2} />
                </div>
                <h3 className="font-outfit font-bold text-brand-text mb-1">No hay partidos con esos filtros</h3>
                <p className="text-brand-textMuted text-sm">Probá cambiando los filtros o publicá el tuyo.</p>
              </div>
            )}
          </div>
        </div>

        {/* Turnos de último momento */}
        <div className="lg:col-span-1 glass rounded-3xl p-6 md:p-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-turquoise to-blue-500 flex items-center justify-center text-brand-text text-xs font-bold">
                ⚡
              </div>
              <div>
                <h3 className="font-outfit font-bold text-brand-text">Turnos de último momento</h3>
                <p className="text-brand-textMuted text-xs">Canchas libres con descuento</p>
              </div>
            </div>
            <Badge variant="turquoise">Último momento</Badge>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[...complexes].map((c) => (
              <Card key={c.id} padded={false} hover>
                <CardBody padded={false} className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-outfit font-bold text-brand-text text-sm">{c.name}</h4>
                      <p className="text-brand-textMuted text-xs">{c.address}</p>
                    </div>
                    <span className="text-brand-lime font-bold text-xs">Hasta -42%</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-brand-lime font-bold text-lg">${c.courts * 2100}</span>
                    <span className="text-brand-textMuted text-xs line-through">${c.courts * 3400}</span>
                  </div>
                  <Button size="sm" className="w-full bg-brand-lime text-brand-ink hover:bg-brand-limeDark">
                    Ver turno
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <CreateMatchModal
        isOpen={openPublish}
        onClose={() => setOpenPublish(false)}
        onCreate={(match) => {
          addMatch(match)
          toast.success('Partido publicado')
        }}
      />
    </div>
  )
}
