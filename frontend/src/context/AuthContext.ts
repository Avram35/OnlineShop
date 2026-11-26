import { createContext } from 'react'
import type { User } from '../api/types'
import type { RegisterData } from '../api/auth'

export interface AuthContextValue {
  user: User | null // null = niko nije prijavljen
  loading: boolean // true dok ne saznamo da li je neko prijavljen
  login: (email: string, lozinka: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
