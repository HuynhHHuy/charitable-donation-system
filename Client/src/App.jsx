import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { LayOut, Home, SignIn, SignUp } from "./pages";
import { GuestRoute, LoginSuccess } from "./components";
import { fetchLoginStatus } from "./redux/authSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoginStatus());
    }, [dispatch]);

    return (
        <Routes>
            {/* Guess route */}
            <Route element={<GuestRoute />}>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Route>
            <Route element={<LayOut />}>
                {/* Services */}
                <Route path="login-success" element={<LoginSuccess />} />

                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
}

export default App;
