import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const user = useSelector(state => state.user.loggedIn);
    console.log(user);
    user ? <Outlet /> : <Navigate to="/login" replace />;

};

export default ProtectedRoute;
