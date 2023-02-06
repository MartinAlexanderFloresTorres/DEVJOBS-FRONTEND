import { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate, Navigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { TrixEditor } from 'react-trix'
import useGetVacante from '../../../hooks/useGetVacante'
import skills from '../../../constants/skills'
import { post_editar } from '../../../services/apis/vacante'
import Encabezado from '../../../components/Encabezado'
import LoaderSvg from '../../../components/LoaderSvg'
import Alerta from '../../../components/Alerta'
import useAuth from '../../../hooks/useAuth'

const DEFAULT_STATE = {
  campos: {
    titulo: '',
    empresa: '',
    ubicacion: '',
    salario: '',
    contrato: '',
    descripcion: '',
    requeridos: 1,
    skills: []
  },
  alerta: { msg: '', error: false }
}

const EditarVacantePage = () => {
  // ESTADO PARA CAMPOS DEL FORMULARIO
  const [campos, setCampos] = useState(DEFAULT_STATE.campos)
  const [skill, setSkill] = useState('')
  const [newSkills, setNewSkills] = useState([])
  const [alerta, setAlerta] = useState(DEFAULT_STATE.alerta)
  const [loadingEdit, setLoadingEdit] = useState(false)

  // USENAVIGATE PARA REDIRECCIONAR
  const navigate = useNavigate()

  // USELOCATION
  const { state } = useLocation()

  // USE REF PARA EL EDITOR
  const editorRef = useRef()

  // USEPARAMS
  const { url } = useParams()

  // USEAUTH
  const { auth } = useAuth()

  // USEGETVACANTE
  const { vacante, loading, error } = useGetVacante({ url })

  // EVENTO PARA CAMBIAR EL ESTADO DE LOS CAMPOS
  useEffect(() => {
    if (vacante) {
      // MAPPING DE LOS SKILLS
      const _skills = vacante.skills.map((skill) => ({
        id: skill.id,
        nombre: skill.nombre
      }))

      // INSERTAR LOS CAMPOS EN EL ESTADO
      setCampos((prevState) => ({ ...prevState, ...vacante, _skills }))

      // NUEVO ARRAY DE SKILLS MAPEADO
      const newSkill = [...skills, ...vacante.skills].map((skill) => ({
        id: skill.id,
        nombre: skill.nombre
      }))

      // NUEVO ARRAY DE SKILLS FILTRADO SIN REPETIDOS
      const filtrados = newSkill.reduce((acc, cur) => {
        // SI NO ENCUENTRA EL ID EN EL ARRAY, LO AGREGA
        if (!acc.find((s) => s.id === cur.id)) {
          acc.push(cur)
        }

        // RETORNA EL ARRAY
        return acc
      }, [])

      setNewSkills(filtrados)

      // INSERTAR LA DESCRIPCION EN EL EDITOR
      if (editorRef.current) {
        editorRef.current.insertHTML(vacante.descripcion)
      }
    }
  }, [vacante])

  // EVENTO PARA CAMBIAR EL ESTADO DE LOS CAMPOS
  const handleChange = (e) => {
    const { name, value } = e.target
    setCampos((prevState) => ({ ...prevState, [name]: value.trimStart() }))
  }

  // AGREGAR NUEVO SCRILL
  const addSkill = () => {
    if (skill.trim() === '') return

    const newSkill = { id: Date.now(), nombre: skill }

    // VALIDAR QUE EL SKILL NO ESTE EN EL ARRAY
    if (selectedSkillIds.includes(newSkill.id) || newSkills.find((s) => s.nombre.toLowerCase() === newSkill.nombre.toLowerCase())) {
      setAlerta({ msg: 'El skill ya está entre los skills', error: true })
      return
    }
    setNewSkills((prevState) => [...prevState, newSkill])
    setSkill('')
  }

  // EVENTO PARA CAMBIAR EL ESTADO DE LA DESCRIPCION
  const handleChangeDescripcion = (html, text) => {
    setCampos((prevState) => ({ ...prevState, descripcion: html }))
  }

  // EVENTO PARA AGREGAR EL EDITOR
  const handleEditorReady = (editor) => {
    editorRef.current = editor
  }

  // SKILLS SELECCIONADOS
  const selectedSkillIds = campos.skills.map((skill) => skill.id)

  // EVENTO PARA AGREGAR O QUITAR UN SKILL
  const toggleSkill = ({ skill }) => {
    const { skills } = campos
    // SI EL SKILL YA ESTA EN EL ARRAY, LO QUITAMOS
    if (selectedSkillIds.includes(skill.id)) {
      const newSkills = skills.filter((s) => s.id !== skill.id)
      setCampos((prevState) => ({ ...prevState, skills: newSkills }))
    } else {
      setCampos((prevState) => ({ ...prevState, skills: [...skills, skill] }))
    }
  }

  // EVENTO PARA ENVIAR EL FORMULARIO
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loadingEdit) return

    // Validar
    if (campos.empresa.trim() === '') {
      setAlerta({ msg: 'El nombre de la empresa es obligatorio', error: true })
      return
    }

    if (campos.titulo.trim() === '') {
      setAlerta({ msg: 'El título de la vacante es obligatorio', error: true })
      return
    }

    if (campos.ubicacion.trim() === '') {
      setAlerta({ msg: 'La ubicación de la vacante es obligatoria', error: true })
      return
    }

    if (campos.contrato.trim() === '') {
      setAlerta({ msg: 'El tipo de contrato es obligatorio', error: true })
      return
    }

    if (campos.salario.trim() === '') {
      setAlerta({ msg: 'El salario de la vacante es obligatorio', error: true })
      return
    }

    if (campos.salario < 10) {
      setAlerta({ msg: 'El salario debe ser mayor a 10', error: true })
      return
    }

    if (campos.requeridos < 1) {
      setAlerta({ msg: 'El número de requeridos debe ser mayor a 0', error: true })
      return
    }

    if (campos.descripcion.trim() === '') {
      setAlerta({ msg: 'La descripción de la vacante es obligatoria', error: true })
      return
    }

    if (campos.descripcion.length < 50) {
      setAlerta({ msg: 'La descripción debe tener al menos 50 caracteres', error: true })
      return
    }

    if (campos.skills.length === 0) {
      setAlerta({ msg: 'Debe seleccionar al menos un skill', error: true })
      return
    }

    // limpiar alerta
    setAlerta({ msg: '', error: false })

    // Enviar
    try {
      setLoadingEdit(true)
      const { data } = await post_editar({ vacante: campos, url })
      navigate(`/vacantes/${data.url}`)
      Swal.fire({
        title: 'Vacante editada correctamente',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-verde'
        },
        buttonsStyling: false,
        confirmButtonText: 'Entendido'
      })
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setAlerta({ msg, error: true })
    }
    setLoadingEdit(false)
  }

  if (loading) {
    return <LoaderSvg />
  }

  if (error) {
    return (
      <section className='contenedor'>
        <div className='center'>
          <h2>Candidato no encontrado</h2>
          <p className={`alerta error`}>{error}</p>
          <p>No existe el candidato que buscas</p>

          <Link to={state ? state.pathname : '/'} className='btn btn-azul'>
            Volver
          </Link>
        </div>
      </section>
    )
  }

  if (!vacante) return null

  if (vacante.creador._id !== auth._id) return <Navigate to='/' />

  return (
    <>
      <Encabezado titulo={`Editar Vacante (${vacante.titulo})`} descripcion='Edita la vacante y publica los cambios' />

      <Alerta alerta={alerta} />

      <div className='botones'>
        <Link to={state ? state.pathname : '/'} className='btn btn-verde'>
          Volver
        </Link>
      </div>

      <form className='default-form' onSubmit={handleSubmit}>
        <h3>Información General</h3>

        <div className='campo'>
          <label htmlFor='titulo'>Titulo</label>
          <input type='text' id='titulo' name='titulo' value={campos.titulo} onChange={handleChange} placeholder='Ej: React Developer' />
        </div>

        <div className='campo'>
          <label htmlFor='empresa'>Empresa</label>
          <input type='text' id='empresa' name='empresa' value={campos.empresa} onChange={handleChange} placeholder='Facebook' />
        </div>

        <div className='campo'>
          <label htmlFor='ubicacion'>Ubicacion</label>
          <input type='text' id='ubicacion' name='ubicacion' value={campos.ubicacion} onChange={handleChange} placeholder='Ej: Perú o Remoto' />
        </div>

        <div className='campo'>
          <label htmlFor='salario'>Salario (USD)</label>
          <input type='number' id='salario' name='salario' value={campos.salario} onChange={handleChange} placeholder='Ej: $500 USD' />
        </div>

        <div className='campo'>
          <label htmlFor='requeridos'>Vacantes Requeridos</label>
          <input type='number' id='requeridos' name='requeridos' value={campos.requeridos} onChange={handleChange} placeholder='Ej: 5' />
        </div>

        <div className='campo'>
          <label htmlFor='contrato'>Contrato</label>
          <select name='contrato' id='contrato' value={campos.contrato} onChange={handleChange}>
            <option value='' disabled>
              -- Selecciona --
            </option>
            <option value='freelancer'>Freelancer</option>
            <option value='completo'>Tiempo Completo</option>
            <option value='medio'>Medio Tiempo</option>
            <option value='proyecto'>Por Proyecto</option>
          </select>
        </div>

        <h3>Descripción del Puesto</h3>
        <div className='campo descripcion'>
          <label htmlFor='descripcion'>Descripción</label>
          <TrixEditor onChange={handleChangeDescripcion} onEditorReady={handleEditorReady} />
        </div>

        <h3>Requerimientos y Conocimientos</h3>
        <h4>Nuevo Conocimiento</h4>
        <div className='campo descripcion'>
          <input type='text' value={skill} onChange={(e) => setSkill(e.target.value.trimStart())} />
          <button className='btn btn-verde' onClick={addSkill} type='button'>
            Agregar
          </button>
        </div>
        <ul className='lista-conocimientos'>
          {newSkills.map((skill) => (
            <li key={skill.id} className={`conocimiento ${selectedSkillIds.includes(skill.id) ? 'activo' : ''}`} onClick={() => toggleSkill({ skill })}>
              {skill.nombre}
            </li>
          ))}
        </ul>

        <div className='campo centrar-horizontal'>
          <input type='submit' value={loadingEdit ? 'Guardando...' : 'Guardar'} className='btn btn-azul' />
        </div>
      </form>
    </>
  )
}

export default EditarVacantePage
