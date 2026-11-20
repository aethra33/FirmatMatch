import { useState, useEffect } from 'react'
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

  return { list, markAsRead, markAllAsRead, unreadCount }
}
