import { useState } from 'react'
import { notifications } from '../data/mockData'

export function useNotifications() {
  const [list, setList] = useState([...notifications])

  const markAsRead = (id) => {
    setList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = list.filter((n) => !n.read).length

  return { list, markAsRead, markAllAsRead, unreadCount }
}
