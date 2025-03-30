import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const email = user?.email || null; 

    return email ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
