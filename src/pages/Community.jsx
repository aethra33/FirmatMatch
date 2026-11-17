import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Users, ThumbsUp, Send } from 'lucide-react'
import { Card, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Avatar } from '../components/ui/Avatar'
import { cn } from '../components/ui/cn'
import { toast } from 'sonner'

const POSTS = [
  {
    id: 'p_1',
    author: 'Martín Ruiz',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Martin',
    time: 'Hace 2h',
    text: '¿Alguien quiere jugar fútbol 5 esta tarde en el Club Atlético? Tengo cancha reservada a las 19:00 y faltan 2.',
    likes: 12,
    comments: 4,
  },
  {
    id: 'p_2',
    author: 'Lucía Gómez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia',
    time: 'Hace 5h',
    text: 'Partido de pádel mañana sábado 10:00 en Cancha 3. Nivel intermedio, ¡se reciben nuevos jugadores!',
    likes: 8,
    comments: 2,
  },
  {
    id: 'p_3',
    author: 'Jorge Méndez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jorge',
    time: 'Ayer',
    text: 'Increíble el torneo del fin de semana. ¡Gracias a todos los que participaron!',
    likes: 15,
    comments: 6,
  },
]

export default function Community() {
  const location = useLocation()
  const [text, setText] = useState('')

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Link
          to="/jugador"
          className="flex items-center gap-2"
          onClick={() => {}}
        >
          <ArrowLeft size={16} strokeWidth={2} />
          <span className="text-sm font-medium text-brand-textSecondary hover:text-brand-text transition-colors">
            Volver al inicio
          </span>
        </Link>
        <div>
          <h1 className="font-outfit text-3xl font-bold text-brand-text">Comunidad</h1>
          <p className="text-brand-textSecondary text-sm">Novedades, encuentros y charla entre jugadores de Firmat</p>
        </div>
      </div>

      {/* Crear publicación */}
      <Card className="glass border border-slate-200">
        <CardBody padded={false} className="p-5">
          <div className="flex gap-3">
            <Avatar name="Gian" size="md" />
            <div className="flex-1">
              <Input
                placeholder="¿Qué estás pensando?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[100px] resize-none py-3"
              />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-dm uppercase tracking-wider text-brand-textMuted">
              <MessageCircle size={12} strokeWidth={2} /> Público · Firma Match
            </div>
            <Button
              disabled={!text.trim()}
              onClick={() => {
                toast.success('Publicación creada')
                setText('')
              }}
            >
              <Send size={16} strokeWidth={2} /> Publicar
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Feed de publicaciones */}
      <div className="space-y-4">
        {POSTS.map((post) => (
          <Card key={post.id} className="glass border border-slate-200 hover:border-brand-lime/30 transition-all">
            <CardBody padded={false} className="p-4">
              <div className="flex gap-3">
                <Avatar name={post.author} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-brand-text">{post.author}</span>
                    <span className="text-[10px] text-brand-textMuted">{post.time}</span>
                  </div>
                  <p className="text-brand-text text-sm leading-relaxed mb-3">{post.text}</p>
                  <div className="flex items-center gap-4 text-[11px] font-dm text-brand-textMuted">
                    <button className="flex items-center gap-1 hover:text-brand-lime transition-colors">
                      <ThumbsUp size={14} strokeWidth={2} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-brand-turquoise transition-colors">
                      <MessageCircle size={14} strokeWidth={2} />
                      <span>{post.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
