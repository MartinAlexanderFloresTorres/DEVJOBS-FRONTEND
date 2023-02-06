import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { post_login } from '../../../services/apis/users'
import useAuth from '../../../hooks/useAuth'
import Alerta from '../../../components/Alerta'
import Encabezado from '../../../components/Encabezado'

const DEFAULT_STATE = {
  campos: {
    email: '',
    password: ''
  },
  alerta: {
    error: false,
    msg: ''
  }
}

const LoginPage = () => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_STATE.campos)
  const [alerta, setAlerta] = useState(DEFAULT_STATE.alerta)
  const [loading, setLoading] = useState(false)

  // USENAVIGATE
  const navigate = useNavigate()

  // USELOCATION
  const { state } = useLocation()

  // USEAUTH
  const { handleLogin } = useAuth()

  // HANDLE CHANGE CAMPOS
  const handleChange = (e) => {
    const { name, value } = e.target
    setCampos((prevState) => ({ ...prevState, [name]: value }))
  }

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar
    if (campos.email.trim() === '') {
      setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El email es obligatorio' }))
      return
    }

    if (!/\S+@\S+\.\S+/.test(campos.email)) {
      setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El email no es válido' }))
      return
    }

    if (campos.password.trim() === '') {
      setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El password es obligatorio' }))
      return
    }

    // Limpiar alerta
    setAlerta((prevState) => ({ ...prevState, error: false, msg: '' }))
    // Enviar
    try {
      setLoading(true)
      const { data } = await post_login({ datos: campos })
      const { msg, jwt, user } = data
      // Mostrar mensaje
      setAlerta((prevState) => ({ ...prevState, error: false, msg }))

      setTimeout(() => {
        setAlerta((prevState) => ({ ...prevState, error: false, msg: '' }))
      }, 3000)
      // Limpiar campos
      setCampos(DEFAULT_STATE.campos)
      // Guardar token en localStorage
      localStorage.setItem('_token_devjobs', jwt)
      handleLogin(user)
      // Redireccionar
      if (state) {
        navigate(state.pathname)
      } else {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setAlerta((prevState) => ({ ...prevState, error: true, msg }))
      // eliminar token del localStorage
      localStorage.removeItem('_token_devjobs')
    }
    setLoading(false)
  }

  return (
    <>
      <Encabezado titulo='Iniciar Sesión' descripcion={`Inicia sesión para acceder a tu cuenta de DevJobs`} />

      <Alerta alerta={alerta} />

      <section className='contenedor'>
        <form className='default-form' onSubmit={handleSubmit}>
          <div className='campo'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' value={campos.email} onChange={handleChange} placeholder='Tu Email' />
          </div>

          <div className='campo'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' value={campos.password} onChange={handleChange} placeholder='Tu Password' />
          </div>

          <div className='campo acciones'>
            <Link to='/auth/crear-cuenta'>Crear Cuenta</Link>
            <Link to='/auth/olvide-password'>Olvidé mi password</Link>
          </div>

          <input type='submit' disabled={loading} className='btn btn-azul' value={loading ? 'Autenticando...' : 'Iniciar Sesión'} />
        </form>
      </section>
    </>
  )
}

export default LoginPage
