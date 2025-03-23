import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import "./index.css";

const PRIMARY_COLOR = {
    success: "#22C55E",
    error: "#EF4444",
    warning: "#EAB308",
    info: "#3B82F6"
};

function Toast({
    text = "Toast Message",
    title = "Toast Message",
    open = false,
    timeToClose = 2000,
    type = "success",
    progressBar = true,
    onClose, // Add onClose as a prop
    ...prev
}) {
    const [openToast, setOpenToast] = useState(false);
    const [primaryColor, setPrimaryColor] = useState(PRIMARY_COLOR.success);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleClose = useCallback(() => {
        setOpenToast(false);
        if (typeof onClose === "function") onClose();
    });
    useEffect(() => {
        if (!open) return;

        setOpenToast(true);
        setPrimaryColor(PRIMARY_COLOR[type] || PRIMARY_COLOR.success);

        const timeoutId = setTimeout(() => handleClose(), timeToClose);

        return () => clearTimeout(timeoutId);
    }, [open, type, timeToClose, handleClose]);

    return (
        <div
            {...prev}
            className={`min-w-2xs min-h-15 ${!openToast && "hidden"} fixed flex flex-col justify-center gap-1 top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg z-50 toast`}
            style={{ borderColor: primaryColor }}>
            
            <div className="flex justify-between items-center">
                <h4 style={{ color: primaryColor }} className="text-xl">
                    {title}
                </h4>
                {/* Close Button */}
                <button onClick={handleClose} className="ml-2 text-gray-500 hover:text-black">
                    ✖
                </button>
            </div>
            
            <p className="text-sm">{text}</p>
            
            {/* Progress Bar */}
            {progressBar && (
                <div
                    className="h-1 absolute bottom-0 left-0 progress-bar w-full"
                    style={{ backgroundColor: primaryColor, animationDuration: `${timeToClose}ms` }}>
                </div>
            )}
        </div>
    );
}

Toast.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    open: PropTypes.bool,
    timeToClose: PropTypes.number,
    type: PropTypes.oneOf(["success", "error", "warning", "info"]),
    progressBar: PropTypes.bool,
    onClose: PropTypes.func,
};

export default Toast;
