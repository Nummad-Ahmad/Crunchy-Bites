import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute2 = () => {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const email = user?.email || null; 

    return email == 'nummad222@gmail.com' ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute2;
