import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { delete_eliminar } from '../services/apis/vacante'

const useDeletVacante = ({ url }) => {
  // ESTADOS
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // USENAVIGATE
  const navigate = useNavigate()

  // HANDLE ELIMINAR
  const handleEliminar = async () => {
    Swal.fire({
      title: '¿Estas seguro de eliminar esta vacante?',
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
            setLoading(true)
            await delete_eliminar({ url })
            // Redireccionar
            navigate('/')

            Swal.fire({
              title: 'Vacante eliminada',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-verde'
              },
              buttonsStyling: false
            })
          } catch (error) {
            console.log(error)
            const { msg } = error?.response?.data
            setError(msg)
          }
          setLoading(false)
        })()
      }
    })
  }

  return { handleEliminar, loading, error }
}

export default useDeletVacante
