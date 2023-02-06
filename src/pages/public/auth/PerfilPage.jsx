import { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Encabezado from '../../../components/Encabezado'
import useAuth from '../../../hooks/useAuth'
import useGetAuth from '../../../hooks/useGetAuth'
import LoaderSvg from '../../../components/LoaderSvg'
import { PremiumSvg } from '../../../assets/svgs'
import { delete_eliminar_plan } from '../../../services/apis/pagos'
import Alerta from '../../../components/Alerta'
import Swal from 'sweetalert2'

const PerfilPage = () => {
  // ESTADOS
  const [alerta, setAlerta] = useState({ msg: '', error: false })

  // USEPARAMS
  const { id } = useParams()

  // USEAUTH
  const { auth, handleCancelarPlan, handleEliminarUser } = useAuth()

  // USEGETAUTH
  const { perfil, loading, error } = useGetAuth({ id })

  // USELOCATION
  const location = useLocation()

  if (error) {
    return (
      <section className='contenedor'>
        <div className='center'>
          <h2>Perfil no encontrado</h2>
          <p className={`alerta error`}>{error}</p>
          <p>Intenta con otro perfil</p>

          <Link to='/' className='btn btn-azul'>
            Ir al Inicio
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <Alerta alerta={alerta} />

      <Encabezado titulo={'Perfil'} descripcion={'Perfil de usuario'} />

      {loading ? (
        <LoaderSvg />
      ) : (
        perfil && (
          <div className='perfil contenedor'>
            {perfil?.foto && perfil?.foto?.secure_url && <img src={perfil.foto.secure_url} className='perfil-imagen' alt='Perfil' />}

            {perfil.plan === 4 && (
              <div className='perfil-plan'>
                <h2>Plan Enterprise</h2>
                <img src='/enterprise.svg' alt='Enterprise' />
              </div>
            )}

            {perfil.plan === 3 && (
              <div className='perfil-plan'>
                <h2>Plan Premium</h2>
                <PremiumSvg />
              </div>
            )}

            {perfil.plan === 2 && (
              <div className='perfil-plan'>
                <h2>Plan Basico</h2>
              </div>
            )}

            {perfil.plan === 1 && (
              <div className='perfil-plan'>
                <h2>Plan Free</h2>
              </div>
            )}

            <div className='perfil-info'>
              <h2>{perfil.nombre}</h2>
              <a href={`mailto:${perfil.email}`}>{perfil.email}</a>
            </div>

            {auth && auth._id === id && (
              <div className='botones'>
                <Link to='/admin/perfil/editar' state={location} className='btn btn-azul'>
                  Editar Perfil
                </Link>
                <button className='btn btn-rojo' onClick={handleEliminarUser}>
                  Eliminar Perfil
                </button>

                {auth.plan !== 1 && (
                  <button className='btn btn-gris' onClick={handleCancelarPlan}>
                    Cancelar Plan
                  </button>
                )}
              </div>
            )}
          </div>
        )
      )}
    </>
  )
}

export default PerfilPage
