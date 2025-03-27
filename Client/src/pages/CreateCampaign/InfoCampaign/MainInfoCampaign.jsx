import { useState } from "react";

import { CircularProgress } from "@mui/material";
import { TbTargetArrow } from "react-icons/tb";
import { HiOutlineSpeakerWave } from "react-icons/hi2";


function MainInfoCampaign() {
    const [inputValue, setInputValue] = useState({
        title: "",
        description: ""
    });
    const [words, setWords] = useState(0);

    return (
        <div className="px-[160px] w-full h-full flex flex-col justify-center items-start text-center leading-12 overflow-x-auto">
            <input
                type="text"
                className="w-full outline-gray-500 border-gray-400 border-[1px] bg-transparent text-lg p-2 mt-2 rounded-md"
                placeholder="Title"
                value={inputValue.title}
                onChange={(e) => {
                    setInputValue({ ...inputValue, title: e.target.value });
                }}
            />
            <textarea
                name="description"
                id=""
                placeholder="Introduce yourself and what you're raising funds for..."
                rows={2}
                className="mt-5 p-2 outline-gray-500 border-gray-400 border-[1px] w-full rounded-md"
                value={inputValue.description}
                onChange={(e) => {
                    setInputValue({ ...inputValue, description: e.target.value });
                    setWords(() => {
                        const wordCount = e.target.value
                            .split(" ")
                            .filter((word) => word.length > 0).length;
                        return wordCount;
                    });
                }}
            />
            <div className="mt-10 p-5 w-full bg-[#f4f2ec] rounded-lg flex flex-col justify-between items-start gap-2">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-col justify-start items-center">
                        <strong className="text-[16px]">Strengthen your story</strong>
                        <div className="flex flex-row justify-start items-start gap-2">
                            <CircularProgress
                                variant="determinate"
                                value={words < 50 ? (words / 50) * 100 : 100}
                                size="15px"
                                color="#008236"
                            />
                            <span className="text-sm text-gray-500">
                                {words < 50 ? `${50 - words} words needed` : "Great work!"}
                            </span>
                        </div>
                    </div>
                    <button className="px-5 rounded-xl bg-white border-gray-900 border-[1px] font-semibold cursor-pointer">
                        Enhance
                    </button>
                </div>
                <hr className="my-5 w-full border-gray-400" />
                <div className="w-full flex flex-col justify-start items-start">
                    <p className="text-[14px] text-gray-800">
                        Write as much as you can, and we’ll enhance these elements of your story
                        with AI:
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MainInfoCampaign;
