import { ExpandLess, MoreVert } from "@mui/icons-material";

interface IProductDetailsToggleButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ProductDetailsToggleButton({
  isExpanded,
  onToggle,
}: IProductDetailsToggleButtonProps) {
  const buttonClassName = isExpanded
    ? "theme-button p-1 rounded-lg border-2 transition-all duration-200"
    : "theme-button p-1.5 md:p-2 rounded-lg transition-all duration-200 hover:shadow-md";

  return (
    <button
      onClick={onToggle}
      className={buttonClassName}
      type="button"
      aria-label={isExpanded ? "Hide product details" : "Show product details"}
    >
      {isExpanded ? <ExpandLess className="w-3 h-3" /> : <MoreVert className="w-4 h-4" />}
    </button>
  );
}
