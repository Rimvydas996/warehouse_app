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
    ? `
        bg-amber-200 p-1
        border-2 border-amber-900 rounded-lg
        hover:bg-amber-300
        transition-all duration-200
      `
    : `
        bg-amber-200 p-1.5 md:p-2
        rounded-lg border border-amber-300
        hover:bg-amber-300 hover:shadow-md
        transition-all duration-200
        text-amber-900
      `;

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
