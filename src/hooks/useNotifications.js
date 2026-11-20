import { useState, useEffect, useCallback } from 'react'
import { notifications as initialNotifications } from '../data/mockData'

const STORAGE_KEY = 'firmatmatch_notifications'

function loadNotifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : [...initialNotifications]
  } catch {
    return [...initialNotifications]
  }
}

export function useNotifications() {
  const [list, setList] = useState(loadNotifications)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }, [list])

  const markAsRead = (id) => {
    setList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = list.filter((n) => !n.read).length

  const addNotification = useCallback((title, message, type = 'info', route = null) => {
    const newNotification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      title,
      message,
      time: 'ahora',
      read: false,
      route,
    }
    setList((prev) => [newNotification, ...prev])
    return newNotification.id
  }, [])

  const removeNotification = useCallback((id) => {
    setList((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return { list, markAsRead, markAllAsRead, unreadCount, addNotification, removeNotification }
}