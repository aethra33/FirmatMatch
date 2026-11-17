import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Sidebar } from './components/layout/Sidebar'
import { BottomNav } from './components/layout/BottomNav'
import Landing from './pages/Landing'
import PlayerDashboard from './pages/PlayerDashboard'
import MatchFeed from './pages/MatchFeed'
import MatchDetail from './pages/MatchDetail'
import CreateMatch from './pages/CreateMatch'
import PlayerProfile from './pages/PlayerProfile'
import OwnerDashboard from './pages/OwnerDashboard'
import AvailableTurns from './pages/AvailableTurns'
import Notifications from './pages/Notifications'
import Community from './pages/Community'

const APP_ROUTES = ['/jugador', '/partidos', '/publicar', '/turnos', '/notificaciones', '/comunidad']

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const isApp = APP_ROUTES.some((r) => location.pathname.startsWith(r))
  const isProfile = location.pathname.startsWith('/perfil')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const goHome = () => navigate('/')

  return (
    <div className="min-h-screen relative">
      <Navbar onToggleSidebar={() => setSidebarCollapsed((p) => !p)} collapsed={sidebarCollapsed} isApp={isApp} />

      <div className="relative flex">
        {/* Escritorio: sidebar fija (oculta en el landing) */}
        {(isApp || isProfile) && <Sidebar collapsed={sidebarCollapsed} />}

        <main
          className={`pt-16 pb-20 ${(isApp || isProfile) ? 'px-4' : 'px-5 sm:px-7'} flex-1 ${(isApp || isProfile) ? (sidebarCollapsed ? 'ml-2' : 'ml-4') : ''}`}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/jugador" element={<PlayerDashboard onGoHome={goHome} />} />
            <Route path="/partidos" element={<MatchFeed />} />
            <Route path="/partidos/:id" element={<MatchDetail />} />
            <Route path="/publicar" element={<CreateMatch />} />
            <Route path="/perfil/:id" element={<PlayerProfile />} />
            <Route path="/dueno" element={<OwnerDashboard />} />
            <Route path="/turnos" element={<AvailableTurns />} />
            <Route path="/notificaciones" element={<Notifications />} />
            <Route path="/comunidad" element={<Community />} />
          </Routes>
        </main>
      </div>

      {/* Móvil: barra inferior solo dentro de la app */}
      {(isApp || isProfile) && <BottomNav />}
    </div>
  )
}
