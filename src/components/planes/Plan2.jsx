import { CheckSvg, XSvg } from '../../assets/svgs'
import ButtonPlan from './ButtonPlan'
import useAuth from '../../hooks/useAuth'

const Plan2 = () => {
  // USEAUTH
  const { auth } = useAuth()

  return (
    <article className={`plan ${auth?.plan == 2 ? 'seleccionado' : ''}`}>
      <h3>Plan Basic</h3>
      <div>
        <p className='precio'>
          $ 9.99 <span>/ Mensual</span>
        </p>
        <p className='precio-antes'>$ 19.99</p>
      </div>
      <ul>
        <li>
          <CheckSvg />
          Publicar 10 vacantes
        </li>
        <li>
          <CheckSvg />
          Acceso a todos los candidatos
        </li>
        <li>
          <CheckSvg />
          Sin limite de recursos
        </li>

        <li>
          <CheckSvg />
          Solo se pueden postular 50 candidatos en cada vacante
        </li>

        <li>
          <CheckSvg />
          Sin limite de tiempo
        </li>

        <li>
          <XSvg />
          No incluye icono de plan
        </li>

        <li>
          <XSvg />
          No Soporte
        </li>
      </ul>
      <ButtonPlan planId={2} texto={'Basic'} />
    </article>
  )
}

export default Plan2
