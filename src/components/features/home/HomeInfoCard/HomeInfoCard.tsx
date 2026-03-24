interface IHomeInfoCardProps {
    title: string;
    description: string;
    tasks?: string;
}

export default function HomeInfoCard({ title, description, tasks }: IHomeInfoCardProps) {
    return (
        <div className='theme-card theme-card-elevated p-6 transition-all duration-300 hover:shadow-xl flex flex-col gap-4'>
            <h2
                className='
          text-2xl font-semibold theme-label text-center
          pb-2
          border-b-2 border-amber-200
        '
            >
                {title}
            </h2>
            <div className='space-y-3'>
                <div>
                    <p className='text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1 text-left'>
                        Aprašymas
                    </p>
                    <p className='theme-muted leading-relaxed font-semibold text-left'>{description}</p>
                </div>
                {tasks ? (
                    <div>
                        <p className='text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1 text-left'>
                            Užduotys
                        </p>
                        <p className='theme-muted leading-relaxed whitespace-pre-line text-left'>{tasks}</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
