interface ILiProductProps {
  children: string;
  onClick: () => void;
}

export default function LiProduct({ children, onClick }: ILiProductProps) {
  return (
    <li
      onClick={onClick}
      className="
  bg-amber-200 px-4 py-2
  rounded-lg border-2 border-amber-500
  hover:bg-amber-300 cursor-pointer
  transition-all duration-200
  font-medium text-amber-900
  hover:shadow-md
"
    >
      {children}
    </li>
  );
}
