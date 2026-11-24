import { Link } from 'react-router-dom'

function NijePronadjeno() {
  return (
    <div className="text-center py-16">
      <h1 className="text-2xl font-bold">Stranica ne postoji</h1>
      <p className="text-muted mt-2">Proveri adresu ili se vrati na početnu.</p>
      <Link to="/" className="inline-block mt-6 bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded">
        Na početnu
      </Link>
    </div>
  )
}

export default NijePronadjeno
