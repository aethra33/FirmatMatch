import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { lastMinuteTurns, complexes } from '../data/mockData'

const STORAGE_KEY = 'firmatmatch_turngrid'

const COURTS = [
  { id: 'cancha-1', name: 'Cancha 1', sport: 'Fútbol 5' },
  { id: 'cancha-2', name: 'Cancha 2', sport: 'Fútbol 5' },
  { id: 'cancha-3', name: 'Pádel', sport: 'Pádel' },
  { id: 'cancha-4', name: 'Cancha 4', sport: 'Pádel' },
]

const TIME_SLOTS = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']

function createInitialGrid() {
  const grid = {}
  COURTS.forEach((c) => {
    grid[c.id] = TIME_SLOTS.reduce((acc, t) => {
      acc[t] = Math.random() < 0.15 ? 'mantenimiento' : Math.random() < 0.45 ? 'reservado' : 'libre'
      return acc
    }, {})
  })
  return grid
}

function loadGrid() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : createInitialGrid()
  } catch {
    return createInitialGrid()
  }
}

export function useTurnGrid(reservations) {
  const [grid, setGrid] = useState(loadGrid)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(grid))
  }, [grid])

  useEffect(() => {
    const pending = reservations?.filter?.((r) => r.status === 'pending') || []
    setPendingCount(pending.length)
  }, [reservations])

  const cellLabel = useCallback((state) => {
    if (state === 'libre') return 'Libre'
    if (state === 'reservado') return 'Reservado'
    return 'Mantenimiento'
  }, [])

  const cellColor = useCallback((state) => {
    if (state === 'libre') return 'bg-brand-lime/5 border border-brand-lime/10'
    if (state === 'reservado') return 'bg-brand-lime/20 border border-brand-lime/30'
    return 'bg-red-50 border border-red-100'
  }, [])

  const cellTextColor = useCallback((state) => {
    if (state === 'libre') return 'text-brand-lime'
    if (state === 'reservado') return 'text-brand-limeDark'
    return 'text-red-600'
  }, [])

  const toggleCell = useCallback((courtId, time) => {
    setGrid((prev) => {
      const next = { ...prev, [courtId]: { ...prev[courtId] } }
      const current = next[courtId][time]
      const states = ['libre', 'reservado', 'mantenimiento']
      const idx = states.indexOf(current)
      next[courtId][time] = states[(idx + 1) % states.length]
      return next
    })
  }, [])

  const reserveCell = useCallback((courtId, time, player) => {
    setGrid((prev) => {
      const next = { ...prev, [courtId]: { ...prev[courtId] } }
      next[courtId][time] = 'reservado'
      return next
    })
  }, [])

  const releaseCell = useCallback((courtId, time) => {
    setGrid((prev) => {
      const next = { ...prev, [courtId]: { ...prev[courtId] } }
      next[courtId][time] = 'libre'
      return next
    })
  }, [])

  const getState = useCallback((courtId, time) => {
    return grid[courtId]?.[time] || 'libre'
  }, [grid])

  const resetGrid = useCallback(() => {
    setGrid(createInitialGrid())
  }, [])

  const findAvailableCourt = useCallback((date, time) => {
    for (const court of COURTS) {
      if (grid[court.id]?.[time] === 'libre') {
        return court.id
      }
    }
    return null
  }, [grid])

  const findAvailableSlot = useCallback((date) => {
    for (const time of TIME_SLOTS) {
      const courtId = findAvailableCourt(date, time)
      if (courtId) return { courtId, time }
    }
    return null
  }, [findAvailableCourt])

  const gridSnapshot = useMemo(() => ({ grid, COURTS, TIME_SLOTS, cellLabel, cellColor, cellTextColor }), [grid, cellLabel, cellColor, cellTextColor])

  return {
    grid,
    COURTS,
    TIME_SLOTS,
    pendingCount,
    cellLabel,
    cellColor,
    cellTextColor,
    toggleCell,
    reserveCell,
    releaseCell,
    getState,
    resetGrid,
    findAvailableCourt,
    findAvailableSlot,
    gridSnapshot,
  }
}