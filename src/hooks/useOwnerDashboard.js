import { useState, useCallback } from 'react'
import { useReservations } from './useReservations'
import { useTurnGrid } from './useTurnGrid'
import { toast } from 'sonner'

export function useOwnerDashboard(notificationsHook) {
  const reservationsHook = useReservations(notificationsHook)
  const turnGridHook = useTurnGrid(reservationsHook.requests)

  const pendingRequests = reservationsHook.requests.filter(r => r.status === 'pending')

  const handleAccept = useCallback((req) => {
    const availableCourt = turnGridHook.findAvailableCourt(req.date, req.time)
    const courtId = availableCourt ? availableCourt : 'cancha-1'
    
    reservationsHook.acceptReservation(req.id, courtId, req.time)
    turnGridHook.reserveCell(courtId, req.time, req.player)
    
    // Notificar al jugador que su reserva fue aceptada
    if (req.player && notificationsHook?.addNotification) {
      notificationsHook.addNotification(
        'Reserva aceptada',
        `Tu reserva para ${req.sport} en ${req.complexName} fue aceptada. Se te asignó ${courtId}.`,
        'confirmation',
        '/turnos'
      )
    }
    
    if (courtId !== availableCourt) {
      toast.warning('No había canchas libres automáticas, se asignó manualmente')
    }
    toast.success('Reserva aceptada')
  }, [reservationsHook, turnGridHook, notificationsHook])

  const handleReject = useCallback((req, reason = null) => {
    if (notificationsHook?.addNotification) {
      notificationsHook.addNotification(
        'Reserva rechazada',
        `La reserva para ${req.sport} en ${req.complexName} fue rechazada. ${reason || ''}`,
        'change',
        '/ownercabinet'
      )
    }
    reservationsHook.rejectReservation(req.id, reason)
    toast.error('Reserva rechazada')
  }, [reservationsHook, notificationsHook])

  const handleToggleCell = useCallback((courtId, time) => {
    turnGridHook.toggleCell(courtId, time)
  }, [turnGridHook])

  return {
    grid: turnGridHook.grid,
    COURTS: turnGridHook.COURTS,
    TIME_SLOTS: turnGridHook.TIME_SLOTS,
    pendingRequests,
    pendingCount: turnGridHook.pendingCount,
    cellLabel: turnGridHook.cellLabel,
    cellColor: turnGridHook.cellColor,
    cellTextColor: turnGridHook.cellTextColor,
    toggleCell: handleToggleCell,
    handleAccept,
    handleReject,
    findAvailableCourt: turnGridHook.findAvailableCourt,
    findAvailableSlot: turnGridHook.findAvailableSlot,
  }
}