import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, List, ListItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import MainLogo from "../../../assets/images/MainLogo.png";
import PopoverHeader from "./PopoverHeader";
import { logout as logOutApi } from "../../../services/api/authApi.js";
import { getUserInfo } from "../../../services/api/userApi";
import NoAvatar from "../../../assets/images/NoAvatar.jpg";
import { DropDown } from "../../../components/UI";
import { logout } from "../../../redux/authSlice.js";

const DONATION = {
    name: "Donation",
    title: "Discover fundraisers to support",
    logo: FavoriteBorderIcon,
    items: [
        {
            title: "Categories",
            subTitle: "Browse fundraisers by category",
            path: "/discover"
        },
        {
            title: "Crisis relief",
            subTitle: "Donate to verified relief",
            path: "/c/act"
        },
        {
            title: "Social Impact Funds",
            subTitle: "Direct support for urgent needs",
            path: "/c/cause"
        },
        {
            title: "Supporter Space",
            subTitle: "Inspiration, FAQs, and where to give",
            path: "/c/supporter-space"
        }
    ]
};

const FUNDRAISING = {
    name: "Fundraise",
    title: "Start fundraising, tips, and resources",
    logo: VolunteerActivismIcon,
    items: [
        {
            title: "How to start a GoFundMe",
            subTitle: "Step-by-step help, examples, and more",
            path: ""
        },
        {
            title: "Fundraising tips",
            subTitle: "The ultimate fundraising tips guide",
            path: ""
        },
        {
            title: "Fundraising categories",
            subTitle: "Find the right category for you",
            path: ""
        },
        {
            title: "Fundraising ideas",
            subTitle: "Ideas to spark your creativity",
            path: ""
        },
        {
            title: "Team fundraising",
            subTitle: "Fundraise together with a team",
            path: ""
        },
        {
            title: "Charity fundraising",
            subTitle: "Fundraise for a charity",
            path: ""
        },
        {
            title: "Fundraising Blog",
            subTitle: "Resources, tips, and more",
            path: ""
        },
        {
            title: "Sign up as a charity",
            subTitle: "Claim your charity",
            path: ""
        }
    ]
};

const ABOUT = {
    name: "About",
    title: "How it works, pricing, and more",
    logo: ErrorOutlineIcon,
    items: [
        { title: "How GoFundMe works", subTitle: "", path: "" },
        { title: "About GoFundMe and Classy", subTitle: "", path: "" },
        { title: "GoFundMe Giving Guarantee", subTitle: "", path: "" },
        { title: "Newsroom", subTitle: "", path: "" },
        { title: "Supported countries", subTitle: "", path: "" },
        { title: "Careers", subTitle: "", path: "" },
        { title: "Pricing", subTitle: "", path: "" },
        { title: "GoFundMe.org", subTitle: "", path: "" },
        { title: "Help Center", subTitle: "", path: "" }
    ]
};

const USER = [
    {
        title: "Profile",
        path: "/profile"
    },
    {
        title: "My Fundraisers",
        path: "/my-fundraisers"
    },
    {
        title: "My Impact",
        path: "/my-impact"
    },
    {
        title: "Settings",
        paht: "/settings"
    }
];

function HeaderPC() {
    const userId = useSelector((state) => state.auth.user.user_id);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (isLoggedIn) {
            if (userId) {
                const fetchUserInfo = async () => {
                    const filters = { user_id: userId };
                    const res = await getUserInfo(filters);
                    if (res.error !== 0) {
                        console.log(res.message);
                        return;
                    }

                    let user = res.results[0];
                    if (user.profile_picture === null) {
                        user.profile_picture = NoAvatar;
                    }

                    setUserInfo((prev) => ({ ...prev, ...user }));
                };
                fetchUserInfo();
            }
        }
    }, [isLoggedIn, userId]);

    const handleLogout = async () => {
        try {
            const res = await logOutApi();
            if (res.error !== 0) return;

            dispatch(logout());

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className="px-26 w-full flex flex-row justify-between items-center min-h-[80px] fixed flex-1 shadow text-[#252525] text-[16px] bg-white">
            <nav className="flex flex-row justify-start items-center">
                <Button
                    size="small"
                    startIcon={<SearchIcon />}
                    sx={{
                        color: "#252525",
                        fontSize: "16px",
                        textTransform: "none",
                        borderRadius: "20px",
                        paddingX: 2,
                        ":hover": { backgroundColor: "#fbfaf8" }
                    }}>
                    Search
                </Button>
                <PopoverHeader dataRender={DONATION} />
                <PopoverHeader dataRender={FUNDRAISING} />
            </nav>
            <Avatar
                src={MainLogo}
                alt="Main Logo"
                variant="square"
                className="mr-auto ml-auto cursor-pointer"
                onClick={() => navigate("/")}
            />
            <nav className="flex flex-row justify-start items-center">
                <PopoverHeader dataRender={ABOUT} right={true} />
                {!isLoggedIn && (
                    <Button
                        size="small"
                        sx={{
                            color: "#252525",
                            fontSize: "16px",
                            textTransform: "none",
                            borderRadius: "20px",
                            paddingX: 2,
                            ":hover": { backgroundColor: "#fbfaf8" }
                        }}
                        onClick={() => navigate("/sign-in")}>
                        Sign in
                    </Button>
                )}
                {!isLoggedIn && (
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{
                            marginLeft: 1,
                            color: "#252525",
                            fontSize: "14px",
                            textTransform: "none",
                            borderColor: "#c0bdb8",
                            borderRadius: "25px",
                            fontWeight: "600",
                            paddingX: 2,
                            ":hover": { backgroundColor: "#fbfaf8" }
                        }}>
                        Start a UIT-FundMe
                    </Button>
                )}
                {isLoggedIn && (
                    <DropDown
                        right={true}
                        name={userInfo.full_name}
                        iconStart={<Avatar src={userInfo.profile_picture} alt="User Avatar" />}
                        sx={{ marginRight: "100px" }}>
                        <List disablePadding sx={{ width: "150px" }}>
                            {USER.map((item, index) => {
                                return (
                                    <ListItem
                                        disablePadding
                                        key={index}
                                        onClick={() => {
                                            navigate(item.path);
                                        }}
                                        sx={{
                                            marginY: 1,
                                            paddingY: "10px",
                                            paddingX: "20px",
                                            width: "100%",
                                            cursor: "pointer",
                                            ":hover": {
                                                backgroundColor: "#fbfaf8",
                                                borderRadius: "10px"
                                            }
                                        }}>
                                        <div className="flex flex-row gap-2">{item.title}</div>
                                    </ListItem>
                                );
                            })}
                            <ListItem
                                disablePadding
                                onClick={() => {
                                    handleLogout();
                                    navigate("/sign-in");
                                }}
                                sx={{
                                    marginTop: 2,
                                    backgroundColor: "#ff0f10",
                                    marginY: 1,
                                    paddingY: "10px",
                                    paddingX: "20px",
                                    width: "100%",
                                    cursor: "pointer",
                                    borderRadius: "10px",
                                    color: "white",
                                    fontWeight: "600"
                                }}>
                                <div className="flex flex-row gap-2">Log Out</div>
                            </ListItem>
                        </List>
                    </DropDown>
                )}
            </nav>
        </header>
    );
}

export default HeaderPC;
