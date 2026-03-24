import type { FormEvent, ReactNode } from 'react';

interface FormProps {
    children: ReactNode;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, onSubmit }: FormProps): JSX.Element {
    return (
        <form action='' onSubmit={onSubmit} className='space-y-6 w-full' data-testid='form'>
            {children}
        </form>
    );
}
