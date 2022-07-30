import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
    const authorization = useSelector((state) => state.authorization);
    return(
        authorization.isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes