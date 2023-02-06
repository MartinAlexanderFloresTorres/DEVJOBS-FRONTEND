import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Alerta from './Alerta'
import useDeletVacante from '../hooks/useDeletVacante'
import { PremiumSvg } from '../assets/svgs'
import EnterpriseSvg from '../assets/enterprise.svg'

const VacanteAdmin = ({ vacante }) => {
  const {
    empresa,
    titulo,
    _id,
    url,
    candidatos,
    creador: { plan }
  } = vacante

  // USEDELETVACANTE
  const { handleEliminar, loading: loadingEliminar, error: errorEliminar } = useDeletVacante({ url })

  // USELOCATION
  const location = useLocation()

  return (
    <>
      <Alerta alerta={{ error: true, msg: errorEliminar }} />

      <div className='vacante vacante-admin'>
        <div className='caja'>
          <h3 className='vacante-titulo'>
            <Link to={`/vacantes/${url}`} state={location}>
              {empresa}
              {plan === 4 && <img src={EnterpriseSvg} alt='Enterprise' />}
              {plan === 3 && <PremiumSvg />}
            </Link>
          </h3>
          <p className='puesto'>{titulo}</p>
          <div>
            {vacante.requeridos < 1 && <p className='error'>Cerrado</p>}
            <span className='candidados correcto'>{candidatos.length} Candidato(s)</span>
          </div>
        </div>
        <div className='botones'>
          <Link to={`/admin/candidatos/${url}`} state={location} className='btn btn-azul'>
            Candidatos
          </Link>

          {vacante.requeridos > 0 && (
            <Link to={`/admin/vacantes/editar/${url}`} state={location} className='btn btn-verde'>
              Editar
            </Link>
          )}

          <button className='btn btn-rojo' onClick={() => handleEliminar(_id)}>
            {loadingEliminar ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </>
  )
}

export default VacanteAdmin
