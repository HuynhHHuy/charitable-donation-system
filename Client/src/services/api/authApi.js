import axios from "axios"

const SERVER_URL = "http://localhost:8080/api/auth"

const checkLoginStatus = async () => {
    try {
        const res = axios.get(`${SERVER_URL}/login/check`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log(error);
        return { error: 400, message: "Client fail" }
    }
}

export {
    checkLoginStatus,
}
