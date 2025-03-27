import { Toast } from "../../components/UI";
import { useState } from "react";

function Home() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            Home
            <button onClick={() => setOpen(true)}>Click</button>
            <Toast text="Test" title="Test" open={open} onClose={() => setOpen(false)} timeToClose={1000} />
        </div>
    );
}

export default Home;
