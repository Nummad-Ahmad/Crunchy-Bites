import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
        console.log("RES")
        const loadingToast = toast.loading("Verifing ...");
        axios.get(`${process.env.REACT_APP_BACK_END}/verify-token`, {
            withCredentials: true
        }).then(res => {
            toast.dismiss(loadingToast);
            setAuthorized(true);
            console.log("Yes")
        }).catch(err => {
            console.log('err', err);
            toast.dismiss(loadingToast);
            setAuthorized(false);
        })
    }, []);
    
    return authorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
