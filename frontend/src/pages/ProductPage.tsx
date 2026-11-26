import { useParams } from 'react-router-dom'

function ProductPage() {
  const { id } = useParams()

  return (
    <div>
      <h1 className="text-2xl font-bold">Proizvod #{id}</h1>
      <p className="text-muted mt-2">Detalji proizvoda.</p>
    </div>
  )
}

export default ProductPage
