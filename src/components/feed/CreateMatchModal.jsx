import { useState } from 'react'
import { motion } from 'framer-motion'
import { Circle, Target, Calendar, Clock, MapPin } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Badge } from '../ui/Badge'
import { complexes } from '../../data/mockData'

export function CreateMatchModal({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState({
    sport: 'Fútbol 5',
    date: '',
    time: '19:00',
    complexId: 'c_1',
    level: 'Intermedio',
    players: '10',
    price: '2500',
    description: '',
  })

  const complex = complexes.find((c) => c.id === form.complexId)

  const handleSubmit = (e) => {
    e.preventDefault()
    const match = {
      id: 'm_new_' + Date.now(),
      sport: form.sport,
      title: `${form.sport} · ${complex ? complex.name : ''}`,
      complexId: form.complexId,
      complexName: complex ? complex.name : '',
      complexAddress: complex ? complex.address : '',
      date: form.date,
      time: form.time,
      price: Number(form.price) || 0,
      level: form.level,
      maxPlayers: Number(form.players) || 10,
      players: [{ id: 'u_1', name: 'Gian', status: 'confirmed' }],
      description: form.description,
      lastMinute: false,
    }
    onCreate(match)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
        <h2 className="font-outfit text-2xl font-bold text-brand-text">Publicar partido</h2>
        <p className="text-brand-textSecondary text-sm">
          Compartí tu partido con la comunidad. Aparecerá inmediatamente en el feed.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-dm font-semibold text-brand-textMuted uppercase">
                  Deporte
                </label>
                <div className="flex gap-2">
                  {['Fútbol 5', 'Pádel'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, sport: s })}
                      className={cnSport(
                        'flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all',
                        form.sport === s
                          ? 'bg-brand-lime border-brand-lime text-brand-ink'
                          : 'border-slate-200 text-brand-textSecondary hover:border-brand-turquoise/50',
                      )}
                    >
                      {s === 'Fútbol 5' ? <Circle size={14} strokeWidth={2} /> : <Target size={16} strokeWidth={2} />}
                      <span className="ml-1.5">{s}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-dm font-semibold text-brand-textMuted uppercase">
                  Nivel
                </label>
                <Input
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  placeholder="Intermedio"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-dm font-semibold text-brand-textMuted uppercase">
                  Fecha
                </label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-dm font-semibold text-brand-textMuted uppercase">
                  Hora
                </label>
                <Input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-dm font-semibold text-brand-textMuted uppercase">
                Complejo deportivo
              </label>
              <select
                value={form.complexId}
                onChange={(e) => setForm({ ...form, complexId: e.target.value })}
                className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-brand-text outline-none transition-all focus:border-brand-lime"
              >
                {complexes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-dm font-semibold text-brand-textMuted uppercase">
                  Jugadores
                </label>
                <Input
                  type="number"
                  value={form.players}
                  onChange={(e) => setForm({ ...form, players: e.target.value })}
                  placeholder="10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-dm font-semibold text-brand-textMuted uppercase">
                  Precio por persona
                </label>
                <div className="flex items-end gap-1">
                  <span>$</span>
                  <Input
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="2500"
                    className="w-32"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-dm font-semibold text-brand-textMuted uppercase">
                Descripción
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-brand-text outline-none transition-all focus:border-brand-lime"
                placeholder="Detalles del partido..."
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <Button type="submit" className="w-48">
              Publicar partido
            </Button>
          </div>
        </form>
      </motion.div>
    </Modal>
  )
}

function cnSport(...classes) {
  return classes.filter(Boolean).join(' ')
}
