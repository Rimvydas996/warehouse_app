interface IHomeImageCardProps {
  imageSrc: string;
  altText: string;
}

export default function HomeImageCard({ imageSrc, altText }: IHomeImageCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <img src={imageSrc} alt={altText} className="w-full h-auto rounded-xl" />
    </div>
  );
}
