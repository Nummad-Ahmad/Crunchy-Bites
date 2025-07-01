import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute2 = () => {
    const user = useSelector(state => state.user.email);
    const loggedIn = useSelector(state => state.user.loggedIn);

    return (loggedIn && user === 'nummad222@gmail.com') ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute2;
