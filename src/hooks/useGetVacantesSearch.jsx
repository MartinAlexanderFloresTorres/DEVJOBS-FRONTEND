import { useState, useEffect } from 'react'
import { get_buscar_vacantes } from '../services/apis/vacante'

const useGetVacantesSearch = ({ query }) => {
  // ESTADOS
  const [vacantes, setVacantes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // FUNCION PARA OBTENER LAS VACANTES
  const getVacantes = async ({ query }) => {
    try {
      setLoading(true)
      const { data } = await get_buscar_vacantes({ query })
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
    getVacantes({ query })
  }, [query])

  return { vacantes, setVacantes, loading, error }
}

export default useGetVacantesSearch
