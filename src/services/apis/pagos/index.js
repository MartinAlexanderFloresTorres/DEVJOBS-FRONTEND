import ClienteAxios from '../../../config/ClienteAxios'

export const post_crear_orden = async ({ plan, precio, descripcion }) => {
  const jwt = localStorage.getItem('_token_devjobs')

  return await ClienteAxios.post(
    '/pagos/crear-orden',
    { plan, precio, descripcion },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    }
  )
}

export const post_capturar_orden = async ({ token, PayerID }) => {
  const jwt = localStorage.getItem('_token_devjobs')
  return await ClienteAxios.post(
    '/pagos/capturar-orden',
    { token, PayerID },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    }
  )
}

export const delete_eliminar_plan = async ({ id }) => {
  const jwt = localStorage.getItem('_token_devjobs')
  return await ClienteAxios.delete(`/pagos/eliminar-plan/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    }
  })
}
