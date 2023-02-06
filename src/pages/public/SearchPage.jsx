import { Link, useParams } from 'react-router-dom'
import Vacante from '../../components/Vacante'
import Encabezado from '../../components/Encabezado'
import LoaderSvg from '../../components/LoaderSvg'
import useGetVacantesSearch from '../../hooks/useGetVacantesSearch'

const SearchPage = () => {
  // USEPARAMS
  const { query } = useParams()

  // USEGETVACANTES
  const { vacantes, loading, error } = useGetVacantesSearch({ query })

  if (error) {
    return (
      <section className='contenedor'>
        <div className='center'>
          <h2>Ups hubo un error</h2>
          <p className={`alerta error`}>{error}</p>
          <p>Intenta nuevamente</p>

          <Link to='/' className='btn btn-azul'>
            Ir al inicio
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <Encabezado titulo='Resultados de la búsqueda' descripcion={`Resultados de la búsqueda: ${query}`} />

      <section className='lista-vacantes'>
        <h2 className='titulo'>Vacantes encontradas</h2>

        {loading ? <LoaderSvg /> : vacantes.length > 0 ? vacantes.map((vacante) => <Vacante key={vacante._id} vacante={vacante} />) : <p>No hay vacantes</p>}
      </section>
    </>
  )
}

export default SearchPage
