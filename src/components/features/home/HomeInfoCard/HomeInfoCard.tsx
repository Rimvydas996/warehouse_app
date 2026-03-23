interface IHomeInfoCardProps {
  title: string;
  description: string;
}

export default function HomeInfoCard({ title, description }: IHomeInfoCardProps) {
  return (
    <div className="theme-card theme-card-elevated p-6 transition-all duration-300 hover:shadow-xl">
      <h2
        className="
          text-2xl font-semibold theme-label
          mb-4 pb-2
          border-b-2 border-amber-200
        "
      >
        {title}
      </h2>
      <p
        className="
          theme-muted leading-relaxed
          text-justify
        "
      >
        {description}
      </p>
    </div>
  );
}
