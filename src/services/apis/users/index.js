import ClienteAxios from '../../../config/ClienteAxios'

export const post_crear = async ({ datos }) => {
  return await ClienteAxios.post('/usuarios/crear', datos)
}

export const get_confirmar = async ({ token }) => {
  return await ClienteAxios.get(`/usuarios/confirmar/${token}`)
}

export const post_editar = async ({ datos }) => {
  const jwt = localStorage.getItem('_token_devjobs')

  const formData = new FormData()
  formData.append('nombre', datos.nombre)
  formData.append('email', datos.email)
  formData.append('password', datos.password)
  formData.append('password2', datos.password2)
  formData.append('password3', datos.password3)
  formData.append('checkPassword', datos.checkPassword)

  if (datos?.foto?.file) formData.append('file', datos.foto.file)

  return await ClienteAxios.post(`/usuarios/editar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${jwt}`
    }
  })
}

export const delete_eliminar = async () => {
  const jwt = localStorage.getItem('_token_devjobs')
  return await ClienteAxios.delete(`/usuarios/eliminar`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
}

export const post_recuperacion = async ({ datos }) => {
  return await ClienteAxios.post('/usuarios/recuperacion', datos)
}

export const post_restablecer = async ({ datos, token }) => {
  return await ClienteAxios.post(`/usuarios/restablecer/${token}`, datos)
}

export const get_verificarToken = async ({ token }) => {
  return await ClienteAxios.get(`/usuarios/verificarToken/${token}`)
}

export const post_login = async ({ datos }) => {
  return await ClienteAxios.post('/usuarios/login', datos)
}

export const post_perfil = async ({ jwt }) => {
  return await ClienteAxios.get('/usuarios/perfil', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
}

export const get_perfil = async ({ id }) => {
  return await ClienteAxios.get(`/usuarios/perfil/obtener/${id}`)
}
