import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";
import Signup from "./signup";
import Login from "./login";
import Forgotpassword from "./forgotpassword";
import Order from "./order";
export default function App() {
    return (
            <Router>
                <Routes>
                <Route element = {<Home />} path="/"></Route>
                <Route element = {<Signup />} path="/signup"/>
                <Route element = {<Login />} path="/login"/>
                <Route element = {<Forgotpassword />} path="/forgotpassword"/>
                <Route element = {<Order />} path="/order"/>
                </Routes>
            </Router>
    );
}