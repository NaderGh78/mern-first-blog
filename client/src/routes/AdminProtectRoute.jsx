import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminProtectRoute = () => {

    const { user } = useSelector((state) => state.auth);

    /*===========================================*/

    return user && user.isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    );
}

export default AdminProtectRoute;