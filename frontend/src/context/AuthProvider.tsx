import { useEffect, useState, type ReactNode } from 'react'
import * as authApi from '../api/auth'
import type { RegisterData } from '../api/auth'
import type { User } from '../api/types'
import { AuthContext } from './AuthContext'

// Cuva ko je prijavljen i daje ga svim komponentama ispod sebe.
function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Pri prvom ucitavanju pitamo server da li postoji sesija.
  // Kolacic sesije je HttpOnly, pa JavaScript ne moze sam da ga procita.
  useEffect(() => {
    authApi
      .getCurrentUser()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function login(email: string, lozinka: string) {
    const u = await authApi.login(email, lozinka)
    setUser(u)
  }

  async function register(data: RegisterData) {
    const u = await authApi.register(data)
    setUser(u)
  }

  async function logout() {
    try {
      await authApi.logout()
    } finally {
      // i ako server ne odgovori, na frontendu korisnik vise nije prijavljen
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
