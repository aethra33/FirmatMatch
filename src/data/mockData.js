import { format, formatDistanceToNow, addDays, addHours, startOfToday } from 'date-fns'

export const TODAY = startOfToday()

// ---------- Usuario actual (mock de sesión) ----------
export const currentUser = {
  id: 'u_1',
  name: 'Gian',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gian',
  level: 8,
  rank: 'Semi-Pro',
  rankColor: 'text-brand-lime',
  sports: ['Fútbol 5', 'Pádel'],
  matchesPlayed: 42,
  punctuality: 96,
  gameLevel: 4.5,
  goodVibe: 4.9,
  location: 'Firmat, Santa Fe',
  memberSince: 'Marzo 2024',
  bio: 'Arquero de fútbol 5 y jugador de pádel los fines de semana. Siempre a la hora y con buena onda.',
  badges: ['b_1', 'b_3', 'b_5', 'b_7'],
}

// ---------- Otros jugadores ----------
export const players = [
  {
    id: 'u_2',
    name: 'Martín Ruiz',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Martin',
    level: 9,
    rank: 'Pro',
    sports: ['Fútbol 5'],
    matchesPlayed: 67,
    punctuality: 92,
    gameLevel: 4.8,
    goodVibe: 4.7,
  },
  {
    id: 'u_3',
    name: 'Lucía Gómez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia',
    level: 7,
    rank: 'Semi-Pro',
    sports: ['Pádel', 'Fútbol 5'],
    matchesPlayed: 31,
    punctuality: 98,
    gameLevel: 4.2,
    goodVibe: 4.9,
  },
  {
    id: 'u_4',
    name: 'Jorge Méndez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jorge',
    level: 6,
    rank: 'Amateur',
    sports: ['Fútbol 5'],
    matchesPlayed: 19,
    punctuality: 85,
    gameLevel: 3.4,
    goodVibe: 4.1,
  },
  {
    id: 'u_5',
    name: 'Valeria Ríos',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Valeria',
    level: 9,
    rank: 'Pro',
    sports: ['Pádel'],
    matchesPlayed: 54,
    punctuality: 94,
    gameLevel: 4.9,
    goodVibe: 4.6,
  },
  {
    id: 'u_6',
    name: 'Diego Silva',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego',
    level: 5,
    rank: 'Rookie',
    sports: ['Fútbol 5'],
    matchesPlayed: 8,
    punctuality: 78,
    gameLevel: 2.9,
    goodVibe: 4.3,
  },
]

export function getPlayerById(id) {
  if (id === currentUser.id) return currentUser
  return players.find((p) => p.id === id) || null
}

// ---------- Complejos ----------
export const complexes = [
  {
    id: 'c_1',
    name: 'Club Atlético Firmat',
    address: 'Av. San Martín 1240, Firmat',
    sports: ['Fútbol 5', 'Pádel'],
    image: 'https://images.unsplash.com/photo-1580393723061-0994301ce035?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    courts: 4,
    phone: '+54 3465 44-1122',
  },
  {
    id: 'c_2',
    name: 'Complejo La Barbarie',
    address: 'Ruta 8 Km 311, Firmat',
    sports: ['Pádel'],
    image: 'https://images.unsplash.com/photo-1617030878346-20198167168b?q=80&w=1000&auto=format&fit=crop',
    rating: 4.6,
    courts: 3,
    phone: '+54 3465 55-3311',
  },
  {
    id: 'c_3',
    name: 'Polideportivo Central',
    address: 'Córdoba 980, Firmat',
    sports: ['Fútbol 5'],
    image: 'https://images.unsplash.com/photo-1546519639-62e961b63750?q=80&w=1000&auto=format&fit=crop',
    rating: 4.4,
    courts: 2,
    phone: '+54 3465 44-8877',
  },
]

export function getComplexById(id) {
  return complexes.find((c) => c.id === id)
}

// ---------- Partidos ----------
export const matches = [
  {
    id: 'm_1',
    sport: 'Fútbol 5',
    title: 'Partido amistoso – Cancha A',
    complexId: 'c_1',
    complexName: 'Club Atlético Firmat',
    complexAddress: 'Av. San Martín 1240, Firmat',
    date: format(addDays(TODAY, 2), 'yyyy-MM-dd'),
    time: '20:00',
    price: 2500,
    currency: 'ARS',
    level: 'Intermedio',
    maxPlayers: 10,
    players: [
      { id: 'u_1', name: 'Gian', status: 'confirmed' },
      { id: 'u_2', name: 'Martín Ruiz', status: 'confirmed' },
      { id: 'u_3', name: 'Lucía Gómez', status: 'confirmed' },
      { id: 'u_4', name: 'Jorge Méndez', status: 'confirmed' },
    ],
    description: 'Partido semanal de fútbol 5. Se necesitan 2 jugadores más para completar el equipo.',
    lastMinute: false,
  },
  {
    id: 'm_2',
    sport: 'Pádel',
    title: 'Dobles mixta',
    complexId: 'c_2',
    complexName: 'Complejo La Barbarie',
    complexAddress: 'Ruta 8 Km 311, Firmat',
    date: format(addDays(TODAY, 1), 'yyyy-MM-dd'),
    time: '18:30',
    price: 1800,
    currency: 'ARS',
    level: 'Avanzado',
    maxPlayers: 4,
    players: [
      { id: 'u_3', name: 'Lucía Gómez', status: 'confirmed' },
      { id: 'u_5', name: 'Valeria Ríos', status: 'confirmed' },
      { id: 'u_2', name: 'Martín Ruiz', status: 'pending' },
    ],
    description: 'Partido de pádel dobles mixta. Buscamos una jugadora para completar la dupla.',
    lastMinute: false,
  },
  {
    id: 'm_3',
    sport: 'Fútbol 5',
    title: 'Lunes de pelota',
    complexId: 'c_3',
    complexName: 'Polideportivo Central',
    complexAddress: 'Córdoba 980, Firmat',
    date: format(addDays(TODAY, 0), 'yyyy-MM-dd'),
    time: '22:00',
    price: 2200,
    currency: 'ARS',
    level: 'Principiante',
    maxPlayers: 10,
    players: [
      { id: 'u_4', name: 'Jorge Méndez', status: 'confirmed' },
      { id: 'u_6', name: 'Diego Silva', status: 'confirmed' },
      { id: 'u_1', name: 'Gian', status: 'confirmed' },
      { id: 'u_2', name: 'Martín Ruiz', status: 'confirmed' },
      { id: 'u_5', name: 'Valeria Ríos', status: 'confirmed' },
    ],
    description: 'Partido nocturno de fútbol 5, nivel abierto. Último lugar disponible.',
    lastMinute: false,
  },
  {
    id: 'm_4',
    sport: 'Pádel',
    title: 'Pádel nocturno',
    complexId: 'c_2',
    complexName: 'Complejo La Barbarie',
    complexAddress: 'Ruta 8 Km 311, Firmat',
    date: format(addDays(TODAY, 3), 'yyyy-MM-dd'),
    time: '21:00',
    price: 2000,
    currency: 'ARS',
    level: 'Intermedio',
    maxPlayers: 4,
    players: [
      { id: 'u_5', name: 'Valeria Ríos', status: 'confirmed' },
      { id: 'u_1', name: 'Gian', status: 'confirmed' },
    ],
    description: 'Partido de pádel para 4. Se buscan 2 compañeros más.',
    lastMinute: false,
  },
  {
    id: 'm_5',
    sport: 'Fútbol 5',
    title: 'Cierre de semana',
    complexId: 'c_1',
    complexName: 'Club Atlético Firmat',
    complexAddress: 'Av. San Martín 1240, Firmat',
    date: format(addDays(TODAY, 5), 'yyyy-MM-dd'),
    time: '17:00',
    price: 2500,
    currency: 'ARS',
    level: 'Avanzado',
    maxPlayers: 10,
    players: [
      { id: 'u_2', name: 'Martín Ruiz', status: 'confirmed' },
      { id: 'u_5', name: 'Valeria Ríos', status: 'confirmed' },
      { id: 'u_3', name: 'Lucía Gómez', status: 'pending' },
    ],
    description: 'Partido competitivo de fin de semana.',
    lastMinute: true,
  },
]

// ---------- Turnos de último momento ----------
export const lastMinuteTurns = [
  {
    id: 't_1',
    complexId: 'c_1',
    complexName: 'Club Atlético Firmat',
    sport: 'Fútbol 5',
    date: format(addDays(TODAY, 1), 'yyyy-MM-dd'),
    time: '15:00',
    regularPrice: 4000,
    promoPrice: 2500,
    discount: 38,
    available: true,
    courts: 1,
  },
  {
    id: 't_2',
    complexId: 'c_2',
    complexName: 'Complejo La Barbarie',
    sport: 'Pádel',
    date: format(addDays(TODAY, 0), 'yyyy-MM-dd'),
    time: '22:30',
    regularPrice: 3200,
    promoPrice: 1900,
    discount: 41,
    available: true,
    courts: 2,
  },
  {
    id: 't_3',
    complexId: 'c_3',
    complexName: 'Polideportivo Central',
    sport: 'Fútbol 5',
    date: format(addDays(TODAY, 2), 'yyyy-MM-dd'),
    time: '14:00',
    regularPrice: 3600,
    promoPrice: 2100,
    discount: 42,
    available: true,
    courts: 1,
  },
]

// ---------- Notificaciones ----------
export const notifications = [
  {
    id: 'n_1',
    type: 'confirmation',
    title: 'Partido confirmado',
    message: 'Tu lugar en "Partido amistoso – Cancha A" fue confirmado.',
    time: 'hace 15 min',
    read: false,
    route: '/jugador',
  },
  {
    id: 'n_2',
    type: 'request',
    title: 'Solicitud de reserva',
    message: 'Club Atlético Firmat aceptó tu reserva para mañana a las 20:00.',
    time: 'hace 2 h',
    read: false,
    route: '/turnos',
  },
  {
    id: 'n_3',
    type: 'change',
    title: 'Cambio de horario',
    message: 'El partido "Pádel nocturno" se movió de 21:00 a 21:30.',
    time: 'ayer',
    read: true,
    route: '/partidos',
  },
  {
    id: 'n_4',
    type: 'rating',
    title: 'Nueva valoración',
    message: 'Martín Ruiz te calificó con 5★ por buena onda.',
    time: 'hace 2 d',
    read: true,
    route: '/perfil',
  },
  {
    id: 'n_5',
    type: 'turn',
    title: 'Turno de último momento',
    message: 'Cancha libre en Complejo La Barbarie hoy 22:30 con 41% OFF.',
    time: 'hace 3 d',
    read: true,
    route: '/turnos',
  },
]

// ---------- Insignias ----------
export const badges = [
  {
    id: 'b_1',
    name: 'Puntual',
    icon: 'Clock',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    description: 'Nunca llegaste tarde a un partido.',
  },
  {
    id: 'b_2',
    name: 'Anfitrión',
    icon: 'UserPlus',
    color: 'bg-brand-turquoise/20 text-brand-turquoise border-brand-turquoise/30',
    description: 'Publicaste tu primer partido.',
  },
  {
    id: 'b_3',
    name: 'Compañero Ideal',
    icon: 'Heart',
    color: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    description: 'Promedio de buena onda superior a 4.8★.',
  },
  {
    id: 'b_4',
    name: 'Racha de 10',
    icon: 'Flame',
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    description: '10 partidos jugados seguidos sin faltar.',
  },
  {
    id: 'b_5',
    name: 'Líder de Cancha',
    icon: 'Award',
    color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    description: 'Organizaste 5 partidos o más.',
  },
  {
    id: 'b_6',
    name: 'Pádelero',
    icon: 'Racket',
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    description: '20 partidos de pádel jugados.',
  },
  {
    id: 'b_7',
    name: 'Veterano',
    icon: 'ShieldCheck',
    color: 'bg-brand-lime/20 text-brand-lime border-brand-lime/30',
    description: 'Más de 40 partidos jugados.',
  },
]

// ---------- Utilidades ----------
export function formatDateShort(iso) {
  return format(new Date(iso), 'dd/MM')
}

export function formatTime(isoTime) {
  return isoTime
}

export function formatRelative(iso) {
  return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: undefined })
}
