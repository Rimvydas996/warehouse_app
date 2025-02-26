import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function NavigationBar(): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <div
      className={`
      flex justify-between items-center p-4 my-4 
      bg-gradient-to-r from-amber-400 to-amber-300
      shadow-lg rounded-lg mx-4
    `}
    >
      <h3
        onClick={() => navigate("/")}
        className="
          text-amber-900 text-xl font-bold
          hover:text-amber-700 cursor-pointer
          transition-colors duration-200
          px-4 py-2 rounded-lg
        "
      >
        Warehouse
      </h3>

      <ul className="flex gap-4 items-center">
        {isAuthenticated ? (
          <>
            <li
              onClick={() => navigate("/products")}
              className="
                bg-amber-200 px-4 py-2
                rounded-lg border-2 border-amber-500
                hover:bg-amber-300 cursor-pointer
                transition-all duration-200
                font-medium text-amber-900
                hover:shadow-md
              "
            >
              Products
            </li>
            <li
              onClick={() => {
                logout();
              }}
              className="
                bg-amber-200 px-4 py-2
                rounded-lg border-2 border-amber-500
                hover:bg-amber-300 cursor-pointer
                transition-all duration-200
                font-medium text-amber-900
                hover:shadow-md
              "
            >
              Logout
            </li>
          </>
        ) : (
          !isAuthenticated && (
            <>
              <li
                onClick={() => navigate("/register")}
                className="
                  bg-amber-200 px-4 py-2
                  rounded-lg border-2 border-amber-500
                  hover:bg-amber-300 cursor-pointer
                  transition-all duration-200
                  font-medium text-amber-900
                  hover:shadow-md
                "
              >
                Register
              </li>
              <li
                onClick={() => navigate("/login")}
                className="
                  bg-amber-200 px-4 py-2
                  rounded-lg border-2 border-amber-500
                  hover:bg-amber-300 cursor-pointer
                  transition-all duration-200
                  font-medium text-amber-900
                  hover:shadow-md
                "
              >
                Login
              </li>
            </>
          )
        )}
      </ul>
      <button className="bg-gray-600 p-1 m-0 rounded-full" onClick={toggleTheme}>
        {" "}
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
    </div>
  );
}
