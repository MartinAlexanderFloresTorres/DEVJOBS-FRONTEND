import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <section className='contenedor'>
      <div className='center'>
        <h2>Pagina no encontrada</h2>
        <p className={`alerta error`}>404</p>
        <p>No existe la pagina que buscas</p>

        <Link to='/' className='btn btn-azul'>
          Ir al inicio
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage
