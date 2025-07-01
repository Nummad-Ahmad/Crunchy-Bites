import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute2 = () => {
    const user = useSelector(state => state.user.email);
    const loggedIn = useSelector(state => state.user.loggedIn);

    return (loggedIn && user === 'nmmad222@gmail.com') ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute2;
