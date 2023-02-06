import { createContext, useEffect, useState } from 'react'
import { delete_eliminar, post_perfil } from '../services/apis/users'
import Swal from 'sweetalert2'
import { delete_eliminar_plan } from '../services/apis/pagos'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  // ESTADOS
  const [auth, setAuth] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  // EFFECTO PARA VERIFICAR SI EL USUARIO ESTA LOGUEADO
  useEffect(() => {
    const token = localStorage.getItem('_token_devjobs')

    const login = async () => {
      try {
        if (token) {
          setAuthLoading(true)
          const { data } = await post_perfil({ jwt: token })
          setAuth(data)
        }
      } catch (error) {
        console.log(error)
        const { msg } = error?.response?.data
        setAuthError(msg)
        setAuth(null)
        localStorage.removeItem('_token_devjobs')
      }
      setAuthLoading(false)
    }

    login()
  }, [])

  // HANDLE LOGIN
  const handleLogin = (data) => {
    setAuth(data)
  }

  // HANDLE LOGOUT
  const handleLogout = () => {
    Swal.fire({
      title: '¿Desea cerrar sesion?',
      showCancelButton: true,
      confirmButtonText: 'Cerrar sesion',
      customClass: {
        cancelButton: 'btn btn-rojo',
        confirmButton: 'btn btn-verde'
      },
      icon: 'question',
      buttonsStyling: false
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setAuth(null)
        localStorage.removeItem('_token_devjobs')
        Swal.fire({
          title: 'Sesion cerrada',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-verde'
          },
          buttonsStyling: false
        })
      }
    })
  }

  // HANDLE ELIMINAR USUARIO
  const handleEliminarUser = () => {
    Swal.fire({
      title: '¿Desea eliminar su cuenta?',
      text: 'Se eliminara toda la informacion de su cuenta, Se eliminara sus vacantes y postulaciones, Se le quitara el acceso a su cuenta y sus datos no podran ser recuperados.',
      showCancelButton: true,
      confirmButtonText: 'Eliminar cuenta',
      customClass: {
        cancelButton: 'btn btn-rojo',
        confirmButton: 'btn btn-gris'
      },
      icon: 'warning',
      buttonsStyling: false
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        ;(async () => {
          try {
            const { data } = await delete_eliminar()
            Swal.fire({
              title: 'Cuenta eliminada',
              text: data.msg,
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-verde'
              },
              buttonsStyling: false
            })
            setAuth(null)
            localStorage.removeItem('_token_devjobs')
          } catch (error) {
            console.log(error)
            const { msg } = error?.response?.data
            Swal.fire({
              title: 'Error',
              text: msg,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-verde'
              },
              buttonsStyling: false
            })
          }
        })()
      }
    })
  }

  // HANDLE ELIMINAR USUARIO
  const handleCancelarPlan = () => {
    Swal.fire({
      title: '¿Desea cancelar su plan?',
      text: 'Se cancelara su plan, Se eliminara sus vacantes y postulaciones, Se le establecera el plan gratuito. No se permite rembolsos.',
      showCancelButton: true,
      confirmButtonText: 'Cancelar plan',
      customClass: {
        cancelButton: 'btn btn-rojo',
        confirmButton: 'btn btn-gris'
      },
      icon: 'warning',
      buttonsStyling: false
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        ;(async () => {
          try {
            const { data } = await delete_eliminar_plan({ id: auth._id })

            Swal.fire({
              title: 'Plan cancelado con exito',
              text: data.msg,
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-verde'
              },
              buttonsStyling: false
            })

            setAuth(data.usuario)
          } catch (error) {
            console.log(error)
            const { msg } = error?.response?.data
            Swal.fire({
              title: 'Error',
              text: msg,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-verde'
              },
              buttonsStyling: false
            })
          }
        })()
      }
    })
  }

  return <AuthContext.Provider value={{ auth, authLoading, authError, handleEliminarUser, handleCancelarPlan, handleLogin, handleLogout }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
export default AuthProvider
