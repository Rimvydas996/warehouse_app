import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function NavigationBar(): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  // className = "flex justify-between p-4 my-4 bg-amber-400";
  return (
    <div className="flex justify-between p-4 my-4 bg-amber-400">
      <h3 onClick={() => navigate("/")} className="bg-amber-200 self-center text-amber-900">
        Warehouse
      </h3>
      <ul className="flex gap-3">
        {isAuthenticated ? (
          <>
            <li
              onClick={() => navigate("/products")}
              className="bg-amber-200 p-0.5 border-4 rounded-2xl "
            >
              Products
            </li>
            <li
              onClick={() => navigate("/")}
              className="bg-amber-200 p-0.5 border-4 rounded-2xl  border-amber-700"
            >
              Logout
            </li>
          </>
        ) : (
          !isAuthenticated && (
            <>
              <li
                onClick={() => navigate("/register")}
                className="bg-amber-200 p-0.5 border-4 rounded-2xl  border-amber-700"
              >
                Register
              </li>
              <li
                onClick={() => navigate("/login")}
                className="bg-amber-200 p-0.5 border-4 rounded-2xl  border-amber-700"
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
