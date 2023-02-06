import { Link } from 'react-router-dom'

const CanceladoPage = () => {
  return (
    <section className='contenedor'>
      <div className='center'>
        <h2>Pago cancelado</h2>
        <p className={`alerta error`}>El pago fue cancelado</p>
        <p>Si crees que esto es un error, por favor vuelva a intentarlo</p>

        <Link to='/planes' className='btn btn-amarillo'>
          Ver Planes
        </Link>
      </div>
    </section>
  )
}

export default CanceladoPage
