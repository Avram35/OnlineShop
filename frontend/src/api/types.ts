// Oblici podataka koje vraca backend (dogovor frontend-backend, poglavlje 5).
// Imena polja su na srpskom jer ih tako salje backend.
// Kad se nesto promeni na backendu, menja se ovde i TypeScript pokaze sva mesta koja treba popraviti.

export type Role = 'KUPAC' | 'MODERATOR' | 'ADMIN'

export interface User {
  id: number
  ime: string
  prezime: string
  email: string
  uloga: Role
}

export interface Category {
  id: number
  naziv: string
  roditeljId: number | null
}

export interface Attribute {
  id: number
  naziv: string // npr. "Boja"
  vrednost: string // npr. "Crna"
}

export interface Product {
  id: number
  kategorijaId: number
  naziv: string
  opis: string | null
  cena: number // sa PDV-om
  slikaUrl: string | null
  dostupno: number // Kolicina - Rezervisano
  karakteristike: Attribute[]
}

export interface CartItem {
  id: number
  proizvodId: number
  naziv: string
  slikaUrl: string | null
  cena: number
  kolicina: number
  dostupno: number
  iznos: number
}

export interface Cart {
  stavke: CartItem[]
  medjuzbir: number
  dostava: number
  ukupno: number
}

export type OrderStatus =
  | 'KREIRANA'
  | 'U_OBRADI'
  | 'POSLATA'
  | 'ISPORUCENA'
  | 'OTKAZANA'
  | 'VRACENA'

export interface NewOrder {
  imePrimaoca: string
  telefon: string
  adresa: string
  email?: string // salje samo gost
}

export interface Order {
  id: number
  broj: string
  status: OrderStatus
  kreiranaAt: string
  imePrimaoca: string
  telefon: string
  adresa: string
  email: string
  stavke: { naziv: string; cena: number; kolicina: number }[]
  medjuzbir: number
  dostava: number
  ukupno: number
  posiljka: { kurir: string; brojPracenja: string } | null
  istorija: { izStatusa: OrderStatus | null; uStatus: OrderStatus; vreme: string }[]
}
