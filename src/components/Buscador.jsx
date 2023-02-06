import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Buscador = () => {
  // ESTADOS
  const [query, setQuery] = useState('')

  // USENAVIGATE
  const navigate = useNavigate()

  // HANDLECHANGE
  const handleChange = (e) => {
    const { value } = e.target

    // VALIDAR
    const regex = /^[a-zA-Z0-9 ]*$/ // SOLO PERMITE LETRAS Y NUMEROS

    // SI ES VALIDO
    if (regex.test(value)) {
      setQuery(value)
    }
  }
  // HANDLESUBMIT
  const handleSubmit = (e) => {
    e.preventDefault()

    // VALIDAR
    if (query.trim() === '') return

    // REDIRECCIONAR
    navigate(`/search/${query}`)
  }
  return (
    <div className='contenedor buscador'>
      <form onSubmit={handleSubmit}>
        <input type='text' value={query} onChange={handleChange} className='buscar' placeholder='Buscar' />
        <input type='submit' value='Buscar' />
      </form>
    </div>
  )
}

export default Buscador
