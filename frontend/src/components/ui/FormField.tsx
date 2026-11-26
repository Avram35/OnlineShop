import type { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

// Polje forme: natpis, input i poruka o gresci ispod.
function FormField({ label, error, id, ...inputProps }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className={
          'border rounded px-3 py-2 outline-none focus:border-ink ' +
          (error ? 'border-red-500' : 'border-line')
        }
        {...inputProps}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default FormField
