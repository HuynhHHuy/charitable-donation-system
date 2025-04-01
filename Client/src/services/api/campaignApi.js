import axios from "axios";

const SERVER_URL = "http://localhost:8080/api/campaign";

const getCategoriesCampaign = async () => {
    try {
        const res = await axios.get(`${SERVER_URL}/categories`);
        return res.data;
    } catch (error) {
        console.log(error);
        return { error: 400, message: "Client fault" };
    }
};

const createCampaign = async (formData) => {
    try {
        const res = await axios.post(
            `${SERVER_URL}/create`,
            formData,
            { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
        );

        return res.data;
    } catch (error) {
        console.log(error);
        return { error: 400, message: "Client fault" };
    }
};

export { getCategoriesCampaign, createCampaign };
