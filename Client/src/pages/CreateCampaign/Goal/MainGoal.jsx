import { useState } from "react";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { PiFlowerLotusDuotone } from "react-icons/pi";

function MainGoal({ setData, saveData }) {
    const [inputValue, setInputValue] = useState(saveData.goal || "");

    const handleFormatValue = (e) => {
        const value = e.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setInputValue(value);
        setData({ goal: value });
    }

    return (
        <div className="px-[160px] w-full h-full flex flex-col justify-center items-start text-center leading-12">
            <fieldset className="relative border border-gray-400 px-3 rounded-md w-full flex flex-row justify-between items-center gap-2">
                <LocalAtmIcon />
                <legend className="absolute -top-1 left-2 transform -translate-y-1/2 bg-white px-1 text-gray-500 text-sm transition-all duration-200">
                    Your starting goal
                </legend>
                <input
                    type="text"
                    className="w-full outline-none border-none bg-transparent text-lg p-1 mt-2"
                    placeholder=""
                    onFocus={(e) =>
                        e.target.previousElementSibling.classList.add("text-blue-500", "text-xs")
                    }
                    onBlur={(e) => {
                        if (!e.target.value) {
                            e.target.previousElementSibling.classList.remove(
                                "text-blue-500",
                                "text-xs"
                            );
                        }
                    }}
                    onChange={handleFormatValue}
                    value={inputValue}
                />
                <span>VND</span>
            </fieldset>
            <div className="mt-10 p-5 w-full bg-[#f4f2ec] rounded-2xl flex flex-col justify-between items-start gap-2">
                <h2 className="text-[16px] font-semibold">Fundraisers like yours typically aim to raise $11,000 or more.</h2>
                <hr className="w-full border-gray-300" />
                <div className="flex flex-row justify-start items-center gap-2">
                    <PiFlowerLotusDuotone className="text-green-700" />
                    <p className="text-[14px] text-[#6f6f6f]">Based on goals for similar fundraisers</p>
                </div>
            </div>
        </div>
    );
}

export default MainGoal;
