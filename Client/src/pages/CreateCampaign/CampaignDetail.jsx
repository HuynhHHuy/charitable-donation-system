import { useParams } from "react-router-dom";

function CampaignDetail() {
    const { id } = useParams(); // Lấy id từ URL

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Chiến dịch {id}</h1>
            <p>Chi tiết chiến dịch sẽ hiển thị ở đây.</p>
        </div>
    );
}

export default CampaignDetail;
