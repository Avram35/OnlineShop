import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function Header() {
  const { user, loading, logout } = useAuth()

  // aktivan link je tamniji i podvucen
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-ink underline underline-offset-4' : 'text-muted hover:text-ink'

  return (
    <header className="border-b border-line">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="text-xl font-bold">
          Online<span className="text-accent">Shop</span>
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <NavLink to="/katalog" className={linkClass}>
            Katalog
          </NavLink>
          {/* dok ne znamo da li je neko prijavljen, ne prikazujemo nista */}
          {!loading && user && (
            <>
              <span className="text-muted">{user.ime}</span>
              <button onClick={logout} className="text-muted hover:text-ink">
                Odjava
              </button>
            </>
          )}
          {!loading && !user && (
            <NavLink to="/prijava" className={linkClass}>
              Prijava
            </NavLink>
          )}
          <NavLink
            to="/korpa"
            className="bg-ink text-white px-3 py-1.5 rounded hover:bg-black"
          >
            Korpa (0)
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
