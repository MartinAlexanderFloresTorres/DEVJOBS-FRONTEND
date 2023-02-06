import { useState, useEffect } from 'react'
import { get_perfil } from '../services/apis/users'

const useGetAuth = ({ id }) => {
  // ESTADOS
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // FUNCION PARA OBTENER EL PERFIL
  const getPerfil = async ({ id }) => {
    try {
      setError(null)
      setLoading(true)
      const { data } = await get_perfil({ id })
      setPerfil(data)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  // USEEFFECT PARA OBTENER EL PERFIL
  useEffect(() => {
    if (id) {
      getPerfil({ id })
    }
  }, [id])

  return { perfil, setPerfil, loading, error }
}

export default useGetAuth
