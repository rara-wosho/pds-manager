import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoutes() {
    const { user, loading } = useAuth();

    if (loading)
        return (
            <div className="center">
                <div className="spinner-border" role="status"></div>
            </div>
        );

    return user ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoutes;
