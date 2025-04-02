import { useState, useRef, useEffect } from "react";
import { ArrowBack, ArrowForward, ArrowDropDown } from "@mui/icons-material";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import CampaignIcon from "@mui/icons-material/Campaign";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import bgImage from "../../assets/images/HomePage.jpg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./index.css"

const contentPages = [
    {
        imgSrc: "https://images.gofundme.com/Zu81ES4E3QWY0BvD0nAlKp4pqmM=/720x405/https://d2g8igdw686xgo.cloudfront.net/89718395_1742790539450580_r.png", // Thay ảnh thực tế
        title: "Das Zaubereinmaleins braucht Deine Unterstützung!",
        progress: 65294,
        target: 100000,
        donaters: 101,
        donations: "65,294 $",
        link: "#"
    },
    {
        imgSrc: "https://images.gofundme.com/p2aGDv0tS5I-ivJVWKQQB_A-XLo=/720x405/https://d2g8igdw686xgo.cloudfront.net/89469117_1741696270780805_r.png", // Thay ảnh thực tế
        title: "Frank’s 12-Year Battle Against Leukemia: Help Us Save Him",
        progress: 65294,
        target: 100000,
        donaters: 101,
        donations: "65,294 $",
        link: "#"
    },
    {
        imgSrc: "https://images.gofundme.com/3MQJUSMTOdkfr_8m5S7Jki4mcbc=/720x405/https://d2g8igdw686xgo.cloudfront.net/89510435_1741736056757862_r.png",
        title: "A Life-Saving Bone Marrow Transplant for Levi",
        progress: 135675,
        target: 200000,
        donaters: 101,
        donations: "135,675 $",
        link: "#"
    },
    {
        imgSrc: "https://images.gofundme.com/WO31wTmMZyJR81iwqiFCNOORWlE=/720x405/https://d2g8igdw686xgo.cloudfront.net/89554207_1741897135218499_r.png",
        title: "Connecticut Rescue: A Second Chance",
        progress: 183065,
        target: 250000,
        donaters: 101,
        donations: "183,065 $",
        link: "#"
    },
    {
        imgSrc: "https://images.gofundme.com/K667se68PHmkhhzG09ITt34Lza4=/720x405/https://d2g8igdw686xgo.cloudfront.net/89615017_1742237300287980_r.jpeg",
        title: "Support for Victims of the Kochani Nightclub Fire",
        progress: 112908,
        target: 150000,
        donaters: 101,
        donations: "112,908 $",
        link: "#"
    },
    {
        imgSrc: "https://images.gofundme.com/rF84AbSS7PIEYALIgkVV2Y7qjjo=/720x405/https://d2g8igdw686xgo.cloudfront.net/89790069_1742751582684593_r.png",
        title: "Junger Familienvater ",
        progress: 112908,
        target: 150000,
        donaters: 101,
        donations: "112,908 $",
        link: "#"
    },
    {
        imgSrc: "https://images.gofundme.com/HP9o8wGJUyDifQcbkEr9mkZCkSE=/720x405/https://d2g8igdw686xgo.cloudfront.net/89729483_1742499741817889_r.png",
        title: "Haskell Infrastructure Overhaul",
        progress: 112908,
        target: 150000,
        donaters: 101,
        donations: "112,908 $",
        link: "#"
    },
    {
        imgSrc: "https://images.gofundme.com/4MBD8c1us6qdSezLrMWb6OYTpJE=/720x405/https://d2g8igdw686xgo.cloudfront.net/89730713_1742502786623603_r.png",
        title: "Steun Randa ",
        progress: 112908,
        target: 150000,
        donaters: 101,
        donations: "112,908 $",
        link: "#"
    },
    {
        imgSrc: "https://images.gofundme.com/NOTvQNGIeMoG7W4ocagYwfzEPZI=/720x405/https://d2g8igdw686xgo.cloudfront.net/89766931_1742655741972037_r.png",
        title: "Help us bring our Mom - Maura Heffernan home",
        progress: 112908,
        target: 150000,
        donaters: 101,
        donations: "112,908 $",
        link: "#"
    },
    {
        imgSrc: "https://images.gofundme.com/vADCUaTznkY-CRQGYhuEcNGg_Cg=/720x405/https://d2g8igdw686xgo.cloudfront.net/89786343_1742737560151077_r.png",
        title: "Support for the family of Ulrich Guse",
        progress: 112908,
        target: 150000,
        donaters: 101,
        donations: "112,908 $",
        link: "#"
    }
];

function HomePage() {
    const [isOpen, setIsOpen] = useState(false);
    //dropdown menu
    const [selectedItem, setSelectedItem] = useState("International news");

    //animate
    const [isAnimating, setIsAnimating] = useState(false);
    //itemsrender
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemRefs = useRef([]);
    const mainItemRef = useRef(null);

    //playvideo
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const mainItem = contentPages[currentIndex];
    const gridItems = contentPages.slice(currentIndex + 1, currentIndex + 5);

    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, gridItems.length);
    }, [gridItems]);

    const navigateSlide = (direction) => {
        if (isAnimating) return;

        setIsAnimating(true);

        // Animate out the main item
        if (mainItemRef.current) {
            mainItemRef.current.classList.add("slide-out");
        }

        // Animate out grid items with staggered delay
        itemRefs.current.forEach((item, index) => {
            setTimeout(() => {
                if (item) item.classList.add("slide-out");
            }, index * 30);
        });

        // Change data after animations complete
        setTimeout(() => {
            setCurrentIndex((prev) =>
                direction === "next"
                    ? (prev + 5) % contentPages.length
                    : (prev - 5 + contentPages.length) % contentPages.length
            );

            // Reset classes for new items
            if (mainItemRef.current) {
                mainItemRef.current.classList.remove("slide-out");
                mainItemRef.current.classList.add("slide-in");
            }

            itemRefs.current.forEach((item) => {
                if (item) {
                    item.classList.remove("slide-out");
                    item.classList.add("slide-in");
                }
            });

            // End animation
            setTimeout(() => {
                if (mainItemRef.current) {
                    mainItemRef.current.classList.remove("slide-in");
                }
                itemRefs.current.forEach((item) => {
                    if (item) item.classList.remove("slide-in");
                });
                setIsAnimating(false);
            }, 300);
        }, 300);
    };

    const [visibleSections, setVisibleSections] = useState({});
    const sectionRefs = useRef([]);

    useEffect(() => {
        sectionRefs.current = sectionRefs.current.slice(0, 2);

        const observer = new IntersectionObserver(
            (entries) => {
                const newVisibleSections = {};
                entries.forEach((entry) => {
                    newVisibleSections[entry.target.dataset.index] = entry.isIntersecting;
                });
                setVisibleSections((prev) => ({ ...prev, ...newVisibleSections }));
            },
            { threshold: 0.3 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 630);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative bg-white flex flex-col min-h-[calc(100vh-56px)]">
            <section className="relative h-[40rem] sm:h-[48rem] md:h-[56rem] md:mb-16 mb-10">
                <div
                    className="fixed mt-20 top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        height: "100vh",
                        maxHeight: "630px"
                    }}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h1 className="max-w-2xs mt-0 mb-6 font-semibold text-xl text-[var(--text-color-2)] animate-fadeIn select-none">
                            The benchmark in crowdfunding
                        </h1>
                        <h2 className="max-w-2xs font-semibold text-6xl mt-0 mb-0 text-[var(--text-color-2)] animate-fadeIn select-none">
                            Charity platform
                        </h2>
                        <button className="font-semibold text-[var(--text-color-3)] mt-12 px-6 py-2 bg-white rounded-xl min-h-14 animate-fadeIn select-none cursor-pointer hover:bg-[#ffffffcc] transition-colors">
                            Start a fundraiser  
                        </button>
                    </div>
                </div>
            </section>

            <div className="relative pb-10 bg-white pt-10 rounded-t-4xl z-10 mt-[-5rem]">
                <div className="mt-0 mb-0 mx-auto pl-4 pr-4 max-w-[75%]">
                    <h2 className="mt-12 mb-10 mr-0 ml-0 font-bold text-2xl text-[#252525]">
                        Discover fundraisers related to your interests
                    </h2>

                    <div className="bg-white block">
                        <div className="flex justify-between items-center relative">
                            <button
                                onClick={toggleDropdown}
                                className="inline-flex min-h-10 pt-1 ml-3 pb-1 pl-6 pr-6 leading-4 text-center items-center justify-center rounded-3xl font-semibold text-(--text-color-1) border-[#c0bdb8] border text-base cursor-pointer hover:bg-[#2525250d]">
                                <p className="h-6 mt-1">{selectedItem}</p>
                                <ArrowDropDown
                                    className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {isOpen && (
                                <div
                                    style={{ boxShadow: "0 2px 6px #0000001a" }}
                                    className="h-[476px] bg-white absolute top-12 w-sm rounded-xl overflow-y-scroll z-50">
                                    <div>
                                        <div className="overflow-y-scroll">
                                            <ul className="flex flex-col m-0 pt-4 pb-4 pl-2 pr-2">
                                                <li
                                                    onClick={() => (
                                                        setSelectedItem("Tout près du but"),
                                                        setIsOpen(false)
                                                    )}
                                                    className="flex rounded-[8px] p-4 items-center gap-5 hover:bg-[#fbfaf8] cursor-pointer">
                                                    <TrackChangesIcon className="bg-[#fbfaf8] text-1 rounded-full h-10! w-10! p-2" />
                                                    <div>
                                                        <div className="font-semibold text-1 text-base">
                                                            Just a step away from the goal
                                                        </div>
                                                        <div className="text-[#6f6f6f] text-[14px]">
                                                        Fundraisers at 5% of their goal
                                                        </div>
                                                    </div>
                                                </li>
                                                <li
                                                    onClick={() => (
                                                        setSelectedItem("Lancement récent"),
                                                        setIsOpen(false)
                                                    )}
                                                    className="flex rounded-[8px] p-4 items-center gap-5 hover:bg-[#fbfaf8] cursor-pointer">
                                                    <CampaignIcon className="bg-[#fbfaf8] text-1 rounded-full h-10! w-10! p-2" />
                                                    <div>
                                                        <div className="font-semibold text-1 text-base">
                                                        Recent launch
                                                        </div>
                                                        <div className="text-[#6f6f6f] text-[14px]">
                                                        Fundraisers created in the last two days
                                                        </div>
                                                    </div>
                                                </li>
                                                <li
                                                    onClick={() => (
                                                        setSelectedItem("Besoin de dynamique"),
                                                        setIsOpen(false)
                                                    )}
                                                    className="flex rounded-[8px] p-4 items-center gap-5 hover:bg-[#fbfaf8] cursor-pointer">
                                                    <ElectricBoltIcon className="bg-[#fbfaf8] text-1 rounded-full h-10! w-10! p-2" />
                                                    <div>
                                                        <div className="font-semibold text-1 text-base">
                                                        Need some momentum
                                                        </div>
                                                        <div className="text-[#6f6f6f] text-[14px]">
                                                        Fundraisers that need a little push
                                                        </div>
                                                    </div>
                                                </li>
                                                <li
                                                    onClick={() => (
                                                        setSelectedItem("Actualité internationale"),
                                                        setIsOpen(false)
                                                    )}
                                                    className="flex rounded-[8px] p-4 items-center gap-5 hover:bg-[#fbfaf8] cursor-pointer">
                                                    <TrendingUpIcon className="bg-[#fbfaf8] text-1 rounded-full h-10! w-10! p-2" />
                                                    <div>
                                                        <div className="font-semibold text-1 text-base">
                                                        International news
                                                        </div>
                                                        <div className="text-[#6f6f6f] text-[14px]">
                                                        Fundraisers with a high donor engagement rate
                                                        </div>
                                                    </div>
                                                </li>
                                                <li
                                                    onClick={() => (
                                                        setSelectedItem("Associations caritatives"),
                                                        setIsOpen(false)
                                                    )}
                                                    className="flex rounded-[8px] p-4 items-center gap-5 hover:bg-[#fbfaf8] cursor-pointer">
                                                    <VolunteerActivismIcon className="bg-[#fbfaf8] text-1 rounded-full h-10! w-10! p-2" />
                                                    <div>
                                                        <div className="font-semibold text-1 text-base">
                                                            Associations caritatives
                                                        </div>
                                                        <div className="text-[#6f6f6f] text-[14px]">
                                                        Fundraisers for popular associations
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="hidden lg:flex mr-4">
                                <button
                                    onClick={() => navigateSlide("prev")}
                                    className="w-8 h-8 bg-[#0000] border border-[#c0bdb8] text-1 rounded-4xl justify-center items-center cursor-pointer inline-flex hover:bg-[#2525250d] mr-2">
                                    <ArrowBack />
                                </button>
                                <button
                                    onClick={() => navigateSlide("next")}
                                    className="w-8 h-8 bg-[#0000] border border-[#c0bdb8] text-1 rounded-4xl justify-center items-center cursor-pointer inline-flex hover:bg-[#2525250d]">
                                    <ArrowForward />
                                </button>
                            </div>
                        </div>

                        <div>
                            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                                <li ref={mainItemRef} className="item hidden sm:block">
                                    <a href={mainItem.link}>
                                        <div className="text-1 bg-[#0000] max-h-[36rem] max-w-[36rem] w-full rounded-xl p-2 group transition-normal duration-300 transition-all">
                                            <div className="relative rounded-xl min-h-40 overflow-hidden h-[27.5rem]">
                                                <img
                                                    src={mainItem.imgSrc}
                                                    alt={mainItem.title}
                                                    className="absolute max-w-full h-full object-cover group-hover:scale-105 transition-all transition-normal duration-500 ease-in-out"
                                                />
                                                <span className="absolute inline-flex items-center rounded-xl bottom-3 text-white text-[.875rem] font-normal h-6 left-3 py-0 px-2 bg-[#00000080]">
                                                    {mainItem.donaters} donations
                                                </span>
                                            </div>
                                            <div className="py-5 px-3 flex flex-col justify-around text-1">
                                                <div className="h-[2.6rem] leading-[1.3] font-bold text-base text-1">
                                                    {mainItem.title}
                                                </div>
                                                <div className="flex flex-col text-1">
                                                    <progress
                                                        value={mainItem.progress}
                                                        max={mainItem.target}
                                                        className="mt-6 bg-[#e5e1d7] w-full h-2 appearance-none text-[#008044] block rounded-full overflow-hidden"
                                                    />
                                                    <label className="block text-sm text-1 leading-[1.5] font-bold mt-1">
                                                        {mainItem.progress.toLocaleString()} € of donations collected
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>

                                <li className="w-full list-none">
                                    <ul className="grid content-start max-w-[unset] h-fit grid-cols-1 md:grid-cols-2 p-0 gap-0.5">
                                        {gridItems.map((item, index) => (
                                            <li
                                                key={`grid-item-${index}`}
                                                ref={(el) => (itemRefs.current[index] = el)}
                                                className="w-full list-none item hover:bg-[#cecea633] rounded-xl">
                                                <a href={item.link} className="cursor-pointer">
                                                    <div className="text-1 bg-[#0000] md:h-[17.9375rem] md:max-w-[17.8125rem] max-w-[unset] h-fit  w-full px-2 pt-2 pb-5 group transition-normal duration-300 transition-all">
                                                        <div className="relative min-h-[9.25rem] rounded-xl overflow-hidden w-full">
                                                            <img
                                                                src={item.imgSrc}
                                                                alt={item.title}
                                                                className="w-full object-cover group-hover:scale-110 transition-transform transition-normal duration-500 ease-in-out"
                                                            />
                                                            <span className="absolute inline-flex items-center rounded-xl bottom-3 text-white text-[.875rem] font-normal h-6 left-3 py-0 px-2 bg-[#00000080]">
                                                                {item.donaters} donations
                                                            </span>
                                                        </div>
                                                        <div className="py-5 px-3 flex flex-col justify-around text-1">
                                                            <div className="h-[2.6rem] leading-[1.3] font-bold text-base text-1 text-multiline-ellipsis">
                                                                {item.title}
                                                            </div>
                                                            <div className="flex flex-col text-1">
                                                                <progress
                                                                    value={item.progress}
                                                                    max={item.target}
                                                                    className="mt-6 bg-[#e5e1d7] w-full h-2 appearance-none block rounded-full overflow-hidden"
                                                                />
                                                                <label className="block text-sm text-1 leading-[1.5] font-bold mt-1">
                                                                    {item.progress.toLocaleString()}{" "}
                                                                    € of donations raised
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <section className="bg-white py-16 w-full relative">
                <div className="container mx-auto px-4 max-w-6xl">
                    <header className="mb-12">
                        <h2 className="text-3xl font-semibold text-gray-900">Trending topics</h2>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                            <a href="#" className="block h-full">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src="https://d2g8igdw686xgo.cloudfront.net/81115225_1719882079206608_r.jpeg"
                                        alt="Union Island"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* <div className="hidden h-full w-full hover:block absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> */}
                                    <span className="absolute top-4 left-4 px-3 py-1 text-sm font-bold text-[#7b00c0] bg-[#f1d8fe] rounded-full">
                                    The hurricane
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="mb-3 text-xl font-bold">
                                        Help the population of Union Island recover
                                    </h3>
                                    <p className="mb-6 text-gray-600">
                                    "With your funds, we will purchase food, generators, supplies, and all the necessary items for the local population."
                                    </p>
                                    <div className="flex items-center text-1 font-semibold">
                                        <span>I support</span>
                                        <ArrowForward className="ml-2" />
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                            <a href="#" className="block h-full">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src="https://d2g8igdw686xgo.cloudfront.net/78090695_1707472075877013_r.jpeg"
                                        alt="Union Island"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* <div className="hidden h-full w-full hover:block absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> */}
                                    <span className="absolute top-4 left-4 px-3 py-1 text-sm font-bold text-[#7b00c0] bg-[#f1d8fe] rounded-full">
                                    Guide and examples.
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="mb-3 text-xl font-bold">
                                    Raise funds to evacuate civilians from Gaza
                                    </h3>
                                    <p className="mb-6 text-gray-600">
                                    Here are directions and advice if you wish to raise funds for those trying to leave Gaza.
                                    </p>
                                    <div className="flex items-center text-1 font-semibold">
                                        <span>Learn more</span>
                                        <ArrowForward className="ml-2" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-white w-full relative">
                <section
                    ref={(el) => (sectionRefs.current[0] = el)}
                    data-index="section1"
                    className={`relative bg-[#f0fce9] w-full py-20 z-10 pt-[72px] transition-all duration-500 ${
                        visibleSections["section1"] ? "scale-100" : "scale-95 rounded-4xl"
                    }`}>
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="max-w-xs md:max-w-2xl lg:max-w-4xl mx-auto">
                            <h2
                                style={{
                                    fontSize:
                                        "clamp(32px, 1.25rem + 0.25 * (100vw - 23.4375rem) / 66.5625, 1.5rem)"
                                }}
                                className="font-bold mb-10 text-gray-900 max-w-[46rem]">
                                Fundraising on GoFundMe is user-friendly, efficient, and secure.
                            </h2>
                            <div className="space-y-4 text-gray-700">
                                <p
                                    style={{
                                        fontSize:
                                            "clamp(1.25rem, 1.25rem + 0.25 * (100vw - 23.4375rem) / 66.5625, 1.5rem)"
                                    }}>
                                    ChatGPT said:
                                    Charity Proj gives you the means to successfully raise the funds you need for yourself, your friends, your family, or a charity. With its fee-free start-up for organizers, Charity Proj is the reference for...
                                    <a href="#" className="text-1 underline ml-1">
                                    ...around the world for crowdfunding.
                                    </a>{" "}
                                    around the world for the{" "}
                                    <a href="#" className="text-1 underline">
                                    health
                                    </a>{" "}
                                    (Emergencies) and the{" "}
                                    <a href="#" className="text-1 underline">
                                    non-profit organizations
                                    </a>
                                    You can ask your questions here at any time if you need help.
                                </p>
                                <p
                                    style={{
                                        fontSize:
                                            "clamp(1.25rem, 1.25rem + 0.25 * (100vw - 23.4375rem) / 66.5625, 1.5rem)"
                                    }}
                                    className="mb-4 mt-8">
                                    Do you have others{" "}
                                    <a href="#" className="text-1 underline">
                                        questions
                                    </a>{" "}
                                    ?Learn more about{" "}
                                    <a href="#" className="text-1 underline">
                                    how Charity Proj works
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="relative bg-white w-full py-20">
                <div className="container mx-auto max-w-[48rem] lg:max-w-[64rem] xl:max-w-[72rem] px-4">
                    <header className="flex justify-between items-center w-full mb-6">
                        <h2 className="text-2xl font-semibold">How does Charity Proj work?</h2>
                        <a
                            href="#"
                            className="text-base font-semibold border border-gray-300 rounded-xl py-1 px-4 h-fit min-h-[32px]">
                            Learn more
                        </a>
                    </header>

                    <div className="relative">
                        <picture>
                            <source
                                media="(max-width: 22.5rem)"
                                srcSet="https://d25oniaj7o2jcw.cloudfront.net/homepage-refresh-how-it-works-video-still-m-7-23.jpg"
                            />
                            <source
                                media="(min-width: 22.6rem)"
                                srcSet="https://d25oniaj7o2jcw.cloudfront.net/homepage-refresh-how-it-works-video-still-d-7-23.jpg"
                            />
                            <img
                                alt=""
                                className="video_image__NT0b7 w-full rounded-lg"
                                loading="lazy"
                                src="https://d25oniaj7o2jcw.cloudfront.net/homepage-refresh-how-it-works-video-still-m-7-23.jpg"
                            />
                        </picture>

                        <button
                            className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-transparent px-6 py-2 rounded-xl cursor-pointer font-bold text-base text-center border-none min-h-[3rem] flex items-center"
                            onClick={() => setIsPlaying(true)}>
                            <PlayArrowIcon className="mr-1" />
                            Watch the video (1 min).
                        </button>
                    </div>
                </div>

                {isPlaying && (
                    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                            onClick={() => setIsPlaying(false)}></div>
                        <div className="relative w-full max-w-4xl mx-auto z-10">
                            <div className="aspect-w-16 aspect-h-9 w-full">
                                <iframe
                                    className="w-full h-[315px] md:h-[500px] lg:h-[600px] rounded-lg shadow-xl"
                                    src={`https://www.youtube.com/embed/Dn_0Vji7j5s?autoplay=1&rel=0`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    onClick={(e) => e.stopPropagation()}></iframe>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <div className="relative bg-white w-full">
                <section
                    ref={(el) => (sectionRefs.current[1] = el)}
                    data-index="section2"
                    className={`relative bg-[#012d19] w-full py-20 z-10 pt-[72px] transition-all duration-500 ${
                        visibleSections["section2"] ? "scale-100" : "scale-95 rounded-4xl"
                    }`}>
                    <div className="container mx-auto px-4 max-w-xs md:max-w-2xl lg:max-w-4xl">
                        <div className="max-w-4xl mx-auto h-[36rem] flex items-start justify-center flex-col">
                            <h2 className="font-bold mb-10 text-white max-w-[46rem] text-2xl lg:text-4xl">
                            You are not at risk.
                            </h2>
                            <div className="space-y-4 text-white font-bold">
                                <span className="text-2xl lg:text-4xl leading-[1.4]">
                                Charity Proj is a reliable leader in online fundraising. With
                                    <a href="#" className="text-white underline ml-1">
                                    simple fees
                                    </a>{" "}
                                    and the team of
                                    <a href="#" className="text-white underline">
                                        {" "}
                                        trust and security
                                    </a>{" "}
                                    and its experts, you can raise money or
                                </span>
                                <span className="text-2xl lg:text-4xl mb-4 mt-8">
                                make a donation with peace of mind.
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="relative bg-white w-full pt-10">
                <section className="pt-8 flex items-center justify-center bg-white">
                    <div className="w-7xl mt-0 my-auto px-4 pb-[10.5rem] max-w-[20rem] xl:max-w-[80rem] lg:max-w-[56rem] md:max-w-[40rem] sm:max-w-[36rem]">
                        <h2 className="font-semibold text-2xl">
                        Raise funds for whoever you want.
                        </h2>
                        <ul>
                            <li className="border-b border-[#ccc] pt-12 pb-8">
                                <a href="">
                                    <div className="flex items-center justify-between text-1 font-semibold text-4xl group sm:text-2xl md:text-3xl  lg:text-4xl">
                                        <h3>You</h3>
                                        <ArrowForwardIosIcon className="text-white text-center border border-[#ccc] pl-[10px] bg-black w-9! h-9! p-2 rounded-full group-hover:text-1 group-hover:bg-white" />
                                    </div>
                                    <p className="pt-6 mb-4 text-[#6f6f6f] text-xl">
                                    The funds are deposited into your bank account for your personal use.
                                    </p>
                                </a>
                            </li>
                            <li className="border-b border-[#ccc] pt-12 pb-8">
                                <a href="">
                                    <div className="flex items-center justify-between text- font-semibold text-4xl group sm:text-2xl md:text-3xl  lg:text-4xl">
                                        <h3 className="">Friends and family.</h3>
                                        <ArrowForwardIosIcon className="text-white text-center border border-[#ccc] pl-[10px] bg-black w-9! h-9! p-2 rounded-full group-hover:text-1 group-hover:bg-white" />
                                    </div>
                                    <p className="pt-6 mb-4 text-[#6f6f6f] text-xl">
                                    The funds are deposited into your bank account for your personal use.
                                    </p>
                                </a>
                            </li>
                            <li className="border-b border-[#ccc] pt-12 pb-8">
                                <a href="">
                                    <div className="flex items-center justify-between text-1 font-semibold text-4xl group sm:text-2xl md:text-3xl  lg:text-4xl">
                                        <h3>Associations</h3>
                                        <ArrowForwardIosIcon className="text-white text-center border border-[#ccc] pl-[10px] bg-black w-9! h-9! p-2 rounded-full group-hover:text-1 group-hover:bg-white" />
                                    </div>
                                    <p className="pt-6 mb-4 text-[#6f6f6f] text-xl">
                                    The funds are given to the non-profit organization of your choice.{" "}
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
            {showButton && (
                <div className="block lg:hidden fixed z-[99] bg-white w-full! p-4! bottom-0 animate-fadeIn h-20">
                    <a
                        href="#"
                        className="flex h-12 bg-[#008044] text-white font-bold text-lg rounded-[1.5625rem] py-[.6875rem] px-[1rem] items-center justify-center shadow hover:bg-[#015d32] transition-colors">
                        Start a fundraiser.
                    </a>
                </div>
            )}
        </div>
    );
}


export default HomePage;
