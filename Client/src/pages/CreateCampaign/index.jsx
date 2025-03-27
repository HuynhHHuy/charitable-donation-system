import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import IntroChooseType from "./ChooseType/IntroChooseType";
import MainChooseType from "./ChooseType/MainChooseType";
import IntroGoal from "./Goal/IntroGoal";
import MainGoal from "./Goal/MainGoal";
import IntroInfoCampaign from "./InfoCampaign/IntroInfoCampaign";
import MainInfoCampaign from "./InfoCampaign/MainInfoCampaign";

const COMPONENTS = [
    {
        id: 0,
        intro: IntroChooseType,
        main: MainChooseType
    },
    {
        id: 1,
        intro: IntroGoal,
        main: MainGoal
    },
    {
        id: 2,
        intro: IntroInfoCampaign,
        main: MainInfoCampaign
    }
];

function CreateCampaign() {
    const [currentComponent, setCurrentComponent] = useState(COMPONENTS[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [campaignInfo, setCampaignInfo] = useState({});

    const setData = (data) => {
        setCampaignInfo((prev) => {
            return { ...prev, ...data };
        });
    };

    return (
        <div className="w-full h-screen flex flex-row" style={{ backgroundColor: "#f4f2ec" }}>
            <div className="py-20 px-10 w-1/3 h-full flex flex-col justify-center items-center">
                <currentComponent.intro />
                <span className="mt-auto">
                    {currentComponent.id + 1} of {COMPONENTS.length}
                </span>
            </div>
            <div
                className="w-2/3 h-full flex flex-col justify-center items-center bg-white shadow-2xl"
                style={{ borderTopLeftRadius: "60px" }}>
                <currentComponent.main setData={setData} saveData={campaignInfo} />
                <div className="w-full h-1/12 flex flex-row justify-start items-center">
                    <hr
                        className="border-t-[1px] border-green-700 my-2"
                        style={{ width: `${((currentIndex + 1) / COMPONENTS.length) * 100}%` }}
                    />
                    <hr
                        className="border-t-[1px] border-gray-300 my-2"
                        style={{ width: `${100 - ((currentIndex + 1) / COMPONENTS.length) * 100}%` }}
                    />
                </div>
                <div className="h-1/12 mb-12 px-20 w-full flex flex-row justify-between items-center gap-4">
                    {currentIndex > 0 && (
                        <button
                            className="bg-white text-[16px] border-[1px] border-gray-300 font-semibold py-4 px-5 rounded-lg mt-4 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                                setCurrentIndex(currentIndex - 1);
                                setCurrentComponent(COMPONENTS[currentIndex - 1]);
                            }}>
                            <ArrowBackIcon sx={{ color: "gray" }} />
                        </button>
                    )}
                    {currentIndex < COMPONENTS.length - 1 && (
                        <button
                            className="bg-[#252525] text-white text-[16px] font-semibold py-4 px-9 rounded-lg mt-4 ml-auto cursor-pointer"
                            onClick={() => {
                                setCurrentIndex(currentIndex + 1);
                                setCurrentComponent(COMPONENTS[currentIndex + 1]);
                            }}>
                            Continue
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateCampaign;
