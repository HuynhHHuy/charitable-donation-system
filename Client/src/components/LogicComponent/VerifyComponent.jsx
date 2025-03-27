import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { checkToken } from "../../services/api/authApi";

function VerifyComponent() {
    const [verify, setVerify] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (!token) return <p>...loading</p>;

        const fetch = async () => {
            setLoading(false);
            const res = await checkToken(token);

            if (res.error === 0) {
                setVerify(true);
            }
            setLoading(true);
        };

        fetch();
    }, [location.search]);

    return (
        <div className="flex justify-center items-center">
            {loading && <p>{verify ? "Verify successfully" : "Verify fail, please try again"}</p>}
            {!loading && <p>...loading</p>}
        </div>
    );
}

export default VerifyComponent;
