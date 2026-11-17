import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  ShieldCheck,
  Circle,
  Users,
  Trophy,
  MapPin,
  ArrowRight,
} from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const heroStats = [
    { value: '1200+', label: 'Partidos coordinados' },
    { value: '89%', label: 'Tasa de llenado de canchas' },
    { value: '4.9★', label: 'Promedio de reputación' },
  ]

  const howItWorks = [
    {
      step: '01',
      title: 'Busca un partido',
      text: 'Filtra por deporte, fecha, nivel y precio. Encuentra el partido que se adapta a ti.',
      icon: <Search size={28} strokeWidth={2} />,
    },
    {
      step: '02',
      title: 'Reserva tu lugar',
      text: 'Confirma tu participación al instante y conoce a los compañeros antes de jugar.',
      icon: <Users size={28} strokeWidth={2} />,
    },
    {
      step: '03',
      title: 'Juega y gana reputación',
      text: 'Cada partido suma puntos, rangos e insignias en tu historial deportivo.',
      icon: <Trophy size={28} strokeWidth={2} />,
    },
  ]

  const benefits = [
    {
      title: 'Partidos siempre activos',
      text: 'Decenas de partidos publicados cada día por jugadores y complejos de Firmat y zona.',
      icon: <Circle size={20} strokeWidth={2} />,
    },
    {
      title: 'Complejos aliados',
      text: 'Reserva canchas directamente, consultá horarios y accedé a descuentos de último momento.',
      icon: <MapPin size={24} strokeWidth={2} />,
    },
    {
      title: 'Reputación que se ve',
      text: 'Puntualidad, nivel de juego y buena onda construyen tu perfil deportivo.',
      icon: <ShieldCheck size={24} strokeWidth={2} />,
    },
  ]

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Orbes decorativos de fondo */}
      <div className="fixed inset-0 z-0 -mx-full -my-full overflow-hidden pointer-events-none">
        <div
          className="orbe bg-brand-lime/20 rounded-full w-[45vw] h-[45vw] max-w-[45rem] max-h-[45rem]"
          style={{
            '--x': '10%',
            '--y': '10%',
          }}
        />
        <div
          className="orbe bg-brand-turquoise/15 rounded-full w-[55vw] h-[55vw] max-w-[55rem] max-h-[55rem]"
          style={{
            '--x': '90%',
            '--y': '85%',
          }}
        />
        <div
          className="orbe bg-brand-lime/10 rounded-full w-[38vw] h-[38vw] max-w-[38rem] max-h-[38rem]"
          style={{
            '--x': '50%',
            '--y': '95%',
          }}
        />
      </div>

      {/* Navbar ligera para landing (usa la misma navbar global; el hero empieza abajo) */}
      <div className="relative z-10 pt-16 pb-12 px-5 sm:px-7 lg:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 mr-8">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-lime to-brand-turquoise flex items-center justify-center shadow-orbe">
              <span className="text-[9px] font-outfit font-bold text-brand-text">F</span>
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight">
              Firmat<span className="text-brand-lime">Match</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <Link
              to="/jugador"
              className="glass text-brand-text font-semibold rounded-xl px-4 py-2.5 text-sm glass-hover transition-all hover:border-brand-lime hover:bg-brand-lime/5"
            >
              Entrar como jugador
            </Link>
            <Link
              to="/dueno"
              className="glass text-brand-text font-semibold rounded-xl px-4 py-2.5 text-sm glass-hover transition-all border border-slate-200 hover:border-brand-lime hover:bg-brand-lime/5"
            >
              Soy un complejo deportivo
            </Link>
            <Button size="sm" className="ml-2">Publicar partido</Button>
          </div>
        </div>
      </div>

      <main className="relative z-10 flex-1">
        {/* Hero */}
        <section className="px-5 sm:px-7 lg:px-12 pt-6 pb-20 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl glass border border-slate-200">
                <span className="flex items-center gap-1.5 text-brand-lime font-outfit font-semibold text-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse-soft" />
                  Nuevo en FirmatMatch
                </span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-outfit text-5xl md:text-7xl font-bold tracking-tight leading-tight text-brand-text"
              >
                Encuentra tu{' '}
                <span className="bg-gradient-to-r from-brand-lime to-brand-turquoise bg-clip-text text-transparent">
                  próximo partido
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-brand-textSecondary text-lg md:text-xl leading-relaxed max-w-lg"
              >
                Conectá con jugadores de fútbol 5 y pádel, complejá equipos, publicá partidos
                y reservá turnos en los mejores complejos deportivos de Firmat.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => navigate('/jugador')}
                  className="flex items-center justify-center gap-2 bg-brand-lime text-brand-ink font-outfit font-semibold rounded-xl px-6 py-4 text-base shadow-orbe hover:bg-brand-limeDark transition-all"
                >
                  Quiero jugar <ArrowRight size={18} strokeWidth={2} />
                </button>
                <button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => navigate('/dueno')}
                  className="flex items-center justify-center gap-2 glass text-brand-text font-outfit font-semibold rounded-xl px-6 py-4 text-base glass-hover hover:border-brand-lime transition-all"
                >
                  Soy un complejo <ArrowRight size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block min-h-[500px] w-full flex items-center justify-center perspective-1200">
              {/* Orbes decorativos grandes de fondo, más contenidos */}
              <div className="absolute -top-16 -left-16 w-64 h-64 bg-brand-lime/20 rounded-full blur-[80px] animate-pulse-soft" />
              <div className="absolute -top-12 -right-16 w-48 h-48 bg-brand-turquoise/20 rounded-full blur-[80px] animate-pulse-soft" style={{ animationDelay: '1s' }} />
              <div className="absolute -bottom-24 left-1/4 w-[25vw] h-[25vw] max-w-[25rem] max-h-[25rem] bg-brand-lime/10 rounded-full blur-[80px]" />
              <div className="absolute -bottom-16 right-1/5 w-[20vw] h-[20vw] max-w-[20rem] max-h-[20rem] bg-brand-turquoise/10 rounded-full blur-[60px]" />

              {/* Sombra grande debajo del dispositivo */}
              <motion.div
                animate={{ scale: [1, 0.92, 1], opacity: [0.35, 0.15, 0.35] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[20vw] h-[50px] max-w-[20rem] bg-black/10 rounded-full blur-[40px]"
              />

              {/* Dispositivo central en perspectiva 3D pronunciada con ligero flotante */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative max-w-72 h-[40vh] max-h-[500px] bg-white rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10"
                style={{ transform: 'rotateY(-20deg) rotateX(8deg)', transformOrigin: 'center bottom' }}
              >
                {/* Barra superior */}
                <div className="h-12 bg-slate-50 border-b border-slate-100 flex items-center justify-between px-6">
                  <div className="w-14 h-3 rounded-full bg-slate-200 mx-auto" />
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-lime/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-lime/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-lime/30" />
                  </div>
                </div>

                {/* Pantalla */}
                <div className="flex-1 bg-white p-6 relative flex flex-col items-center justify-center gap-6">
                  <div className="absolute top-8 left-8 w-24 h-24 bg-brand-lime/15 rounded-full blur-2xl" />
                  <div className="absolute bottom-8 right-8 w-32 h-32 bg-brand-turquoise/15 rounded-full blur-2xl" />

                  <div className="flex flex-col items-center justify-center gap-5 relative z-10">
                    {/* Iconos de la pantalla con ligera animación */}
                    <motion.div
                      animate={{ rotate: [0, 6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center justify-center w-[112px] h-[112px] max-w-[112px] max-h-[112px] rounded-3xl bg-brand-lime/10 border border-brand-lime/20 shadow-xl"
                    >
                      <span className="text-4xl">⚽</span>
                    </motion.div>
                    <motion.div
                      animate={{ rotate: [0, -6, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="flex items-center justify-center w-24 h-24 rounded-3xl bg-brand-turquoise/10 border border-brand-turquoise/20 shadow-xl"
                    >
                      <span className="text-3xl">🎾</span>
                    </motion.div>
                    <div className="space-y-2 text-center">
                      <h3 className="font-outfit font-bold text-brand-text text-xl">Encuentra tu próximo partido</h3>
                      <p className="text-brand-textSecondary text-sm leading-relaxed">
                        Fútbol 5 y pádel en Firmat
                      </p>
                    </div>
                  </div>
                </div>

                {/* Barra inferior */}
                <div className="h-24 bg-white border-t border-slate-100 flex items-center justify-around px-5">
                  <div className="flex flex-col items-center gap-1 text-brand-lime">
                    <div className="w-6 h-6 rounded-full bg-brand-lime" />
                    <span className="text-[10px] font-bold">Hoy</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-brand-textMuted">
                    <div className="w-6 h-6 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-bold">Partidos</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-brand-textMuted">
                    <div className="w-6 h-6 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-bold">Perfil</span>
                  </div>
                </div>
              </motion.div>

              {/* Elementos flotantes alrededor del dispositivo, ordenados en las 4 esquinas con flechitas */}
              {/* Arriba: Reserva */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 left-1/3 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none"
              >
                <div className="w-16 h-16 bg-brand-turquoise rounded-xl shadow-lg flex items-center justify-center border-3 border-white rotate-[-15deg]">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, linear: true }}
                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center -rotate-[-15deg]"
                  >
                    <span className="text-[7px] text-brand-turquoise font-bold">▶</span>
                  </motion.div>
                </div>
                <span className="text-[10px] font-dm font-bold text-brand-turquoise bg-white px-2.5 py-0.5 rounded-full shadow-md border border-slate-200">Reserva</span>
              </motion.div>

              {/* Derecha: Complejos */}
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute top-1/4 right-[-12px] -translate-y-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none"
              >
                <div className="w-16 h-16 bg-brand-lime rounded-xl shadow-lg flex items-center justify-center border-3 border-white rotate-15">
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 4, repeat: Infinity, linear: true, delay: 0.2 }}
                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center rotate-[-15deg]"
                  >
                    <span className="text-[7px] text-brand-lime font-bold">▶</span>
                  </motion.div>
                </div>
                <span className="text-[10px] font-dm font-bold text-brand-lime bg-white px-2.5 py-0.5 rounded-full shadow-md border border-slate-200">Complejos</span>
              </motion.div>

              {/* Izquierda: Juega */}
              <motion.div
                animate={{ x: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute top-2/3 left-[-12px] -translate-y-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none"
              >
                <div className="w-16 h-16 bg-brand-turquoise rounded-xl shadow-lg flex items-center justify-center border-3 border-white rotate-[-15deg]">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3.5, repeat: Infinity, linear: true, delay: 0.4 }}
                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center rotate-15"
                  >
                    <span className="text-[7px] text-brand-turquoise font-bold">▶</span>
                  </motion.div>
                </div>
                <span className="text-[10px] font-dm font-bold text-brand-turquoise bg-white px-2.5 py-0.5 rounded-full shadow-md border border-slate-200">Juega</span>
              </motion.div>

              {/* Abajo: Comunidad */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -bottom-12 left-2/5 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none"
              >
                <div className="w-16 h-16 bg-brand-lime rounded-xl shadow-lg flex items-center justify-center border-3 border-white rotate-15">
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 4.5, repeat: Infinity, linear: true, delay: 0.6 }}
                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center rotate-[-15deg]"
                  >
                    <span className="text-[7px] text-brand-lime font-bold">▶</span>
                  </motion.div>
                </div>
                <span className="text-[10px] font-dm font-bold text-brand-lime bg-white px-2.5 py-0.5 rounded-full shadow-md border border-slate-200">Comunidad</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats de confianza */}
        <section className="border-y border-slate-200 bg-slate-50">
          <div className="px-5 sm:px-7 lg:px-12 py-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-outfit font-bold text-3xl text-brand-text">{stat.value}</span>
                  <span className="text-brand-textSecondary text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Propuesta de valor */}
        <section className="px-5 sm:px-7 lg:px-12 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-brand-text mb-4">
              Todo lo que necesitas para jugar
            </h2>
            <p className="text-brand-textSecondary max-w-2xl mx-auto">
              Partidos abiertos, completá equipos, encontrá compañeros y construí tu
              reputación deportiva en un solo lugar.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <motion.div
                key={b.title}
                whileHover={{ y: -6 }}
                className="glass rounded-3xl p-8 border border-slate-200 hover:border-brand-lime/50 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-lime/10 flex items-center justify-center mb-6 text-brand-lime">
                  {b.icon}
                </div>
                <h3 className="font-outfit text-xl font-bold text-brand-text mb-3">{b.title}</h3>
                <p className="text-brand-textSecondary text-sm leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="px-5 sm:px-7 lg:px-12 pb-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {howItWorks.map((step) => (
              <motion.div
                key={step.step}
                whileHover={{ y: -6 }}
                className="glass rounded-3xl p-8 border border-slate-200 hover:border-brand-lime/50 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-lime/10 rounded-bl-3xl" />
                <div className="w-10 h-10 rounded-full bg-brand-surface border border-slate-200 flex items-center justify-center mb-6 font-outfit font-bold text-brand-lime">
                  {step.step}
                </div>
                {step.icon}
                <h3 className="font-outfit text-xl font-bold text-brand-text mt-6 mb-3">{step.title}</h3>
                <p className="text-brand-textSecondary text-sm leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-slate-200 bg-slate-50">
        <div className="px-5 sm:px-7 lg:px-12 py-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-brand-lime flex items-center justify-center">
                <span className="text-[8px] font-outfit font-bold text-brand-text">F</span>
              </div>
              <span className="font-outfit font-bold text-lg tracking-tight">
                Firmat<span className="text-brand-lime">Match</span>
              </span>
            </div>
            <p className="text-brand-textMuted text-sm">
              FirmatMatch — Conectando jugadores y complejos de Firmat.
            </p>
            <div className="flex items-center gap-5 text-sm text-brand-textMuted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} strokeWidth={2} />
                Datos fictidos — maqueta frontend
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}