import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateMatchModal } from '../components/feed/CreateMatchModal'
import { useMatches } from '../hooks/useMatches'
import { toast } from 'sonner'

export default function CreateMatch() {
  const navigate = useNavigate()
  const { addMatch } = useMatches()
  const [open, setOpen] = useState(true)

  return (
    <CreateMatchModal
      isOpen={open}
      onClose={() => {
        setOpen(false)
        navigate('/jugador')
      }}
      onCreate={(match) => {
        addMatch(match)
        toast.success('Partido publicado')
        setOpen(false)
        navigate('/jugador')
      }}
    />
  )
}
