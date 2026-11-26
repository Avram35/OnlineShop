import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-surface">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-3 text-sm">
        <div>
          <p className="font-bold">OnlineShop</p>
          <p className="text-muted mt-1">Telefoni, laptopovi, TV i oprema.</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-semibold">Kupovina</p>
          <Link to="/katalog" className="text-muted hover:text-ink">Katalog</Link>
          <Link to="/korpa" className="text-muted hover:text-ink">Korpa</Link>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-semibold">Pomoć</p>
          <p className="text-muted">Dostava 2-4 radna dana</p>
          <p className="text-muted">Povraćaj u roku od 14 dana</p>
        </div>
      </div>

      <p className="text-center text-xs text-muted pb-6">© {year} OnlineShop</p>
    </footer>
  )
}

export default Footer
