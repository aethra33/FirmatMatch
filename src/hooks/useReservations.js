import { useState, useEffect, useMemo, useCallback } from 'react'
import { lastMinuteTurns, currentUser } from '../data/mockData'

const STORAGE_KEY = 'firmatmatch_reservations'

function loadReservations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useReservations() {
  const [requests, setRequests] = useState(loadReservations)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
  }, [requests])

  const pendingRequests = useMemo(() => {
    return requests.filter((r) => r.status === 'pending')
  }, [requests])

  const pendingCount = pendingRequests.length

  const requestReservation = useCallback((turn, player = currentUser) => {
    const newRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      turnId: turn.id,
      complexId: turn.complexId,
      complexName: turn.complexName,
      sport: turn.sport,
      date: turn.date,
      time: turn.time,
      player: {
        id: player.id,
        name: player.name,
        avatar: player.avatar,
      },
      promoPrice: turn.promoPrice,
      regularPrice: turn.regularPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    setRequests((prev) => [newRequest, ...prev])
    return newRequest.id
  }, [])

  const acceptReservation = useCallback((requestId, courtId, timeSlot) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, status: 'accepted', acceptedAt: new Date().toISOString(), courtId, timeSlot }
          : r,
      ),
    )
  }, [])

  const rejectReservation = useCallback((requestId, reason = null) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, status: 'rejected', rejectedAt: new Date().toISOString(), rejectionReason: reason }
          : r,
      ),
    )
  }, [])

  const cancelReservation = useCallback((requestId) => {
    setRequests((prev) => prev.map((r) => (r.id === requestId ? { ...r, status: 'cancelled' } : r)))
  }, [])

  const getTurnAvailability = useCallback((turnId) => {
    const turn = lastMinuteTurns.find((t) => t.id === turnId)
    const request = requests.find((r) => r.turnId === turnId && r.status === 'pending')
    const accepted = requests.find((r) => r.turnId === turnId && r.status === 'accepted')
    return {
      ...turn,
      isPending: !!request,
      isAccepted: !!accepted,
      requester: request || null,
      acceptedUser: accepted ? accepted.player : null,
    }
  }, [requests])

  const clearAll = useCallback(() => {
    setRequests([])
  }, [])

  return {
    requests,
    pendingRequests,
    pendingCount,
    requestReservation,
    acceptReservation,
    rejectReservation,
    cancelReservation,
    getTurnAvailability,
    clearAll,
  }
}