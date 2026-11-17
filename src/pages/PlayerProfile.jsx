import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, ShieldCheck, Target, Clock, Heart, Users, Circle } from 'lucide-react'
import { Card, CardBody } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { Button } from '../components/ui/Button'
import { currentUser, players, badges } from '../data/mockData'

export default function PlayerProfile() {
  const { id } = useParams()
  const user = id === currentUser.id ? currentUser : players.find((p) => p.id === id) || currentUser

  const statBars = [
    { label: 'Partidos jugados', value: user.matchesPlayed, max: 100, color: 'bg-brand-lime' },
    { label: 'Puntualidad', value: user.punctuality, max: 100, color: 'bg-brand-turquoise' },
    { label: 'Nivel de juego', value: Math.round((user.gameLevel / 5) * 100), max: 100, color: 'bg-indigo-500' },
    { label: 'Buena onda', value: Math.round((user.goodVibe / 5) * 100), max: 100, color: 'bg-rose-500' },
  ]

  const userBadges = badges.filter((b) => user.badges.includes(b.id))

  return (
    <div className="space-y-8">
      <div className="glass rounded-3xl p-6 md:p-10 border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-lime to-brand-turquoise" />
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0">
            <Avatar name={user.name} src={user.avatar} size="xl" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-outfit text-3xl font-bold text-brand-text">{user.name}</h1>
              <Badge variant="lime" className="text-[11px]">
                {user.rank}
              </Badge>
              <span className="w-px h-4 bg-white/20" />
              <span className="text-brand-textSecondary text-sm">Nivel {user.level}</span>
            </div>
            <p className="text-brand-textSecondary text-sm mb-4">{user.location}</p>
            <div className="flex gap-2">
              {user.sports.map((s) => (
                <span key={s} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-dm text-brand-textSecondary">
                  {s === 'Fútbol 5' ? <Circle size={10} strokeWidth={2} className="mr-1" /> : <Target size={12} strokeWidth={2} className="mr-1" />}
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex-1">
                Editar perfil
              </Button>
              <Button variant="ghost" size="sm">
                <Users size={16} strokeWidth={2} /> Contactar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 border border-slate-200">
        <h2 className="font-outfit font-bold text-brand-text text-lg mb-6">Tu rendimiento deportivo</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statBars.map((s) => (
            <div key={s.label} className="space-y-3">
              <div className="flex justify-between text-[11px] font-dm font-bold uppercase tracking-wider">
                <span className="text-brand-textMuted">{s.label}</span>
                <span className="text-brand-text">{s.value}{s.label === 'Partidos jugados' ? '' : '%'}</span>
              </div>
              <div className="w-full bg-slate-50 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${s.color}`}
                  style={{ width: `${Math.min(s.value, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-6 border border-slate-200">
          <h2 className="font-outfit font-bold text-brand-text text-lg mb-5">Insignias</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userBadges.length > 0 ? (
              userBadges.map((b) => (
                <div key={b.id} className="glass rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-slate-200 hover:border-brand-lime/50 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-brand-lime group-hover:scale-110 transition-transform">
                    {b.icon === 'Clock' && <Clock size={20} strokeWidth={2.5} />}
                    {b.icon === 'UserPlus' && <Users size={20} strokeWidth={2.5} />}
                    {b.icon === 'Heart' && <Heart size={20} strokeWidth={2.5} />}
                    {b.icon === 'Flame' && <Trophy size={20} strokeWidth={2.5} />}
                    {b.icon === 'Award' && <ShieldCheck size={20} strokeWidth={2.5} />}
                    {b.icon === 'Racket' && <Target size={20} strokeWidth={2.5} />}
                  </div>
                  <span className="text-[11px] font-dm font-semibold text-brand-text text-center">{b.name}</span>
                </div>
              ))
            ) : (
              <p className="text-brand-textMuted text-sm text-center">Aún no tienes insignias.</p>
            )}
          </div>
        </div>

        <div className="glass rounded-3xl p-6 border border-slate-200">
          <h2 className="font-outfit font-bold text-brand-text text-lg mb-5">Historial reciente</h2>
          <div className="space-y-4">
            {['Partido amistoso · Club Atlético Firmat', 'Pádel nocturno · Complejo La Barbarie', 'Lunes de pelota · Polideportivo Central'].map((h, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center text-[10px] font-bold text-brand-textSecondary">
                    {i + 1}
                  </div>
                  <span className="text-sm text-brand-text">{h}</span>
                </div>
                <Badge variant="success">Completado</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
