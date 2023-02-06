import { CheckSvg, NoSymbolSvg, XSvg } from '../../assets/svgs'
import ButtonPlan from './ButtonPlan'
import useAuth from '../../hooks/useAuth'

const Plan1 = () => {
  // USEAUTH
  const { auth } = useAuth()

  return (
    <article className={`plan ${auth?.plan == 1 ? 'seleccionado' : ''}`}>
      <h3>Plan Gratis</h3>
      <p className='precio'>Gratis</p>
      <ul>
        <li>
          <CheckSvg />
          Publicar 2 vacante
        </li>
        <li>
          <CheckSvg />
          Acceso a todos los candidatos
        </li>
        <li>
          <CheckSvg />
          Recursos limitados
        </li>

        <li>
          <NoSymbolSvg />
          Solo se pueden requerir 10 candidatos y postular 10 veces en cada vacante
        </li>

        <li>
          <NoSymbolSvg />
          Tus vacantes seran eliminadas en 15 dias
        </li>

        <li>
          <XSvg />
          No incluye icono de plan
        </li>

        <li>
          <XSvg />
          No tiene acceso a eliminar candidatos
        </li>

        <li>
          <XSvg />
          No Soporte
        </li>
      </ul>
      <ButtonPlan planId={1} texto={'Free'} />
    </article>
  )
}

export default Plan1
