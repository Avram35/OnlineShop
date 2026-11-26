import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ApiError } from '../api/client'
import FormField from '../components/ui/FormField'

const MIN_PASSWORD_LENGTH = 10 // NAL-01
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // nesto@nesto.nesto

function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    ime: '',
    prezime: '',
    email: '',
    lozinka: '',
    potvrda: '',
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  // jedna funkcija za sva polja: name inputa = ime polja u form objektu
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Provera pre slanja, samo da korisnik odmah vidi gresku.
  // Prava provera je uvek na serveru.
  function validate() {
    const errors: Record<string, string> = {}
    if (form.ime.trim() === '') {
      errors.ime = 'Unesite ime.'
    }
    if (form.prezime.trim() === '') {
      errors.prezime = 'Unesite prezime.'
    }
    if (!EMAIL_PATTERN.test(form.email)) {
      errors.email = 'Unesite ispravan email.'
    }
    if (form.lozinka.length < MIN_PASSWORD_LENGTH) {
      errors.lozinka = `Lozinka mora imati najmanje ${MIN_PASSWORD_LENGTH} znakova.`
    }
    if (form.lozinka !== form.potvrda) {
      errors.potvrda = 'Lozinke se ne poklapaju.'
    }
    return errors
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      return
    }

    setSending(true)
    try {
      await register({
        ime: form.ime,
        prezime: form.prezime,
        email: form.email,
        lozinka: form.lozinka,
      })
      navigate('/')
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
        setFieldErrors(err.fields) // npr. { email: "Nalog sa ovim emailom vec postoji" }
      } else {
        setError('Došlo je do greške.')
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold">Registracija</h1>
      <p className="text-muted mt-1 text-sm">Sa nalogom imate istoriju porudžbina.</p>

      {/* noValidate: iskljucuje poruke browsera, prikazujemo svoje na srpskom */}
      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            id="ime"
            name="ime"
            label="Ime"
            autoComplete="given-name"
            required
            value={form.ime}
            onChange={handleChange}
            error={fieldErrors.ime}
          />
          <FormField
            id="prezime"
            name="prezime"
            label="Prezime"
            autoComplete="family-name"
            required
            value={form.prezime}
            onChange={handleChange}
            error={fieldErrors.prezime}
          />
        </div>
        <FormField
          id="email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={handleChange}
          error={fieldErrors.email}
        />
        <FormField
          id="lozinka"
          name="lozinka"
          label="Lozinka"
          type="password"
          autoComplete="new-password"
          required
          value={form.lozinka}
          onChange={handleChange}
          error={fieldErrors.lozinka}
        />
        <FormField
          id="potvrda"
          name="potvrda"
          label="Ponovite lozinku"
          type="password"
          autoComplete="new-password"
          required
          value={form.potvrda}
          onChange={handleChange}
          error={fieldErrors.potvrda}
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
          {sending ? 'Slanje...' : 'Napravi nalog'}
        </button>
      </form>

      <p className="text-sm text-muted mt-6">
        Već imate nalog?{' '}
        <Link to="/prijava" className="text-ink underline">
          Prijavite se
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage
