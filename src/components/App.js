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
        <Router>
            <Routes>
                <Route element={<Signup />} path="/signup" />
                <Route element={<Login />} path="/login" />
                <Route element={<Forgotpassword />} path="/forgotpassword" />
                <Route element={<Home />} path="/" />
                <Route element={<ProtectedRoute />}>
                    <Route element={<Order />} path="/order" />
                    <Route element={<Notifications />} path="/notifications" />
                </Route>
                <Route element={<ProtectedRoute2 />}>
                    <Route element={<Customers />} path="/customers" />
                    <Route element={<Settings />} path="/settings" />
                    <Route element={<ShowOrders />} path="/showorders" />
                </Route>
            </Routes>
        </Router>
    );
}
