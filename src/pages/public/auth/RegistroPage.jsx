import { useState } from 'react'
import { Link } from 'react-router-dom'
import { post_crear } from '../../../services/apis/users'
import Alerta from '../../../components/Alerta'
import Encabezado from '../../../components/Encabezado'

const DEFAULT_STATE = {
  campos: {
    nombre: '',
    email: '',
    password: '',
    password2: ''
  },
  alerta: {
    error: false,
    msg: ''
  }
}

const RegistroPage = () => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_STATE.campos)
  const [alerta, setAlerta] = useState(DEFAULT_STATE.alerta)
  const [loading, setLoading] = useState(false)

  // HANDLE CHANGE CAMPOS
  const handleChange = (e) => {
    const { name, value } = e.target
    setCampos((prevState) => ({ ...prevState, [name]: value }))
  }

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar
    if (campos.nombre.trim() === '') {
      setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El nombre es obligatorio' }))
      return
    }

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
      const { data } = await post_crear({ datos: campos })
      const { msg } = data
      setAlerta((prevState) => ({ ...prevState, error: false, msg }))
      setCampos(DEFAULT_STATE.campos)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setAlerta((prevState) => ({ ...prevState, error: true, msg }))
    }
    setLoading(false)
  }

  return (
    <>
      <Encabezado titulo='Crear Cuenta' descripcion={`Crea tu cuenta para poder  a la aplicación y empezar a postular a empleos`} />

      <Alerta alerta={alerta} />

      <section className='contenedor'>
        <form className='default-form' onSubmit={handleSubmit}>
          <div className='campo'>
            <label htmlFor='nombre'>Nombre</label>
            <input type='text' id='nombre' name='nombre' value={campos.nombre} onChange={handleChange} placeholder='Tu Nombre' />
          </div>

          <div className='campo'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' value={campos.email} onChange={handleChange} placeholder='Tu Email' />
          </div>

          <div className='campo'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' value={campos.password} onChange={handleChange} placeholder='Tu Password' />
          </div>

          <div className='campo'>
            <label htmlFor='password2'>Repetir Password</label>
            <input type='password' id='password2' name='password2' value={campos.password2} onChange={handleChange} placeholder='Repite tu Password' />
          </div>

          <div className='campo acciones'>
            <Link to='/auth/login'>Volver Iniciar Sesión</Link>
          </div>

          <input type='submit' disabled={loading} className='btn btn-azul' value={loading ? 'Creando...' : 'Crear Cuenta'} />
        </form>
      </section>
    </>
  )
}

export default RegistroPage
