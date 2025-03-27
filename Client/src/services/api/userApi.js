import axios from "axios";

const SERVER_URL = "http://localhost:8080/api/user";

const getUserInfo = async (filters) => {
    try {
        const queryString = new URLSearchParams(filters).toString();
        const res = await axios.get(`${SERVER_URL}?${queryString}`, { withCredentials: true });

        return res.data;
    } catch (error) {
        console.log(error);
        return { error: 400, message: "Client fault" };
    }
}

export {
    getUserInfo,
}
