import { Button } from "@mui/material";
import "./index.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function DropDown({ name, children, right = false }) {
    return (
        <div className="dropdown">
            <Button
                sx={{
                    color: "#252525",
                    textTransform: "none",
                    fontSize: "16px",
                    borderRadius: "20px",
                    paddingX: 2,
                    ":hover": { backgroundColor: "#fbfaf8" }
                }}>
                {name}
                <div className="flex flex-row relative">
                    <ArrowDropDownIcon className="arrow-down" />
                    <ArrowDropUpIcon className="arrow-up" />
                </div>
            </Button>
            <div className={`dropdown-menu rounded-2xl ${right && "right-position"}`}>
                {children}
            </div>
        </div>
    );
}

export default DropDown;
