import { Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const LayoutAdmin = () => {
  // USEAUTH
  const { authLoading, auth } = useAuth()

  // USELOCATION
  const location = useLocation()

  if (authLoading) {
    return null
  }

  return auth ? <Outlet /> : <Navigate to='/auth/login' state={location} />
}

export default LayoutAdmin
