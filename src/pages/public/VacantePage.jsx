import { Link, useLocation, useParams } from 'react-router-dom'
import { TrixEditor } from 'react-trix'
import useGetVacante from '../../hooks/useGetVacante'
import FormCanditado from '../../components/FormCanditado'
import Encabezado from '../../components/Encabezado'
import LoaderSvg from '../../components/LoaderSvg'
import { PremiumSvg } from '../../assets/svgs'
import EnterpriseSvg from '../../assets/enterprise.svg'

const VacantePage = () => {
  // USEPARAMS
  const { url } = useParams()

  // USEGETVACANTE
  const { vacante, loading, error } = useGetVacante({ url })

  // USELOCATION
  const { state } = useLocation()

  if (loading) {
    return <LoaderSvg />
  }

  if (error) {
    return (
      <section className='contenedor'>
        <div className='center'>
          <h2>Vacante no encontrada</h2>
          <p className={`alerta error`}>{error}</p>
          <p>No existe la vacante que buscas</p>

          <Link to={state ? state.pathname : '/'} className='btn btn-azul'>
            Volver
          </Link>
        </div>
      </section>
    )
  }

  if (!vacante) {
    return null
  }

  return (
    <>
      <Encabezado titulo={`Vacante (${vacante.titulo})`} descripcion={`Todos los detalles de la vacante ${vacante.titulo}`} />

      <section className='botones'>
        <Link to={state ? state.pathname : '/'} className='btn btn-verde'>
          Volver
        </Link>
      </section>

      {vacante.requeridos < 1 && <div className='alerta error vacante-cerrado'>La vacante ha cerrado su proceso de selección</div>}

      <section className='contenido-superior vacante contenedor'>
        <div className='caja'>
          <p className='etiqueta'>Empresa</p>
          <h2 className='vacante-titulo'>
            <div className='nombre'>{vacante.empresa}</div>
            {vacante.creador.plan === 4 && <img src={EnterpriseSvg} alt='Enterprise' />}
            {vacante.creador.plan === 3 && <PremiumSvg />}
          </h2>
        </div>

        <div className='caja'>
          <p className='etiqueta'>Ubicación</p>
          <div className='nombre'>{vacante.ubicacion}</div>
        </div>

        <div className='caja'>
          <p className='etiqueta'>Contrato</p>
          <div className='nombre contrato'>{vacante.contrato}</div>
        </div>

        <div className='caja'>
          <p className='etiqueta'>Salario</p>
          <div className='nombre contrato'>$ {vacante.salario}</div>
        </div>
      </section>

      <section className='vacante-contenedor contenedor'>
        <section className='contenido'>
          <h2>Descripción del Puesto</h2>
          <div className='vacante-descripcion black'>
            <TrixEditor value={vacante.descripcion} />
          </div>
        </section>

        <aside className='contenido sidebar'>
          <h2>Conocimientos Deseados</h2>
          <ul className='skills'>
            {vacante.skills &&
              vacante.skills.map((skill) => (
                <li key={skill._id} className='skill'>
                  {skill.nombre}
                </li>
              ))}
          </ul>
        </aside>
      </section>

      {vacante.requeridos > 0 && (
        <div className='contenedor datos-reclutador'>
          <div className='enviar-datos'>
            <h2>¿Eres el candidato ideal?</h2>
            <p>Envía tu CV a la empresa y comienza tu proceso de selección</p>

            <FormCanditado />
          </div>

          <div className='info-reclutador'>
            <h2>Creador de la Vacante</h2>

            <section>
              {vacante.creador.foto && <img src={vacante.creador.foto.secure_url} alt='Foto Reclutador' />}
              <div>
                <Link to={`/perfil/${vacante.creador._id}`} className='nombre word-break'>
                  {vacante.creador.nombre}
                </Link>

                <a className='email word-break' href={`mailto:${vacante.creador.email}`}>
                  {vacante.creador.email}
                </a>
                <Link to={`/perfil/${vacante.creador._id}`} className='btn btn-azul'>
                  Ver Perfil
                </Link>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  )
}

export default VacantePage
