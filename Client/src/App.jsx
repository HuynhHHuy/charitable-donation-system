import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { LayOut, Home, Login } from "./pages";
import { GuestRoute, LoginSuccess } from "./components";
import { fetchLoginStatus } from "./redux/authSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoginStatus());
    }, [dispatch]);

    return (
        <Routes>
            <Route element={<LayOut />}>
                {/* Services */}
                <Route path="login-success" element={<LoginSuccess />}/>

                <Route path="/" element={<Home />} />
                {/* Guess route */}
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
