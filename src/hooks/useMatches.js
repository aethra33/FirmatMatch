import { useState, useMemo, useCallback, useEffect } from 'react'
import { matches as initialMatches, complexes, getComplexById } from '../data/mockData'

const STORAGE_KEY = 'firmatmatch_matches'

function loadMatches() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : [...initialMatches]
  } catch {
    return [...initialMatches]
  }
}

export function useMatches() {
  const [matchesList, setMatchesList] = useState(loadMatches)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matchesList))
  }, [matchesList])
  const [filter, setFilter] = useState({
    sport: 'todos',
    date: 'todos',
    level: 'todos',
    search: '',
  })

  const filtered = useMemo(() => {
    return matchesList.filter((match) => {
      if (filter.sport !== 'todos' && match.sport !== filter.sport) return false
      if (filter.level !== 'todos' && match.level !== filter.level) return false
      if (filter.date !== 'todos') {
        const matchDate = new Date(match.date).toDateString()
        const target = filter.date === 'hoy' ? new Date() : new Date(filter.date)
        if (matchDate !== target.toDateString()) return false
      }
      if (filter.search) {
        const q = filter.search.toLowerCase()
        if (
          !match.title.toLowerCase().includes(q) &&
          !match.complexName.toLowerCase().includes(q)
        )
          return false
      }
      return true
    })
  }, [matchesList, filter])

  const addMatch = useCallback((match) => {
    setMatchesList((prev) => [match, ...prev])
  }, [])

  const joinMatch = useCallback((matchId) => {
    setMatchesList((prev) =>
      prev.map((m) =>
        m.id === matchId
          ? { ...m, players: [...m.players, { id: 'u_1', name: 'Gian', status: 'confirmed' }] }
          : m,
      ),
    )
  }, [])

  return {
    matches: filtered,
    addMatch,
    filter,
    setFilter,
    complexes,
    getComplexById,
    joinMatch,
  }
}
