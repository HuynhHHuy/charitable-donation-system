import axios from "axios";

const SERVER_URL = "http://localhost:8080/api/campaign";

const getCategoriesCampaign = async () => {
    try {
        const res = await axios.get(`${SERVER_URL}/categories`);
        return res.data
    } catch (error) {
        console.log(error);
        return { error: 400, message: "Client fault" };
    }
}

export {
    getCategoriesCampaign,
}
