import { useState, useEffect } from 'react'
import { get_vacantes_creador } from '../services/apis/vacante'

const useGetVacantesCreador = () => {
  // ESTADOS
  const [vacantes, setVacantes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // FUNCION PARA OBTENER LAS VACANTES
  const getVacantes = async () => {
    try {
      setLoading(true)
      const { data } = await get_vacantes_creador()
      setVacantes(data)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  // USEEFFECT PARA OBTENER LAS VACANTES
  useEffect(() => {
    getVacantes()
  }, [])

  return { vacantes, setVacantes, loading, error }
}

export default useGetVacantesCreador
