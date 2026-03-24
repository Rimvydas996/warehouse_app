import type { ReactNode } from 'react';

interface ProductsPageLayoutProps {
    title: string;
    children: ReactNode;
    headerActions?: ReactNode;
    headerBottom?: ReactNode;
    refillCount?: number;
}

export default function ProductsPageLayout({
    title,
    children,
    headerActions,
    headerBottom,
    refillCount,
}: ProductsPageLayoutProps) {
    return (
        <div className='rounded-2xl bg-gradient-to-r my-3 md:my-5 from-amber-400 to-amber-300 py-4 md:py-8 px-2 md:px-4'>
            <div className='max-w-5xl mx-auto'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 md:mb-8'>
                    <h1 className='text-2xl md:text-3xl font-bold theme-label text-center md:text-left'>
                        {title}
                        {typeof refillCount === 'number' && refillCount > 0 ? (
                            <span className='ml-2 inline-flex items-center justify-center text-xs font-semibold bg-red-600 text-white px-2 py-0.5 rounded-full align-middle'>
                                {refillCount}
                            </span>
                        ) : null}
                    </h1>
                    {headerActions ? <div className='flex justify-center md:justify-end'>{headerActions}</div> : null}
                </div>
                {headerBottom ? <div className='mb-4 md:mb-8'>{headerBottom}</div> : null}
                {children}
            </div>
        </div>
    );
}
