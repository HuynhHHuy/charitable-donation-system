import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { checkToken } from "../../services/api/authApi";

function VerifyComponent() {
    const [verify, setVerify] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        
        if (!token) return;

        const fetch = async () => {
            const res = await checkToken(token);
            
            if (res.error === 0) {
                setVerify(true);
            }
        };

        fetch()
    }, [location.search]);

    return (
        <div className="flex justify-center items-center">
            <p>{verify ? "Verify successfully" : "Verify fail, please try again"}</p>
        </div>
    );
}

export default VerifyComponent;
