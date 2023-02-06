import ClienteAxios from '../../../config/ClienteAxios'

export const post_crear = async (vacante) => {
  const jwt = localStorage.getItem('_token_devjobs')
  return await ClienteAxios.post('/vacantes/crear', vacante, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
}

export const post_editar = async ({ vacante, url }) => {
  const jwt = localStorage.getItem('_token_devjobs')
  return await ClienteAxios.post(`/vacantes/editar/${url}`, vacante, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
}

export const delete_eliminar = async ({ url }) => {
  const jwt = localStorage.getItem('_token_devjobs')
  return await ClienteAxios.delete(`/vacantes/eliminar/${url}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
}

export const get_vacantes = async () => {
  return await ClienteAxios.get('/vacantes/mostrar')
}

export const get_vacantes_creador = async () => {
  const jwt = localStorage.getItem('_token_devjobs')

  return await ClienteAxios.get('/vacantes/mostrar/creador', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
}

export const get_vacante = async ({ url }) => {
  return await ClienteAxios.get(`/vacantes/mostrar/${url}`)
}

export const post_agregar_candidato = async ({ datos, url }) => {
  const formData = new FormData()
  formData.append('nombre', datos.nombre)
  formData.append('email', datos.email)
  formData.append('web', datos.web)
  formData.append('file', datos.cv)

  return await ClienteAxios.post(`/vacantes/agregar-candidato/${url}`, formData)
}

export const get_candidatos = async ({ url }) => {
  const jwt = localStorage.getItem('_token_devjobs')

  return await ClienteAxios.get(`/vacantes/mostrar-candidatos/${url}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
}

export const delete_candidato = async ({ url, id }) => {
  const jwt = localStorage.getItem('_token_devjobs')

  return await ClienteAxios.delete(`/vacantes/eliminar-candidato/${url}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    data: { id }
  })
}

export const post_estado_candidato = async ({ url, id, aceptado }) => {
  const jwt = localStorage.getItem('_token_devjobs')

  return await ClienteAxios.post(
    `/vacantes/estado-candidato/${url}`,
    { id, aceptado },
    {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  )
}

export const get_buscar_vacantes = async ({ query }) => {
  return await ClienteAxios(`/vacantes/buscar/${query}`)
}
