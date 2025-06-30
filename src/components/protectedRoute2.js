// ProtectedRoute2.js
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute2 = () => {
    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
        const loadingToast = toast.loading("Verifing ...");
        axios.get(`${process.env.REACT_APP_BACK_END}/verify-token`, {
            withCredentials: true
        }).then(res => {
            if (res.data.user.email === 'nummad222@gmail.com') {
                toast.dismiss(loadingToast);
                setAuthorized(true);
            } else {
                toast.dismiss(loadingToast);
                setAuthorized(false);
            }
        }).catch((err) => {
            console.log(err);
            toast.dismiss(loadingToast);
            setAuthorized(false);
        })
    }, []);

    return authorized ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute2;
