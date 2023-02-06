import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Alerta from './Alerta'
import { delete_candidato, post_estado_candidato } from '../services/apis/vacante'
import useAuth from '../hooks/useAuth'

const Candidato = ({ setCandidatos, candidato, vacante }) => {
  // ESTADOS
  const [loadingEstado, setLoadingEstado] = useState(false)
  const [loadingEliminar, setLoadingEliminar] = useState(false)
  const [alerta, setAlerta] = useState({ msg: '', error: false })

  // USEPARAMS
  const { url } = useParams()

  // USEAUTH
  const { auth } = useAuth()

  // HANDLE PARA ACEPTAR O RECHAZAR CANDIDATO
  const handleCandidato = async ({ url, id, aceptado }) => {
    Swal.fire({
      title: '¿Estas seguro de esta acción?',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      customClass: {
        cancelButton: 'btn btn-rojo',
        confirmButton: 'btn btn-verde'
      },
      icon: 'warning',
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        ;(async () => {
          try {
            setAlerta({ msg: '', error: false })
            setLoadingEstado(true)
            const { data } = await post_estado_candidato({ url, id, aceptado })
            setCandidatos(data)
            setAlerta({ msg: `Se envio en email al candidato indicandole que fue ${aceptado ? 'Aceptado' : 'Rechazado'}`, error: false })
          } catch (error) {
            console.log(error)
            const { msg } = error?.response?.data
            setAlerta({ msg, error: true })

            setTimeout(() => {
              setAlerta({ msg: '', error: false })
            }, 3000)
          }
          setLoadingEstado(false)
        })()
      }
    })
  }

  // HANDLE PARA ELIMINAR CANDIDATO
  const handleEliminarCandidato = async ({ url, id }) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar este candidato?',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      customClass: {
        cancelButton: 'btn btn-rojo',
        confirmButton: 'btn btn-verde'
      },
      icon: 'warning',
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        ;(async () => {
          try {
            setAlerta({ msg: '', error: false })
            setLoadingEliminar(true)
            const { data } = await delete_candidato({ url, id })
            setCandidatos(data)
            setAlerta({ msg: 'Candidato eliminado', error: false })
          } catch (error) {
            console.log(error)
            const { msg } = error?.response?.data
            setAlerta({ msg, error: true })

            setTimeout(() => {
              setAlerta({ msg: '', error: false })
            }, 3000)
          }
          setLoadingEliminar(false)
        })()
      }
    })
  }

  return (
    <>
      {alerta.msg && <Alerta alerta={alerta} />}

      <div className='candidato' key={candidato._id}>
        <div className='caja'>
          {candidato.isEstadoCambiado && (candidato.aceptado ? <p className='correcto'>Aceptado</p> : <p className='error'>Rechazado</p>)}
          <p className='etiqueta'>Nombre:</p>
          <p className='nombre'>{candidato.nombre}</p>
        </div>
        <div className='caja'>
          <p className='etiqueta'>Email:</p>
          <a className='email' href={`mailto:${candidato.email}`}>
            {candidato.email}
          </a>
        </div>

        <div className='caja'>
          <p className='etiqueta'>Portafolio</p>
          <a className='web' href={candidato.web} target='_blank' rel='noopener'>
            {candidato.web}
          </a>
        </div>
        <div className='botones'>
          <a className='btn btn-azul' href={candidato.cv.secure_url} target='_blank' rel='noopener'>
            Ver CV
          </a>

          {auth?.plan !== 1 && (
            <button className='btn btn-rojo' onClick={() => handleEliminarCandidato({ url, id: candidato._id })}>
              {loadingEliminar ? 'Cargando...' : 'Eliminar'}
            </button>
          )}

          {!candidato.isEstadoCambiado && vacante.requeridos > 0 && (
            <>
              <button disabled={loadingEstado} className={`btn btn-rojo`} onClick={() => handleCandidato({ url, id: candidato._id, aceptado: false })}>
                Rechazar
              </button>

              <button disabled={loadingEstado} className={`btn btn-verde`} onClick={() => handleCandidato({ url, id: candidato._id, aceptado: true })}>
                Aceptar
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Candidato
