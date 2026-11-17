import { useNavigate } from 'react-router-dom'
import { useMatches } from '../hooks/useMatches'
import { MatchCard } from '../components/feed/MatchCard'
import { Filter, Plus, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { toast } from 'sonner'

export default function MatchFeed() {
  const navigate = useNavigate()
  const { matches, filter, setFilter } = useMatches()

  const SPORTS = ['todos', 'Fútbol 5', 'Pádel']
  const LEVELS = ['todos', 'Principiante', 'Intermedio', 'Avanzado']

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/jugador')}>
            <ArrowLeft size={16} strokeWidth={2} /> Volver al inicio
          </Button>
          <div>
            <h1 className="font-outfit text-3xl font-bold text-brand-text">Partidos abiertos</h1>
            <p className="text-brand-textSecondary text-sm">Encontrá el partido que mejor se adapte a tu nivel y horario</p>
          </div>
        </div>
        <Button onClick={() => navigate('/publicar')}>
          <Plus size={18} strokeWidth={2} /> Publicar partido
        </Button>
      </div>

      <div className="flex gap-3">
        <span className="text-[10px] font-dm font-bold uppercase text-brand-textMuted self-center">Deporte</span>
        {SPORTS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter({ ...filter, sport: s })}
            className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
              filter.sport === s
                ? 'bg-brand-lime border-brand-lime text-brand-ink'
                : 'border-slate-200 text-brand-textSecondary hover:border-brand-lime/50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        <span className="text-[10px] font-dm font-bold uppercase text-brand-textMuted self-center">Nivel</span>
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
        <button onClick={() => setFilter({ ...filter, sport: 'todos', level: 'todos' })} className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-brand-textMuted hover:border-brand-lime/50 hover:bg-slate-50 transition-all">
          Limpiar <Filter size={14} strokeWidth={2} className="ml-1 inline" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {matches.length > 0 ? (
          matches.map((m) => (
            <MatchCard key={m.id} match={m} onJoin={() => toast.success('Te uniste al partido')} />
          ))
        ) : (
          <div className="col-span-3 glass rounded-3xl p-16 flex flex-col items-center justify-center text-center border border-slate-200">
            <Filter size={32} strokeWidth={2} className="text-brand-textMuted mb-3" />
            <h3 className="font-outfit font-bold text-brand-text mb-1">Sin partidos disponibles</h3>
            <p className="text-brand-textMuted text-sm">Probá con otros filtros o publicá el tuyo.</p>
          </div>
        )}
      </div>
    </div>
  )
}
