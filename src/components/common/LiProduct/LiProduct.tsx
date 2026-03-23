interface ILiProductProps {
  children: string;
  onClick: () => void;
}

export default function LiProduct({ children, onClick }: ILiProductProps) {
  return (
    <li
      onClick={onClick}
      className="
  theme-button px-4 py-2
  rounded-lg border-2 cursor-pointer
  transition-all duration-200
  font-medium
  hover:shadow-md
"
    >
      {children}
    </li>
  );
}
