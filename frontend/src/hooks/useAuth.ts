import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// U bilo kojoj komponenti: const { user, login, logout } = useAuth()
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth mora da se koristi unutar AuthProvider-a')
  }
  return context
}
