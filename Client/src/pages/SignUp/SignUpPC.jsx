import SignBg from "../../assets/images/SignInBgImg.jpg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
    Avatar,
    Button,
    TextField,
    IconButton,
    Box,
    List,
    ListItem,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import ButtonCostume from "../../components/UI/Button/ButtonCostume";
import MainLogo from "../../assets/images/MainLogo.png";
import { verifySignUp, signUp } from "../../services/api/authApi";
import {
    emailValidate,
    fullNameValidate,
    passwordValidate,
    confirmPasswordValidate
} from "../../services/validateForm";

const socket = io("http://localhost:8080");

function SignUpPC() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: ""
    });
    const [validData, setValidData] = useState({
        email: { error: false, message: "" },
        password: { error: false, message: "" },
        confirmPassword: { error: false, message: "" },
        fullName: { error: false, message: "" }
    });
    const [isVisiblePassword, setIsVisiblePassword] = useState({
        password: false,
        confirmPassword: false
    });

    useEffect(() => {
        document.title = "SignUp";

        return () => {
            socket.off("server-send-status");
        };
    }, []);

    const handleVerify = async (e) => {
        e.preventDefault();
        socket.emit("join-room-verify", inputValue.email);

        const emailValidation = emailValidate(inputValue.email);
        const fullNameValidation = fullNameValidate(inputValue.fullName);
        const passwordValidation = passwordValidate(inputValue.password);
        const confirmPasswordValidation = confirmPasswordValidate(
            inputValue.password,
            inputValue.confirmPassword
        );

        setValidData({
            email: emailValidation,
            fullName: fullNameValidation,
            password: passwordValidation,
            confirmPassword: confirmPasswordValidation
        });

        if (
            emailValidation.error ||
            fullNameValidation.error ||
            passwordValidation.error ||
            confirmPasswordValidation.error
        ) {
            return;
        }

        try {
            const res = await verifySignUp(inputValue.email);

            if (res.error === 3) {
                setValidData((prev) => ({ ...prev, email: { error: true, message: res.message } }));
            }

            if (res.error === 0) {
                socket.on("server-send-status", (success) => {
                    if (success) {
                        const fetch = async () => {
                            const res = await signUp(
                                inputValue.email,
                                inputValue.password,
                                inputValue.fullName
                            );
                            if (res.error === 0) navigate("/sign-in");
                            console.log(res);
                        };
                        fetch()
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${SignBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100vh"
            }}
            className="flex justify-center items-center">
            <div className="py-16 px-16 w-1/3 flex flex-col justify-center items-center bg-white rounded-3xl max-h-[90%] overflow-auto">
                <ButtonCostume sx={{ marginRight: "auto" }} onClick={() => navigate("/")}>
                    Back to Home
                </ButtonCostume>
                <Avatar src={MainLogo} alt="Main Logo" className="ml-auto mr-auto" />
                <h1 className="mt-6 text-3xl font-semibold text-gray-700">Create an Account</h1>
                <h2 className="mt-1 text-sm opacity-55">
                    Already have an account?{" "}
                    <Link to="/log-in" className="underline">
                        Sign In
                    </Link>
                </h2>
                <form action="" className="mt-5 w-full flex flex-col gap-3" onSubmit={handleVerify}>
                    <TextField
                        size="small"
                        fullWidth
                        label="Full Name"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "gray" },
                                "&:hover fieldset": { borderColor: "black" },
                                "&.Mui-focused fieldset": { borderColor: "#008044" }
                            },
                            "& .MuiInputLabel-root": { color: "gray" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#364153" }
                        }}
                        error={validData.fullName.error}
                        helperText={validData.fullName.message}
                        value={inputValue.fullName}
                        onChange={(e) => {
                            setInputValue((prev) => ({ ...prev, fullName: e.target.value }));
                            setValidData((prev) => ({
                                ...prev,
                                fullName: { error: false, message: "" }
                            }));
                        }}
                    />
                    <TextField
                        size="small"
                        fullWidth
                        label="Email Address"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "gray" },
                                "&:hover fieldset": { borderColor: "black" },
                                "&.Mui-focused fieldset": { borderColor: "#008044" }
                            },
                            "& .MuiInputLabel-root": { color: "gray" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#364153" }
                        }}
                        error={validData.email.error}
                        helperText={validData.email.message}
                        value={inputValue.email}
                        onChange={(e) => {
                            setInputValue((prev) => ({ ...prev, email: e.target.value }));
                            setValidData((prev) => ({
                                ...prev,
                                email: { error: false, message: "" }
                            }));
                        }}
                    />
                    <TextField
                        size="small"
                        fullWidth
                        label="Password"
                        type={isVisiblePassword.password ? "text" : "password"}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "gray" },
                                "&:hover fieldset": { borderColor: "black" },
                                "&.Mui-focused fieldset": { borderColor: "#008044" }
                            },
                            "& .MuiInputLabel-root": { color: "gray" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#364153" }
                        }}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    disableRipple
                                    onClick={() =>
                                        setIsVisiblePassword((prev) => ({
                                            ...prev,
                                            password: !prev.password
                                        }))
                                    }>
                                    {isVisiblePassword.password ? (
                                        <VisibilityOutlinedIcon />
                                    ) : (
                                        <VisibilityOffOutlinedIcon />
                                    )}
                                </IconButton>
                            )
                        }}
                        error={validData.password.error}
                        helperText={validData.password.message}
                        value={inputValue.password}
                        onChange={(e) => {
                            setInputValue((prev) => ({ ...prev, password: e.target.value }));
                            setValidData((prev) => ({
                                ...prev,
                                password: { error: false, message: "" }
                            }));
                        }}
                    />
                    <TextField
                        size="small"
                        fullWidth
                        label="Confirm Password"
                        type={isVisiblePassword.confirmPassword ? "text" : "password"}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "gray" },
                                "&:hover fieldset": { borderColor: "black" },
                                "&.Mui-focused fieldset": { borderColor: "#008044" }
                            },
                            "& .MuiInputLabel-root": { color: "gray" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#364153" }
                        }}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    disableRipple
                                    onClick={() =>
                                        setIsVisiblePassword((prev) => ({
                                            ...prev,
                                            confirmPassword: !prev.confirmPassword
                                        }))
                                    }>
                                    {isVisiblePassword.confirmPassword ? (
                                        <VisibilityOutlinedIcon />
                                    ) : (
                                        <VisibilityOffOutlinedIcon />
                                    )}
                                </IconButton>
                            )
                        }}
                        error={validData.confirmPassword.error}
                        helperText={validData.confirmPassword.message}
                        value={inputValue.confirmPassword}
                        onChange={(e) => {
                            setInputValue((prev) => ({ ...prev, confirmPassword: e.target.value }));
                            setValidData((prev) => ({
                                ...prev,
                                confirmPassword: { error: false, message: "" }
                            }));
                        }}
                    />
                    <Box
                        width="100%"
                        bgcolor="#e7f0f7"
                        padding={2}
                        borderRadius={2}
                        color="#767676"
                        fontSize="14px">
                        <p>Your password must have at least:</p>
                        <List disablePadding>
                            <ListItem disablePadding sx={{ paddingX: 2 }}>
                                8 characters long!
                            </ListItem>
                            <ListItem disablePadding sx={{ paddingX: 2 }}>
                                1 uppercase letter!
                            </ListItem>
                            <ListItem disablePadding sx={{ paddingX: 2 }}>
                                1 lowercase letter!
                            </ListItem>
                            <ListItem disablePadding sx={{ paddingX: 2 }}>
                                1 number!
                            </ListItem>
                            <ListItem disablePadding sx={{ paddingX: 2 }}>
                                1 special character (!@#$%^&*)
                            </ListItem>
                        </List>
                    </Box>
                    <Button
                        fullWidth
                        sx={{
                            paddingY: "10px",
                            backgroundColor: "#333",
                            color: "#fafafa",
                            textTransform: "none",
                            borderRadius: "8px"
                        }}
                        type="submit">
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SignUpPC;
