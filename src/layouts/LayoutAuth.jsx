import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'

const LayoutAuth = () => {
  // USEAUTH
  const { authLoading, auth } = useAuth()

  // USELOCATION
  const { pathname } = useLocation()

  if (authLoading) {
    return null
  }

  if (auth) {
    if (pathname.includes('login') || pathname.includes('crear-cuenta') || pathname.includes('olvide-password')) {
      return <Navigate to={'/'} />
    }
  }

  return (
    <>
      <Header />
      <main className='contenido-principal contenedor'>
        <Outlet />
      </main>
    </>
  )
}

export default LayoutAuth
