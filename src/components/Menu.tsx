import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import LiProduct from "./LiProduct";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    // ==================================
    // Mobile
    // ==================================
    <>
      {!open && (
        <div className="md:hidden justify-between items-center ">
          <button className="bg-amber-600 p-1 m-0 rounded-full" onClick={() => setOpen(!open)}>
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
        <div className="md:hidden fixed top-0 bg-amber-100 dark:bg-gradient-to-r from-amber-800 to-amber-600 left-0 w-screen h-screen flex flex-col items-center justify-start p-4">
          <button
            className="bg-amber-600 p-1 m-0 rounded-full self-start"
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
          <ul className="flex m-2 ">
            {isAuthenticated ? (
              <>
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
                    logout();
                    setOpen(false);
                  }}
                >
                  Logout
                </LiProduct>
              </>
            ) : (
              !isAuthenticated && (
                <>
                  <LiProduct
                    onClick={() => {
                      navigate("/register");
                      setOpen(false);
                    }}
                  >
                    Register
                  </LiProduct>
                  <LiProduct
                    onClick={() => {
                      navigate("/login");
                      setOpen(false);
                    }}
                  >
                    Login
                  </LiProduct>
                </>
              )
            )}
          </ul>
          <button className="bg-amber-900 p-1 m-0 rounded-full" onClick={toggleTheme}>
            {" "}
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>
      )}
      {/* ================================== // Desktop // ================================== */}
      <div className="hidden md:flex justify-between items-center ">
        <ul className="flex m-2 ">
          {isAuthenticated ? (
            <>
              <LiProduct onClick={() => navigate("/products")}>Products</LiProduct>
              <LiProduct onClick={() => logout()}>Logout</LiProduct>
            </>
          ) : (
            !isAuthenticated && (
              <>
                <LiProduct onClick={() => navigate("/register")}>Register</LiProduct>
                <LiProduct onClick={() => navigate("/login")}>Login</LiProduct>
              </>
            )
          )}
        </ul>
        <button className="bg-gray-600 p-1 m-0 rounded-full" onClick={toggleTheme}>
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </div>
    </>
  );
}
