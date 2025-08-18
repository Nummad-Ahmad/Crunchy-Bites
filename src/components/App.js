import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";
import Signup from "./signup";
import Login from "./login";
import Forgotpassword from "./forgotpassword";
import Order from "./order";
import Notifications from "./notifications";
import Customers from "./customers";
import Settings from "./settings";
import ShowOrders from "./showOrders";
import ProtectedRoute from "./protectedRoute";
import ProtectedRoute2 from "./protectedRoute2";

export default function App() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotpassword" element={<Forgotpassword />} />
            </Route>

            <Route path="/" element={<Home />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/order" element={<Order />} />
                <Route path="/notifications" element={<Notifications />} />
            </Route>

            <Route element={<ProtectedRoute2 />}>
                <Route path="/customers" element={<Customers />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/showorders" element={<ShowOrders />} />
            </Route>
        </Routes>

    );
}
