import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { get_verificarToken, post_restablecer } from '../../../services/apis/users'
import Alerta from '../../../components/Alerta'

const DEFAULT_STATE = {
  campos: {
    password: '',
    password2: ''
  },
  alerta: {
    error: false,
    msg: ''
  }
}

const NuevoPasswordPage = () => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_STATE.campos)
  const [alerta, setAlerta] = useState(DEFAULT_STATE.alerta)
  const [loading, setLoading] = useState(false)
  const [valido, setValido] = useState(false)
  const [cambiado, setCambiado] = useState(false)
  const [cargando, setCargando] = useState(true)

  // USEPARAMS
  const { token } = useParams()

  // USENAVIGATE
  const navigate = useNavigate()

  // USEEFFECT VALIDAR TOKEN
  useEffect(() => {
    const validarToken = async () => {
      try {
        setCargando(true)
        await get_verificarToken({ token })
        setValido(true)
      } catch (error) {
        console.log(error)
        const { msg } = error?.response?.data
        setAlerta((prevState) => ({ ...prevState, error: true, msg }))
        setValido(false)
        // Redireccionar
        setTimeout(() => {
          navigate('/auth/login')
        }, 3000)
      }
      setCargando(false)
    }
    validarToken()
  }, [token])

  // HANDLE CHANGE CAMPOS
  const handleChange = (e) => {
    const { name, value } = e.target
    setCampos((prevState) => ({ ...prevState, [name]: value }))
  }

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar
    if (campos.password.trim() === '') {
      setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El password es obligatorio' }))
      return
    }
    if (campos.password.length < 6) {
      setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El password debe tener al menos 6 caracteres' }))
      return
    }

    if (campos.password !== campos.password2) {
      setAlerta((prevState) => ({ ...prevState, error: true, msg: 'Los passwords no coinciden' }))
      return
    }

    // Limpiar alerta
    setAlerta((prevState) => ({ ...prevState, error: false, msg: '' }))

    // Enviar
    try {
      setLoading(true)
      await post_restablecer({ datos: campos, token })
      setCampos(DEFAULT_STATE.campos)
      setCambiado(true)
      // Redireccionar
      setTimeout(() => {
        navigate('/auth/login')
      }, 3000)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setAlerta((prevState) => ({ ...prevState, error: true, msg }))
    }
    setLoading(false)
  }

  if (cargando) return null

  if (!valido) {
    return (
      <section className='contenedor'>
        <div className='center'>
          <h1>Token no válido</h1>
          {alerta.msg && <p className={`alerta ${alerta.error ? 'error' : 'correcto'}`}>{alerta.msg}</p>}
          <p>Redireccionando a la página de</p>

          <Link to='/auth/login' className='btn btn-azul'>
            Iniciar Sesión
          </Link>
        </div>
      </section>
    )
  }

  if (cambiado) {
    return (
      <section className='contenedor'>
        <div className='center'>
          <h1>El password se ha cambiado correctamente</h1>
          <p>Redireccionando a la página de</p>
          <Link to='/auth/login' className='btn btn-azul'>
            Iniciar Sesión
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <Alerta alerta={alerta} />

      <section className='contenedor'>
        <h1 className='center'>Nuevo Password</h1>
        <form className='default-form' onSubmit={handleSubmit}>
          <div className='campo'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' value={campos.password} onChange={handleChange} placeholder='Tu Password' />
          </div>

          <div className='campo'>
            <label htmlFor='password2'>Repetir Password</label>
            <input type='password' id='password2' name='password2' value={campos.password2} onChange={handleChange} placeholder='Repite tu Password' />
          </div>

          <input type='submit' disabled={loading} className='btn btn-azul' value={loading ? 'Guardando...' : 'Guardar Password'} />
        </form>
      </section>
    </>
  )
}

export default NuevoPasswordPage
