import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { post_capturar_orden } from '../../../services/apis/pagos'
import LoaderSvg from '../../../components/LoaderSvg'
import useAuth from '../../../hooks/useAuth'
import Swal from 'sweetalert2'

const PagadoPage = () => {
  //ESTADOS
  const [lading, setLading] = useState(true)
  const [alerta, setAlerta] = useState({ msg: '', error: false })

  // USELOCATION
  const { search } = useLocation()

  // USENAVIGATE
  const navigate = useNavigate()

  // USEAUTH
  const { auth, handleLogin } = useAuth()

  // USEEFFECT
  useEffect(() => {
    const token = new URLSearchParams(search).get('token')
    const PayerID = new URLSearchParams(search).get('PayerID')

    // CAPTURAR ORDEN
    const capturarORDEN = async () => {
      try {
        if (!token || !PayerID) return navigate('/')
        setLading(true)
        const { data } = await post_capturar_orden({ token, PayerID })
        const { status, name } = data

        if (name === 'INSTRUMENT_DECLINED') {
          setAlerta({ msg: 'Pago denegado', error: true })
        }

        if (name === 'UNPROCESSABLE_ENTITY') {
          setAlerta({ msg: 'El pago ya fue procesado', error: true })
        }

        if (status === 'COMPLETED') {
          const { custom_id } = data.purchase_units[0].payments.captures[0]

          // Sincronizar el usuario con el plan
          handleLogin({ ...auth, plan: Number(custom_id), renovar: false })

          // Mostrar mensaje
          Swal.fire({
            title: 'Pago realizado con exito',
            text: 'Ahora puedes disfrutar de todos los beneficios de tu plan',
            confirmButtonText: 'Entendido',
            customClass: {
              confirmButton: 'btn btn-verde'
            },
            icon: 'success',
            buttonsStyling: false
          })

          return navigate('/')
        }

        if (status === 'PENDING') {
          setAlerta({ msg: 'Pago pendiente', error: false })
        }

        if (status === 'FAILED') {
          setAlerta({ msg: 'Pago fallido', error: true })
        }

        if (status === 'DENIED') {
          setAlerta({ msg: 'Pago denegado', error: true })
        }

        if (status === 'EXPIRED') {
          setAlerta({ msg: 'Pago expirado', error: true })
        }

        if (status === 'VOIDED') {
          setAlerta({ msg: 'Pago anulado', error: true })
        }

        if (status === 'PARTIALLY_REFUNDED') {
          setAlerta({ msg: 'Pago parcialmente reembolsado', error: true })
        }

        if (status === 'REFUNDED') {
          setAlerta({ msg: 'Pago reembolsado', error: true })
        }

        if (status === 'UNCLAIMED') {
          setAlerta({ msg: 'Pago no reclamado', error: true })
        }

        if (status === 'IN_PROGRESS') {
          setAlerta({ msg: 'Pago en progreso', error: true })
        }

        if (status === 'CREATED') {
          setAlerta({ msg: 'Pago creado', error: true })
        }

        if (status === 'SUSPENDED') {
          setAlerta({ msg: 'Pago suspendido', error: true })
        }

        if (status === 'REVERSED') {
          setAlerta({ msg: 'Pago revertido', error: true })
        }

        if (status === 'CANCELLED') {
          setAlerta({ msg: 'Pago cancelado', error: true })
        }
      } catch (error) {
        console.log(error)
        const { msg } = error?.response?.data
        setAlerta({ msg: msg, error: true })
      }
      setLading(false)
    }
    capturarORDEN()
  }, [])

  if (lading) return <LoaderSvg />

  if (alerta.msg) {
    return (
      <section className='contenedor'>
        <div className='center'>
          <h2>{alerta.msg}</h2>
          <p className={`alerta ${alerta.error ? 'error' : 'correcto'}`}>{alerta.msg}</p>
          <p> {alerta.error ? 'Lo sentimos, no se puede realizar la acción' : 'Pago realizado con exito'}</p>

          <Link to='/' className='btn btn-azul'>
            Ir al inicio
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className='contenedor'>
      <div className='center'>
        <Link to={'/'} className='btn btn-verde'>
          Ir Al Inicio
        </Link>
      </div>
    </section>
  )
}

export default PagadoPage
