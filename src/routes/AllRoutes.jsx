import ProtectedRoutes from "./ProtectedRoutes";
import { Routes, Route } from "react-router-dom";

import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import FinishAccount from "../pages/FinishAccount";

function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="signup" element={<Signup />} />

            <Route element={<ProtectedRoutes />}>
                <Route path="home" element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="account-setup" element={<FinishAccount />} />
            </Route>
        </Routes>
    );
}

export default AllRoutes;
