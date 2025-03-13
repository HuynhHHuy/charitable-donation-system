import { Routes, Route } from "react-router-dom";

import { LayOut, Home } from "./pages";

function App() {
    return (
        <Routes>
            <Route element={<LayOut />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
}

export default App;
