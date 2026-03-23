interface IHomeInfoCardProps {
  title: string;
  description: string;
}

export default function HomeInfoCard({ title, description }: IHomeInfoCardProps) {
  return (
    <div
      className="
        bg-white p-6 rounded-xl
        shadow-lg hover:shadow-xl
        transition-all duration-300
        border border-amber-200
      "
    >
      <h2
        className="
          text-2xl font-semibold text-amber-900
          mb-4 pb-2
          border-b-2 border-amber-200
        "
      >
        {title}
      </h2>
      <p
        className="
          text-amber-800 leading-relaxed
          text-justify
        "
      >
        {description}
      </p>
    </div>
  );
}
