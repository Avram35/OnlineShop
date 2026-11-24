import { Link, NavLink } from 'react-router-dom'

function Header() {
  // aktivan link je tamniji i podvucen
  const klasaLinka = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-ink underline underline-offset-4' : 'text-muted hover:text-ink'

  return (
    <header className="border-b border-line">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="text-xl font-bold">
          Online<span className="text-accent">Shop</span>
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <NavLink to="/katalog" className={klasaLinka}>
            Katalog
          </NavLink>
          <NavLink to="/prijava" className={klasaLinka}>
            Prijava
          </NavLink>
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
