import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute() {
    const { isLoggedIn, status } = useSelector((state) => state.auth);

    if (status === "loading" || status === "idle") {        
        return <p>...loading</p>;
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
}

export default PrivateRoute;
