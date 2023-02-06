import useGetVacantes from '../../hooks/useGetVacantes'
import Vacante from '../../components/Vacante'
import Encabezado from '../../components/Encabezado'
import { Link, useLocation } from 'react-router-dom'
import LoaderSvg from '../../components/LoaderSvg'
import useAuth from '../../hooks/useAuth'

const HomePage = () => {
  // USEGETVACANTES
  const { vacantes, loading, error } = useGetVacantes()

  // USEAUTH
  const { auth } = useAuth()

  // USELOCATION
  const location = useLocation()

  if (error) {
    return (
      <section className='contenedor'>
        <div className='center'>
          <h2>Vuelva mas tarde</h2>
          <p className={`alerta error`}>{error}</p>
          <p>Intenta nuevamente</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <Encabezado titulo='Lista de Vacantes' descripcion='Encuentra tu trabajo ideal'>
        {auth && (
          <Link to={'/admin/vacantes/nueva'} state={location} className='btn btn-azul'>
            Publicar Nueva Vacante
          </Link>
        )}
      </Encabezado>

      <section className='lista-vacantes'>
        <h2 className='titulo'>Empleos Disponibles</h2>

        {loading ? <LoaderSvg /> : vacantes.length > 0 ? vacantes.map((vacante) => <Vacante key={vacante._id} vacante={vacante} />) : <p>No hay vacantes</p>}
      </section>
    </>
  )
}

export default HomePage
