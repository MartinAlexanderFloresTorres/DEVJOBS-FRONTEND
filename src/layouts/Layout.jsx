import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout = () => {
  return (
    <>
      <Header />
      <main className='contenido-principal contenedor'>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
