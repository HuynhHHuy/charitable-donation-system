import { Avatar } from "@mui/material";

import MainLogo from "../../../assets/images/MainLogo.png";

function IntroChooseType() {
    return (
        <div className="mb-10 w-5/6 flex flex-col justify-center items-center text-center leading-12">
            <Avatar src={MainLogo} alt="Main Logo" sx={{ marginRight: "auto", marginBottom: "auto", width: "100px", height: "100px" }} />

            <h1 className="text-[40px] text-left">Let's begin your fundraising journey</h1>
            <h2 className="mt-5 mr-auto text-left">
                We're here to guide you every step of the way.
            </h2>
        </div>
    );
}

export default IntroChooseType;
