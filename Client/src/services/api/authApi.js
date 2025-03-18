import axios from "axios"

const SERVER_URL = "http://localhost:8080/api/auth"

const loginWithLocal = async (email, password) => {
    try {
        const res = await axios.post(`${SERVER_URL}/login/local`, { username: email, password }, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log(error);
        return { error: 400, message: "Client fault" }
    }
}

const logout = async () => {
    try {
        const res = await axios.get(`${SERVER_URL}/logout`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log(error);
        return { error: 400, message: "Client fault" }
    }
}

const checkLoginStatus = async () => {
    try {
        const res = await axios.get(`${SERVER_URL}/login/check`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log(error);
        return { error: 400, message: "Client fault" }
    }
}

export {
    checkLoginStatus,
    loginWithLocal,
    logout,
}
