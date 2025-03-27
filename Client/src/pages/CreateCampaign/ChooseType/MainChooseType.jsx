import { useEffect, useState } from "react";

import { getCategoriesCampaign } from "../../../services/api/campaignApi";

function MainChooseType({ setData, saveData }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(saveData.category || "");
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getCategoriesCampaign();
            if (res.error !== 0) {
                console.log(res.message);
            } else {
                setCategories(res.results);
                if (!saveData.category) {
                    setSelectedCategory(res.results[0].category_name);
                    setData({ category: res.results[0].category_name });
                }
            }
        };
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="px-[160px] w-full h-full flex flex-col justify-center items-start text-center leading-12">
            <h2 className="text-xl">What best describes why you're fundraising?</h2>
            <form
                action=""
                className="flex flex-row justify-start items-center flex-wrap gap-2 mt-4">
                {categories.map((category) => {
                    return (
                        <div key={category.category_id} className="flex items-center">
                            <input
                                type="radio"
                                name="category"
                                id={category.category_id}
                                value={category.category_name}
                                checked={selectedCategory === category.category_name}
                                className="hidden peer"
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setData({ category: e.target.value });
                                }}
                            />
                            <label
                                htmlFor={category.category_id}
                                className="px-3 text-[16px] border-[1px] rounded-3xl border-[#c0bdb8] 
                               hover:bg-[#ebfbe2] hover:border-[#c0bdb8] cursor-pointer
                               peer-checked:bg-[#ebfbe2] peer-checked:border-[#015d32] hover:peer-checked:bg-[#ebfbe2] hover:peer-checked:border-[#015d32]">
                                {category.category_name}
                            </label>
                        </div>
                    );
                })}
            </form>
        </div>
    );
}

export default MainChooseType;
