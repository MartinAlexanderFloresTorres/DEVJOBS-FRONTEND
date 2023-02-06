import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Alerta from './Alerta'
import { post_agregar_candidato } from '../services/apis/vacante'

const DEFAULT_STATE = {
  campos: {
    nombre: '',
    email: '',
    cv: '',
    web: ''
  },
  alerta: { msg: '', error: false }
}

const FormCanditado = () => {
  // ESTADOS
  const [loading, setLoading] = useState(false)
  const [campos, setCampos] = useState(DEFAULT_STATE.campos)
  const [alerta, setAlerta] = useState(DEFAULT_STATE.alerta)

  // USEPARAMS
  const { url } = useParams()

  // USENAVIGATE
  const navigate = useNavigate()

  // HANDLECHANGE
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'cv') {
      if (e.target.files[0]) {
        if (e.target.files[0].type !== 'application/pdf') {
          setAlerta({ msg: 'El archivo no es un PDF', error: true })
          return
        }

        if (e.target.files[0].size > 1000000) {
          setAlerta({ msg: 'El archivo es muy grande', error: true })
          return
        }

        setAlerta({ msg: '', error: false })
        setCampos((prev) => ({ ...prev, [name]: e.target.files[0] }))
      }
      return
    }

    setCampos((prev) => ({ ...prev, [name]: value }))
  }

  // HANDLESUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()

    // VALIDAR
    if (campos.nombre.trim() === '') {
      setAlerta((prev) => ({ ...prev, msg: 'El nombre es obligatorio', error: true }))
      return
    }
    if (campos.email.trim() === '') {
      setAlerta((prev) => ({ ...prev, msg: 'El email es obligatorio', error: true }))
      return
    }
    if (campos.web.trim() === '') {
      setAlerta((prev) => ({ ...prev, msg: 'El portafolio web es obligatorio', error: true }))
      return
    }
    if (campos.cv === '') {
      setAlerta((prev) => ({ ...prev, msg: 'El CV es obligatorio', error: true }))
      return
    }

    // ENVIAR
    try {
      setLoading(true)
      setAlerta({ msg: '', error: false })
      const { data } = await post_agregar_candidato({ datos: campos, url })
      setCampos(DEFAULT_STATE.campos)
      setAlerta({ msg: data.msg, error: false })
      setTimeout(() => {
        setAlerta({ msg: '', error: false })
      }, 3000)
      navigate(`/vacantes/${data.vacante.url}`)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setAlerta({ msg, error: true })
    }
    setLoading(false)
  }
  return (
    <>
      <Alerta alerta={alerta} />

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
          <label htmlFor='web'>Portafolio web</label>
          <input type='url' id='web' name='web' value={campos.web} onChange={handleChange} placeholder='Tu web' />
        </div>

        <div className='campo'>
          <label htmlFor='cv'>CV (PDF)</label>
          <label htmlFor='cv' className='campo-foto'>
            <span>{campos.cv ? campos.cv.name : 'Selecciona un archivo'}</span>
            <input type='file' onChange={handleChange} name='cv' accept='application/pdf' id='cv' />
          </label>
        </div>

        <input type='submit' disabled={loading} className='btn btn-azul' value={loading ? 'Postulando...' : 'POSTULAR'} />
      </form>
    </>
  )
}

export default FormCanditado
