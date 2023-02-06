import { Link, useLocation } from 'react-router-dom'
import { PremiumSvg } from '../assets/svgs'
import EnterpriseSvg from '../assets/enterprise.svg'

const Vacante = ({ vacante }) => {
  const {
    titulo,
    url,
    empresa,
    ubicacion,
    contrato,
    candidatos,
    creador: { plan }
  } = vacante

  // USELOCATION
  const location = useLocation()

  return (
    <div className='vacante'>
      <div className='caja'>
        <h2 className='vacante-titulo'>
          {empresa}
          {plan === 4 && <img src={EnterpriseSvg} alt='Enterprise' />}
          {plan === 3 && <PremiumSvg />}
        </h2>
        <p className='puesto'>{titulo}</p>
        {vacante.requeridos < 1 ? <p className='error'>Cerrado</p> : <span className='candidados correcto'>{candidatos.length} Candidato(s)</span>}
      </div>

      <div className='caja'>
        <p className='etiqueta'>Ubicación</p>
        <div className='nombre'>{ubicacion}</div>
      </div>

      <div className='caja'>
        <p className='etiqueta'>Contrato</p>
        <div className='nombre contrato'>{contrato}</div>
      </div>

      <div className='caja centrar-vertical'>
        <Link to={`/vacantes/${url}`} state={location} className='btn btn-verde'>
          Más Info
        </Link>
      </div>
    </div>
  )
}

export default Vacante
