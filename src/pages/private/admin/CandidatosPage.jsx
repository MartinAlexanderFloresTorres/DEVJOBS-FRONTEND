import { Link, useLocation, useParams } from 'react-router-dom'
import useGetCandidatos from '../../../hooks/useGetCandidatos'
import Candidato from '../../../components/Candidato'
import Encabezado from '../../../components/Encabezado'
import LoaderSvg from '../../../components/LoaderSvg'

const CandidatosPage = () => {
  // USEPARAMS
  const { url } = useParams()

  // USELOCATION
  const { state } = useLocation()

  // USEGETCANDIDATOS
  const { setCandidatos, candidatos: vacante, loading, error } = useGetCandidatos({ url })

  if (error) {
    return (
      <section className='contenedor'>
        <div className='center'>
          <h2>Candidatos no encontrados</h2>
          <p className={`alerta error`}>{error}</p>
          <p>No existe el candidato que buscas</p>

          <Link to={state ? state.pathname : '/'} className='btn btn-azul'>
            Volver
          </Link>
        </div>
      </section>
    )
  }

  if (loading) {
    return <LoaderSvg />
  }

  return (
    <>
      <Encabezado titulo={`Candidatos de (${vacante.titulo})`} descripcion={`Todos los candidatos que han postulado a esta vacante ${vacante.titulo}`} />

      <div className='botones pb-30'>
        <Link to={'/admin'} className='btn btn-verde'>
          Volver
        </Link>
      </div>
      <section className='lista-candidatos'>
        <h2>Candidatos</h2>

        {vacante?.candidatos?.length > 0 ? vacante.candidatos.map((candidato) => <Candidato key={candidato._id} candidato={candidato} setCandidatos={setCandidatos} vacante={vacante} />) : <p className='sin-candidatos'>No hay candidatos</p>}
      </section>
    </>
  )
}

export default CandidatosPage
