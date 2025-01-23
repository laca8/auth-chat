import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
    return user ? <Outlet /> : <Navigate to='/login' />
}
export default ProtectedRoutes