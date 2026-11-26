// Jedno mesto preko kog idu svi pozivi ka backendu.
// Ovde se dodaje CSRF token i ovde se greske pretvaraju u ApiError.

export class ApiError extends Error {
  status: number
  fields: Record<string, string>

  constructor(status: number, message: string, fields: Record<string, string> = {}) {
    super(message)
    this.status = status
    this.fields = fields
  }
}

// Spring Security salje token u kolacicu XSRF-TOKEN (nije HttpOnly, da bismo mogli da ga procitamo).
function readCsrfToken(): string | null {
  const cookie = document.cookie
    .split('; ')
    .find((c) => c.startsWith('XSRF-TOKEN='))
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' }

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  // GET ne menja nista, pa mu CSRF token ne treba
  if (method !== 'GET') {
    const token = readCsrfToken()
    if (token) {
      headers['X-XSRF-TOKEN'] = token
    }
  }

  let response: Response
  try {
    response = await fetch('/api' + path, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: 'same-origin', // salje kolacic sesije
    })
  } catch {
    throw new ApiError(0, 'Server nije dostupan. Pokušajte ponovo.')
  }

  // 204 No Content - nema tela
  if (response.status === 204) {
    return undefined as T
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message = data?.poruka ?? 'Došlo je do greške. Pokušajte ponovo.'
    throw new ApiError(response.status, message, data?.polja ?? {})
  }

  return data as T
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
  put: <T>(path: string, body?: unknown) => request<T>('PUT', path, body),
  patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
}
