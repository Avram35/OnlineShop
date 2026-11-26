import { api } from './client'
import type { User } from './types'

export interface RegisterData {
  ime: string
  prezime: string
  email: string
  lozinka: string
}

export function login(email: string, lozinka: string) {
  return api.post<User>('/auth/prijava', { email, lozinka })
}

export function register(data: RegisterData) {
  return api.post<User>('/auth/registracija', data)
}

export function logout() {
  return api.post<void>('/auth/odjava')
}

// ko je trenutno prijavljen; baca ApiError sa statusom 401 ako niko nije
export function getCurrentUser() {
  return api.get<User>('/auth/ja')
}
