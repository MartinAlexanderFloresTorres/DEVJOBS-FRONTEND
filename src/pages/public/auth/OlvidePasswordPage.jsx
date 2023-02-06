import { useState } from 'react'
import { Link } from 'react-router-dom'
import { post_recuperacion } from '../../../services/apis/users'
import Alerta from '../../../components/Alerta'
import Encabezado from '../../../components/Encabezado'

const DEFAULT_STATE = {
  campos: {
    email: ''
  },
  alerta: {
    error: false,
    msg: ''
  }
}

const OlvidePasswordPage = () => {
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
    if (campos.email.trim() === '') {
      setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El email es obligatorio' }))
      return
    }
    if (!/\S+@\S+\.\S+/.test(campos.email)) {
      setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El email no es válido' }))
      return
    }

    // Limpiar alerta
    setAlerta((prevState) => ({ ...prevState, error: false, msg: '' }))

    // Enviar
    try {
      setLoading(true)
      const { data } = await post_recuperacion({ datos: campos })
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
      <Encabezado titulo='Recuperar Contraseña' descripcion={`Ingresa tu email y te enviaremos las instrucciones para recuperar tu contraseña`} />

      <Alerta alerta={alerta} />

      <section className='contenedor'>
        <form className='default-form' onSubmit={handleSubmit}>
          <div className='campo'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' value={campos.email} onChange={handleChange} placeholder='Tu Email' />
          </div>

          <div className='campo acciones'>
            <Link to='/auth/crear-cuenta'>Crear Cuenta</Link>
            <Link to='/auth/login'>Iniciar Sesión</Link>
          </div>

          <input type='submit' disabled={loading} className='btn btn-azul' value={loading ? 'Recuperando...' : 'Enviar Instruciones'} />
        </form>
      </section>
    </>
  )
}

export default OlvidePasswordPage
