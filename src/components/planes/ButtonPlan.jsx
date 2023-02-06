import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { post_crear_orden } from '../../services/apis/pagos'
import useAuth from '../../hooks/useAuth'
import Alerta from '../Alerta'
import LoaderSvg from '../LoaderSvg'

const ButtonPlan = ({ planId, texto }) => {
  // ESTADOS
  const [lading, setLading] = useState(false)
  const [alerta, setAlerta] = useState({ msg: '', error: false })

  const color = planId == 1 ? 'gris' : planId == 2 ? 'amarillo' : planId == 3 ? 'azul' : 'verde'

  // USELOCATION
  const location = useLocation()
  const { pathname } = location

  // VALIDAR RUTA
  const rutaValida = pathname == '/planes/1' || pathname == '/planes/2' || pathname == '/planes/3' || pathname == '/planes/4'

  // USENAVIGATE
  const navigate = useNavigate()

  // USEAUTH
  const { auth, authLoading } = useAuth()

  // HANDLEORDER
  const handleOrder = async () => {
    try {
      setAlerta({ msg: '', error: false })
      // VALIDAR QUE EL USUARIO ESTE LOGUEADO
      if (!auth) return navigate('/auth/login', { state: location })

      // SI EL USUARIO YA TIENE EL PLAN Y NO QUIERE RENOVAR
      if (auth?.plan == planId && !auth?.renovar) return navigate('/', { state: location })

      // CREAR ORDEN
      const plan = {
        plan: planId,
        precio: planId == 1 ? 0 : planId == 2 ? 9.99 : planId == 3 ? 19.99 : 29.99,
        descripcion: planId == 1 ? 'Plan gratuito' : planId == 2 ? 'Plan basico' : planId == 3 ? 'Plan intermedio' : 'Plan avanzado'
      }

      // SI EL USUARIO YA TIENE EL PLAN
      if (planId == 1) {
        return navigate('/')
      }

      // ORDENAR PLAN
      setLading(true)
      const { data } = await post_crear_orden(plan)
      const link = data.links.find((link) => link.rel === 'approve')

      // SI NO HAY LINK
      if (!link) return

      // ABRIR LINK EN ESTA PAGINA
      window.location.href = link.href
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setAlerta({ msg, error: true })
    }
    setLading(false)
  }

  if (authLoading) return <LoaderSvg />

  if (rutaValida) {
    // SI EL USUARIO YA TIENE EL PLAN Y QUIERE RENOVAR
    if (auth?.plan == planId && auth?.renovar) {
      return (
        <button className={`btn btn-${color}`} onClick={handleOrder} disabled={auth?.renovar ? false : true}>
          {auth?.renovar ? (lading ? 'Renovando..' : 'Renovar Plan') : lading ? 'Adquiriendo...' : 'Plan Aquirido'}
        </button>
      )
    } else if (planId == 1) {
      return (
        <button className='btn btn-gris' disabled={true}>
          Por defecto
        </button>
      )
    } else {
      return (
        <>
          <Alerta alerta={alerta} />
          <button className={`btn btn-${color}`} onClick={handleOrder} disabled={auth?.plan === planId}>
            {lading ? 'Adquiriendo...' : texto}
          </button>
        </>
      )
    }
  }

  if (pathname == '/planes') {
    return (
      <Link to={`/planes/${planId}`} className={`btn btn-${color}`}>
        {auth?.plan == planId && auth?.renovar ? 'Renovar' : texto}
      </Link>
    )
  }

  return null
}

export default ButtonPlan
