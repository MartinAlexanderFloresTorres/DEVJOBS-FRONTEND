import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/public/HomePage'
import NuevaVacantePage from './pages/private/admin/NuevaVacantePage'
import VacantePage from './pages/public/VacantePage'
import EditarVacantePage from './pages/private/admin/EditarVacantePage'
import RegistroPage from './pages/public/auth/RegistroPage'
import LoginPage from './pages/public/auth/LoginPage'
import ConfirmarPage from './pages/public/auth/ConfirmarPage'
import OlvidePasswordPage from './pages/public/auth/OlvidePasswordPage'
import NuevoPasswordPage from './pages/public/auth/NuevoPasswordPage'
import AuthProvider from './providers/AuthProvider'
import AdminPage from './pages/private/admin/AdminPage'
import LayoutAdmin from './layouts/LayoutAdmin'
import EditarPerfilPage from './pages/private/auth/EditarPerfilPage'
import CandidatosPage from './pages/private/admin/CandidatosPage'
import PerfilPage from './pages/public/auth/PerfilPage'
import NotFoundPage from './pages/public/NotFoundPage'
import SearchPage from './pages/public/SearchPage'
import LayoutAuth from './layouts/LayoutAuth'
import PlanesPage from './pages/public/PlanesPage'
import PagadoPage from './pages/private/checkout/PagadoPage'
import CanceladoPage from './pages/private/checkout/CanceladoPage'
import PlanPage from './pages/public/PlanPage'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='vacantes/:url' element={<VacantePage />} />

            <Route path='admin' element={<LayoutAdmin />}>
              <Route path='vacantes/nueva' element={<NuevaVacantePage />} />
              <Route index element={<AdminPage />} />
              <Route path='vacantes/editar/:url' element={<EditarVacantePage />} />
              <Route path='perfil/editar' element={<EditarPerfilPage />} />
              <Route path='candidatos/:url' element={<CandidatosPage />} />
            </Route>

            <Route path='perfil/:id' element={<PerfilPage />} />

            <Route path='search/:query' element={<SearchPage />} />

            <Route path='planes'>
              <Route index element={<PlanesPage />} />
              <Route path=':plan' element={<PlanPage />} />
            </Route>
          </Route>

          <Route path='/auth' element={<LayoutAuth />}>
            <Route path='crear-cuenta' element={<RegistroPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='olvide-password' element={<OlvidePasswordPage />} />
            <Route path='confirmar-cuenta/:token' element={<ConfirmarPage />} />
          </Route>

          <Route path='/checkout' element={<LayoutAdmin />}>
            <Route path='success' element={<PagadoPage />} />
            <Route path='cancel' element={<CanceladoPage />} />
          </Route>

          <Route path='/auth/olvide-password/:token' element={<NuevoPasswordPage />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
