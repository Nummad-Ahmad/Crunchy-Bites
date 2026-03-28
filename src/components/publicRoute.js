import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
    const loggedIn = useSelector(state => state.user.loggedIn);

    return loggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;