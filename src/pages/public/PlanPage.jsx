import React from 'react'
import Encabezado from '../../components/Encabezado'
import { Link, useParams } from 'react-router-dom'
import Plan1 from '../../components/planes/Plan1'
import Plan2 from '../../components/planes/Plan2'
import Plan3 from '../../components/planes/Plan3'
import Plan4 from '../../components/planes/Plan4'

const PlanPage = () => {
  // USEPARAMS
  const { plan } = useParams()

  // VALIDAR QUE EL PLAN SEA VALIDO
  if (plan !== '1' && plan !== '2' && plan !== '3' && plan !== '4') {
    return (
      <section className='contenedor'>
        <div className='center'>
          <h2>Plan no encontrado</h2>
          <p className={`alerta error`}>Plan no válido</p>
          <p>El plan que intenta acceder no existe</p>

          <Link to='/planes' className='btn btn-azul'>
            Ver planes
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <Encabezado titulo={'Planes'} descripcion={'Solo se aceptan pagos con paypal'} />

      <div className='contenedor-plan plan-no-hover'>
        {plan === '1' && <Plan1 />}
        {plan === '2' && <Plan2 />}
        {plan === '3' && <Plan3 />}
        {plan === '4' && <Plan4 />}
      </div>
    </>
  )
}

export default PlanPage
