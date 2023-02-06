const Encabezado = ({ titulo, descripcion, children }) => {
  return (
    <section className='site-header separador'>
      <h2>{titulo}</h2>
      {descripcion && <p>{descripcion}</p>}
      {children}
    </section>
  )
}

Encabezado.defaultProps = {
  titulo: '',
  descripcion: ''
}

export default Encabezado
