import { CheckSvg, ShieldSvg } from '../../assets/svgs'
import ofertaSvg from '../../assets/oferta.svg'
import ButtonPlan from './ButtonPlan'
import useAuth from '../../hooks/useAuth'

const Plan3 = () => {
  // USEAUTH
  const { auth } = useAuth()

  return (
    <article className={`plan ${auth?.plan == 3 ? 'seleccionado' : ''}`}>
      <img className='plan-oferta' src={ofertaSvg} alt='oferta' />

      <h3>Plan Premium</h3>
      <div>
        <p className='precio'>
          $ 19.99 <span>/ Mensual</span>
        </p>
        <p className='precio-antes'>$ 29.99</p>
      </div>
      <ul>
        <li>
          <CheckSvg />
          Publicar 25 vacantes
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
          Tu vacante aparacerá en la sección de destacadas
        </li>

        <li>
          <CheckSvg />
          Solo se pueden postular 200 candidatos en cada vacante
        </li>

        <li>
          <CheckSvg />
          Incluye icono de plan premium
        </li>

        <li>
          <ShieldSvg />
          Soporte 12/5
        </li>
      </ul>
      <ButtonPlan planId={3} texto={'Premium'} />
    </article>
  )
}

export default Plan3
