import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import "./Style/Header.css";
import { IconButton, Avatar, Drawer, Box, List, ListItem, Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { logout as logOutApi } from '../../../services/api/authApi.js'
import MainLogo from "../../../assets/images/MainLogo.png";
import { logout } from "../../../redux/authSlice.js"

function HeaderMobile() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const res = await logOutApi()
            if (res.error !== 0) return;

            dispatch(logout())

            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header className="px-2 w-full flex items-center min-h-[56px] fixed flex-1 shadow">
            <nav className="w-full h-full flex flex-row justify-between items-center">
                <IconButton>
                    <SearchOutlinedIcon></SearchOutlinedIcon>
                </IconButton>
                <IconButton onClick={() => navigate("/")}>
                    <Avatar src={MainLogo} alt="Main Logo" variant="rounded" />
                </IconButton>
                <IconButton onClick={() => setIsDrawerOpen(true)}>
                    <MenuIcon></MenuIcon>
                </IconButton>
            </nav>
            <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box
                    padding={1}
                    width={350}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}>
                    <IconButton
                        size="small"
                        sx={{ marginLeft: "auto" }}
                        onClick={() => setIsDrawerOpen(false)}>
                        <CloseIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                    <List>
                        <ListItem>Item 1</ListItem>
                        <ListItem>Item 2</ListItem>
                        <ListItem>Item 3</ListItem>
                    </List>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            paddingY: "12px",
                            backgroundColor: "#008044",
                            borderRadius: 2,
                            color: "white",
                            fontWeight: "500"
                        }}>
                        Start a Fund
                    </Button>
                    {!isLoggedIn ? (
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{
                                marginTop: 3,
                                paddingY: "12px",
                                borderRadius: 2,
                                borderColor: "#6f6f6f",
                                color: "#252525",
                                fontWeight: "600"
                            }}
                            onClick={() => {
                                navigate("/sign-in");
                                setIsDrawerOpen(false);
                            }}>
                            Log In
                        </Button>
                    ) : (
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                marginTop: 3,
                                paddingY: "12px",
                                borderRadius: 2,
                                borderColor: "#6f6f6f",
                                color: "white",
                                fontWeight: "500",
                                backgroundColor: "#ff0f10"
                            }}
                            onClick={() => {
                                handleLogout();
                                setIsDrawerOpen(false);
                            }}>
                            Log Out
                        </Button>
                    )}
                </Box>
            </Drawer>
        </header>
    );
}

export default HeaderMobile;
