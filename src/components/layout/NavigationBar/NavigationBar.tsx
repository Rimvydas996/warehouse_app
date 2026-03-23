import { useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";

export default function NavigationBar(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div
      className={`
      flex justify-between items-center p-4 w-full 
      bg-gradient-to-r from-amber-400 to-amber-300
      shadow-lg rounded-lg 
    `}
    >
      <h3
        onClick={() => navigate("/")}
        className="theme-link text-xl font-bold cursor-pointer transition-colors duration-200 px-4 py-2 rounded-lg"
      >
        Warehouse
      </h3>
      <Menu />
    </div>
  );
}
