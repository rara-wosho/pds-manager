import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
    return true ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoutes;
