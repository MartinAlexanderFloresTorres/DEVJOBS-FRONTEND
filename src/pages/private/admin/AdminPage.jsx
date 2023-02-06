import { Link } from 'react-router-dom'
import useGetVacantesCreador from '../../../hooks/useGetVacantesCreador'
import VacanteAdmin from '../../../components/VacanteAdmin'
import Encabezado from '../../../components/Encabezado'
import LoaderSvg from '../../../components/LoaderSvg'
import useAuth from '../../../hooks/useAuth'

const AdminPage = () => {
  // USEGETVACANTESCREADOR
  const { vacantes, loading, error } = useGetVacantesCreador()

  // USEAUTH
  const { auth } = useAuth()

  if (error) {
    return (
      <section className='contenedor'>
        <div className='center'>
          <h2>Ups algo salió mal</h2>
          <p className={`alerta error`}>{error}</p>
          <p>Intenta de nuevo</p>

          <Link to='/' className='btn btn-azul'>
            Ir al inicio
          </Link>
        </div>
      </section>
    )
  }

  if (loading) return <LoaderSvg />

  /* 
    1- FREE 2 VACANTES
    2- BASIC 10 VACANTES
    3 - PRO 25 VACANTES
    4 - PREMIUM 45 VACANTES
   */
  const mostrarCrear = (auth.plan === 1 && vacantes.length >= 2) || !(auth.plan === 2 && vacantes.length >= 10) || !(auth.plan === 3 && vacantes.length >= 25) || !(auth.plan === 4 && vacantes.length >= 45)

  return (
    <>
      <Encabezado titulo='Panel de Administración' descripcion='Administra tus vacantes' />

      <section>
        <h2>Navegación</h2>

        <div className='botones separador'>
          <Link to='/admin/perfil/editar' className='btn btn-azul'>
            Editar Perfil
          </Link>

          {mostrarCrear && (
            <Link to='/admin/vacantes/nueva' className='btn btn-verde'>
              Nueva Vacante
            </Link>
          )}
        </div>

        <section className='listado-vacantes'>
          <h2>Tus Vacantes</h2>
          {loading ? <LoaderSvg /> : vacantes.length > 0 ? vacantes.map((vacante) => <VacanteAdmin key={vacante._id} vacante={vacante} />) : <p>No hay vacantes</p>}
        </section>
      </section>
    </>
  )
}

export default AdminPage
