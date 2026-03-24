interface IHomeHeaderProps {
    title: string;
}

export default function HomeHeader({ title }: IHomeHeaderProps) {
    return (
        <h1
            className='
        text-4xl font-bold theme-label
        border-l-4 border-amber-400
        pl-4 mb-12
        bg-gradient-to-r from-amber-200 to-transparent
        py-3 rounded-r-lg
      '
        >
            {title}
        </h1>
    );
}
