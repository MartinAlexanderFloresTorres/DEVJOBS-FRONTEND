const Alerta = ({ alerta }) => {
  return <div className='alertas contenedor'>{alerta.msg && <p className={`alerta ${alerta.error ? 'error' : 'correcto'}`}>{alerta.msg}</p>}</div>
}

export default Alerta
