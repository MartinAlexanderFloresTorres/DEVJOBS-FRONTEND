import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { post_editar } from '../../../services/apis/users'
import Alerta from '../../../components/Alerta'
import useAuth from '../../../hooks/useAuth'
import Swal from 'sweetalert2'
import Encabezado from '../../../components/Encabezado'
import LoaderSvg from '../../../components/LoaderSvg'

const DEFAULT_STATE = {
  campos: {
    nombre: '',
    email: '',
    password: '',
    password2: '',
    password3: '',
    foto: {
      public_id: '',
      secure_url: '',
      original_filename: '',
      file: ''
    }
  },
  alerta: {
    error: false,
    msg: ''
  }
}

const EditarPerfilPage = () => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_STATE.campos)
  const [alerta, setAlerta] = useState(DEFAULT_STATE.alerta)
  const [checkPassword, setCheckPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // USEAUTH
  const { auth, authLoading, handleLogin } = useAuth()

  // USENAVIGATE
  const navigate = useNavigate()

  // USELOCATION
  const { state } = useLocation()

  // EFECTO PARA LLENAR LOS CAMPOS
  useEffect(() => {
    if (auth) {
      setCampos({ ...campos, nombre: auth.nombre, email: auth.email, foto: auth.foto })
    }
  }, [auth])

  // HANDLE CHANGE CAMPOS
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'foto') {
      if (e.target.files[0]) {
        const file = e.target.files[0]
        const secure_url = URL.createObjectURL(file)

        setCampos((prevState) => ({ ...prevState, foto: { ...prevState.foto, secure_url, file } }))
      }

      return
    }

    setCampos((prevState) => ({ ...prevState, [name]: value }))
  }

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Validar
    if (campos.nombre.trim() === '') {
      setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El nombre es obligatorio' }))
      return
    } else {
      setAlerta((prevState) => ({ ...prevState, error: false, msg: '' }))
    }

    if (campos.email.trim() === '') {
      setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El email es obligatorio' }))
      return
    } else if (!/\S+@\S+\.\S+/.test(campos.email)) {
      setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El email no es válido' }))
      return
    } else {
      setAlerta((prevState) => ({ ...prevState, error: false, msg: '' }))
    }

    if (checkPassword) {
      if (campos.password.trim() === '') {
        setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El password es obligatorio' }))
        return
      } else if (campos.password.length < 6) {
        setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El password debe tener al menos 6 caracteres' }))
        return
      } else {
        setAlerta((prevState) => ({ ...prevState, error: false, msg: '' }))
      }

      if (campos.password2.trim() === '') {
        setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El password nuevo es obligatorio' }))
        return
      } else if (campos.password2.length < 6) {
        setAlerta((prevState) => ({ ...prevState, error: true, msg: 'El password nuevo debe tener al menos 6 caracteres' }))
        return
      } else {
        setAlerta((prevState) => ({ ...prevState, error: false, msg: '' }))
      }

      if (campos.password2 !== campos.password3) {
        setAlerta((prevState) => ({ ...prevState, error: true, msg: 'Los passwords nuevos no coinciden' }))
        return
      } else {
        setAlerta((prevState) => ({ ...prevState, error: false, msg: '' }))
      }
    }

    // Enviar
    try {
      setLoading(true)
      const { data } = await post_editar({ datos: { ...campos, checkPassword } })
      const { msg, user } = data
      setCampos(DEFAULT_STATE.campos)
      handleLogin(user)
      Swal.fire({
        title: 'Perfil Actualizado',
        text: msg,
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-verde'
        },
        buttonsStyling: false,
        confirmButtonText: 'Entendido'
      })

      // Redireccionar
      navigate(`/perfil/${user._id}`)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setAlerta((prevState) => ({ ...prevState, error: true, msg }))
    }
    setLoading(false)
  }

  if (authLoading) return null

  return (
    <>
      <Encabezado titulo={`Hola ${auth.nombre}`} descripcion='Edita tu perfil aquí' />

      <Alerta alerta={alerta} />

      <div className='botones'>
        <Link to={state ? state.pathname : '/admin'} className='btn btn-azul'>
          Volver
        </Link>
      </div>

      <section className='contenedor'>
        <form className='default-form' onSubmit={handleSubmit} encType='multipart/form-data'>
          <img className='campo-imagen' src={campos?.foto?.secure_url} alt='foto' />
          <div className='campo'>
            <label htmlFor='foto'>Foto</label>
            <label className='campo-foto'>
              {campos?.foto?.secure_url ? 'Cambiar Foto' : 'Seleccionar Foto'}
              <input type='file' accept='image/*' id='foto' name='foto' onChange={handleChange} />
            </label>
          </div>

          <div className='campo'>
            <label htmlFor='nombre'>Nombre</label>
            <input type='text' id='nombre' name='nombre' value={campos.nombre} onChange={handleChange} placeholder='Tu Nombre' />
          </div>

          <div className='campo'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' value={campos.email} onChange={handleChange} placeholder='Tu Email' />
          </div>

          <div className='campo'>
            <label htmlFor='password'>Password Actual</label>
            <input type='password' id='password' name='password' value={campos.password} onChange={handleChange} placeholder='Tu Password' />
          </div>

          <div className='campo'>
            <label htmlFor='password2'>Password Nuevo</label>
            <input type='password' id='password2' name='password2' value={campos.password2} onChange={handleChange} placeholder='Tu Password' />
          </div>

          <div className='campo'>
            <label htmlFor='password3'>Repetir Password</label>
            <input type='password' id='password3' name='password3' value={campos.password3} onChange={handleChange} placeholder='Repite tu Password' />
          </div>

          <div className='campo acciones'>
            <label htmlFor='ckeckPassword'>Cambiar Password</label>
            <input type='checkbox' id='ckeckPassword' checked={checkPassword} name='ckeckPassword' onChange={() => setCheckPassword(!checkPassword)} />
          </div>

          <input type='submit' className='btn btn-azul' value={loading ? 'Guardando...' : 'Guardar cambios'} />
        </form>
      </section>
    </>
  )
}

export default EditarPerfilPage
