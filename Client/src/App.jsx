import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux"

import { LayOut, Home } from "./pages";
import { fetchLoginStatus } from "./redux/authSlice";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchLoginStatus())
    }, [dispatch])

    return (
        <Routes>
            <Route element={<LayOut />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
}

export default App;
