interface IHomeImageCardProps {
  imageSrc: string;
  altText: string;
}

export default function HomeImageCard({ imageSrc, altText }: IHomeImageCardProps) {
  return (
    <div className="theme-card theme-card-elevated p-6">
      <img src={imageSrc} alt={altText} className="w-full h-auto rounded-xl" />
    </div>
  );
}
