import { Link, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import LoaderSvg from './LoaderSvg'
import Buscador from './Buscador'
import { PremiumSvg } from '../assets/svgs'

const Header = () => {
  // ESTADO
  const [menu, setMenu] = useState(false)

  // USELOCATION
  const location = useLocation()

  // USEAUTH
  const { auth, authLoading, handleLogout } = useAuth()

  // HANDLEMENU
  const handleMenu = () => {
    setMenu(!menu)
  }

  return (
    <>
      <header className='header'>
        <section className='contenedor'>
          <h1 className='header-logo'>
            <Link to={'/'}>DevJobs</Link>
            {auth?.plan === 3 && <PremiumSvg />}
            {auth?.plan === 4 && <img src='/enterprise.svg' alt='enterprise' />}
          </h1>

          <button className='header-menu' onClick={handleMenu}>
            <svg fill='none' width={30} stroke='currentColor' strokeWidth={1.5} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
            </svg>
          </button>

          <div className={`header-opciones ${menu ? 'open' : ''}`}>
            {authLoading ? (
              <LoaderSvg />
            ) : auth ? (
              <>
                <Link to={`/perfil/${auth._id}`} className='btn-perfil' onClick={handleMenu}>
                  {auth?.foto && auth?.foto?.secure_url && <img className='foto-perfil' src={auth.foto.secure_url} alt={auth.foto.original_filename} />}
                  <p className='ocultar'>Hola! {auth.nombre}</p>
                </Link>
                <Link to={'/admin'} className='btn-azul' onClick={handleMenu}>
                  Administración
                </Link>
                <button onClick={handleLogout} className='btn-rojo'>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <div className={`botones ${menu ? 'open' : ''}`}>
                <Link to={'/auth/login'} className='btn-gris' onClick={handleMenu}>
                  Iniciar Sesión
                </Link>
                <Link to={'/auth/crear-cuenta'} className='btn-azul' onClick={handleMenu}>
                  Crear Cuenta
                </Link>
              </div>
            )}

            <Link to={'/planes'} className='flex btn-amarillo' onClick={handleMenu}>
              Planes
              <PremiumSvg />
            </Link>
          </div>
        </section>
      </header>

      {(location.pathname === '/' || location.pathname.includes('search')) && <Buscador />}
    </>
  )
}

export default Header
