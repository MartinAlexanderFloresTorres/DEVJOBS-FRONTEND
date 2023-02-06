import { useState, useEffect } from 'react'
import { get_vacante } from '../services/apis/vacante'

const useGetVacante = ({ url }) => {
  // ESTADOS
  const [vacante, setVacante] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // FUNCION PARA OBTENER LA VACANTE
  const getVacantes = async ({ url }) => {
    try {
      setLoading(true)
      const { data } = await get_vacante({ url })
      setVacante(data)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  // USEEFFECT PARA OBTENER LA VACANTE
  useEffect(() => {
    if (url) {
      getVacantes({ url })
    }
  }, [])

  return { vacante, setVacante, loading, error }
}

export default useGetVacante
