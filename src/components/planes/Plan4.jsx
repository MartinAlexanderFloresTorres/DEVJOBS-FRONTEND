import { CheckSvg, HerramientaSvg, ShieldSvg } from '../../assets/svgs'
import useAuth from '../../hooks/useAuth'
import ButtonPlan from './ButtonPlan'

const Plan4 = () => {
  // USEAUTH
  const { auth } = useAuth()

  return (
    <article className={`plan ${auth?.plan == 4 ? 'seleccionado' : ''}`}>
      <h3>Plan Enterprise</h3>
      <div>
        <p className='precio'>
          $ 29.99 <span>/ Mensual</span>
        </p>
        <p className='precio-antes'>$ 39.99</p>
      </div>
      <ul>
        <li>
          <CheckSvg />
          Publica las 45 vacantes
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
          Tus vacantes seran entre las mas destacadas y apareceran en la sección de destacadas
        </li>

        <li>
          <CheckSvg />
          Sin limite de postulaciones de candidatos
        </li>

        <li>
          <ShieldSvg />
          Soporte 24/7
        </li>

        <li>
          <CheckSvg />
          Incluye icono de plan Enterprise
        </li>

        <li>
          <HerramientaSvg />
          Personalizacion de la plataforma
        </li>
      </ul>
      <ButtonPlan planId={4} texto={'Enterprise'} />
    </article>
  )
}

export default Plan4
