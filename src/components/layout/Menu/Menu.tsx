import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { LiProduct } from "../../common";
import WarehouseSwitcher from "../WarehouseSwitcher/WarehouseSwitcher";

export default function Menu() {
    const [open, setOpen] = useState(false);
    const { theme, setTheme, themes } = useTheme();
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    return (
        // ==================================
        // Mobile
        // ==================================
        <>
            {!open && (
                <div className="justify-between items-center ">
                    <button className="theme-button-strong p-1 m-0 rounded-full" onClick={() => setOpen(!open)}>
                        {" "}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            )}
            {open && (
                <div className="fixed top-0 theme-card right-0 w-xl flex flex-col items-center justify-start p-4 shadow-lg">
                    <button
                        className="theme-button-strong p-1 m-0 rounded-full self-end"
                        onClick={() => setOpen(!open)}
                    >
                        {" "}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <ul className="flex flex-col m-2 gap-2 w-full">
                        {isAuthenticated && (
                            <LiProduct
                                onClick={() => {
                                    logout();
                                    setOpen(false);
                                }}
                            >
                                Logout
                            </LiProduct>
                        )}
                        {!isAuthenticated && (
                            <LiProduct
                                onClick={() => {
                                    navigate("/login");
                                    setOpen(false);
                                }}
                            >
                                Login
                            </LiProduct>
                        )}
                        {isAuthenticated && (
                            <div className="lg:hidden flex flex-col gap-2 w-full">
                                <div className="w-full">
                                    <WarehouseSwitcher />
                                </div>
                                <LiProduct
                                    onClick={() => {
                                        navigate("/products");
                                        setOpen(false);
                                    }}
                                >
                                    Products
                                </LiProduct>
                                <LiProduct
                                    onClick={() => {
                                        navigate("/warehouse/manage");
                                        setOpen(false);
                                    }}
                                >
                                    Manage Warehouse
                                </LiProduct>
                                <LiProduct
                                    onClick={() => {
                                        navigate("/warehouse/refill-needed");
                                        setOpen(false);
                                    }}
                                >
                                    Refill Needed
                                </LiProduct>
                            </div>
                        )}
                    </ul>
                    <div className="w-full mt-4">
                        <label className="theme-label text-sm font-medium mb-2 block">Theme</label>
                        <select
                            value={theme}
                            onChange={(event) => setTheme(event.target.value as typeof theme)}
                            className="theme-button w-full px-4 h-10 rounded-lg"
                        >
                            {themes.map((themeOption) => (
                                <option key={themeOption} value={themeOption}>
                                    {themeOption}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            {/* Desktop menu removed; burger is used on all screen sizes */}
        </>
    );
}
