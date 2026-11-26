import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ApiError } from '../api/client'
import FormField from '../components/ui/FormField'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [lozinka, setLozinka] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault() // da browser ne osvezi stranicu
    setError('')

    if (email.trim() === '' || lozinka === '') {
      setError('Unesite email i lozinku.')
      return
    }

    setSending(true)

    try {
      await login(email, lozinka)
      navigate('/')
    } catch (err) {
      // Server uvek vraca istu poruku za pogresan email i pogresnu lozinku,
      // da napadac ne bi saznao koji nalozi postoje.
      setError(err instanceof ApiError ? err.message : 'Došlo je do greške.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold">Prijava</h1>
      <p className="text-muted mt-1 text-sm">Prijavite se da biste videli svoje porudžbine.</p>

      {/* noValidate: iskljucuje poruke browsera, prikazujemo svoje na srpskom */}
      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormField
          id="lozinka"
          label="Lozinka"
          type="password"
          autoComplete="current-password"
          required
          value={lozinka}
          onChange={(e) => setLozinka(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="bg-accent hover:bg-accent-dark disabled:opacity-60 text-white py-2 rounded font-medium"
        >
          {sending ? 'Prijavljivanje...' : 'Prijavi se'}
        </button>
      </form>

      <p className="text-sm text-muted mt-6">
        Nemate nalog?{' '}
        <Link to="/registracija" className="text-ink underline">
          Registrujte se
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
