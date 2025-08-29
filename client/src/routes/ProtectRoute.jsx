import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const ProtectRoute = () => {
    const { user } = useSelector((state) => state.auth);
    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectRoute;