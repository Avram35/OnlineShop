import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Pocetna from './pages/Pocetna'
import Katalog from './pages/Katalog'
import Proizvod from './pages/Proizvod'
import Korpa from './pages/Korpa'
import Prijava from './pages/Prijava'
import NijePronadjeno from './pages/NijePronadjeno'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Pocetna />} />
        <Route path="/katalog" element={<Katalog />} />
        <Route path="/proizvod/:id" element={<Proizvod />} />
        <Route path="/korpa" element={<Korpa />} />
        <Route path="/prijava" element={<Prijava />} />
        <Route path="*" element={<NijePronadjeno />} />
      </Route>
    </Routes>
  )
}

export default App
