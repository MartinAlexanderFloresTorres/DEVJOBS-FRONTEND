import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { get_confirmar } from '../../../services/apis/users'
import LoaderSvg from '../../../components/LoaderSvg'

const ConfirmarPage = () => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [confirmado, setConfirmado] = useState(false)

  // USEPARAMS
  const { token } = useParams()

  // EFECTO DE URL
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        setLoading(true)
        const { data } = await get_confirmar({ token })
        console.log(data)
        setConfirmado(true)
      } catch (error) {
        console.log(error)
        const { msg } = error?.response?.data
        setError(msg)
      }
      setLoading(false)
    }
    confirmarCuenta()
  }, [token])

  if (loading) {
    return <LoaderSvg />
  }

  if (error) {
    return (
      <section className='contenedor'>
        <div className='center'>
          <h2>Token no válido</h2>
          <p className={`alerta error`}>{error}</p>
          <p>Solicita un nuevo token</p>

          <Link to='/auth/login' className='btn btn-azul'>
            Iniciar Sesión
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className='contenedor'>
      <div className='center'>
        <h1>Confirmación de cuenta</h1>
        <p className={`alerta correcto`}>Cuenta confirmada</p>
        <p>La cuenta ha sido confirmada</p>

        <Link to='/auth/login' className='btn btn-azul'>
          Iniciar Sesión
        </Link>
      </div>
    </section>
  )
}

export default ConfirmarPage
