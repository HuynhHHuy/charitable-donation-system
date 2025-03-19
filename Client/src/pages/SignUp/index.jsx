import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, TextField, IconButton, Box, List, ListItem, ListItemText } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import MainLogo from "../../assets/images/MainLogo.png";

function SignUp() {
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
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    useEffect(() => {
        document.title = "SignUp";
    }, []);

    return (
        <div className="py-26 px-16 w-full flex flex-col justify-center items-start">
            <Avatar src={MainLogo} alt="Main Logo" className="ml-auto mr-auto" />
            <h1 className="mt-6 text-3xl font-semibold text-gray-700">Create an Account</h1>
            <h2 className="mt-1 text-sm opacity-55">
                Already have an account?{" "}
                <Link to="/log-in" className="underline">
                    Sign In
                </Link>
            </h2>
            <form action="" className="mt-5 w-full flex flex-col gap-3">
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
                        setValidData((prev) => ({ ...prev, email: { error: false, message: "" } }));
                    }}
                />
                <TextField
                    size="small"
                    fullWidth
                    label="Password"
                    type={isVisiblePassword ? "text" : "password"}
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
                                onClick={() => setIsVisiblePassword((prev) => !prev)}>
                                {isVisiblePassword ? (
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
                    type={isVisiblePassword ? "text" : "password"}
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
                                onClick={() => setIsVisiblePassword((prev) => !prev)}>
                                {isVisiblePassword ? (
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
                        <ListItem disablePadding sx={{ paddingX: 2 }} >8 characters long!</ListItem>
                        <ListItem disablePadding sx={{ paddingX: 2 }} >1 uppercase letter!</ListItem>
                        <ListItem disablePadding sx={{ paddingX: 2 }} >1 lowercase letter!</ListItem>
                        <ListItem disablePadding sx={{ paddingX: 2 }} >1 number!</ListItem>
                        <ListItem disablePadding sx={{ paddingX: 2 }} >1 special character (!@#$%^&*)</ListItem>
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
                    Login
                </Button>
            </form>
            <div className="my-3 w-full flex flex-row justify-center items-center gap-2">
                <hr className="flex-1 border opacity-20" />
                <span>or</span>
                <hr className="flex-1 border opacity-20" />
            </div>
            {/* <Button
                fullWidth
                variant="outlined"
                sx={{
                    paddingY: 0,
                    borderColor: "#6f6f6f",
                    color: "#252525",
                    textTransform: "none",
                    borderRadius: "8px"
                }}
                startIcon={<Avatar src={GoogleIcon} alt="Google Icon" />}
                onClick={handleLoginWithGoogle}>
                Continue with Google
            </Button>
            <hr className="my-5 w-full border opacity-20" />
            <span className="mr-auto mb-2 text-sm">Haven't an account yet</span>
            <Button
                fullWidth
                sx={{
                    paddingY: "10px",
                    backgroundColor: "#333",
                    color: "#fafafa",
                    textTransform: "none",
                    borderRadius: "8px"
                }}
                onClick={() => navigate("/sign-up")}>
                Create an account
            </Button> */}
        </div>
    );
}

export default SignUp;
