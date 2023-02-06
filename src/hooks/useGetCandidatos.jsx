import { useState, useEffect } from 'react'
import { get_candidatos } from '../services/apis/vacante'

const useGetCandidatos = ({ url }) => {
  // ESTADOS
  const [candidatos, setCandidatos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // FUNCION PARA OBTENER LOS CANDIDATOS
  const getCandidatos = async () => {
    try {
      setLoading(true)
      const { data } = await get_candidatos({ url })
      setCandidatos(data)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  // USEEFFECT PARA OBTENER LOS CANDIDATOS
  useEffect(() => {
    getCandidatos()
  }, [])

  return { candidatos, setCandidatos, loading, error }
}

export default useGetCandidatos
