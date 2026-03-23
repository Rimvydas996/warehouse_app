interface ILiProductProps {
  children: string;
  onClick: () => void;
}

export default function LiProduct({ children, onClick }: ILiProductProps) {
  return (
    <li
      onClick={onClick}
      className="
  theme-button px-4 h-10
  rounded-lg border-2 cursor-pointer
  transition-all duration-200
  font-medium
  hover:shadow-md
  flex items-center
"
    >
      {children}
    </li>
  );
}
