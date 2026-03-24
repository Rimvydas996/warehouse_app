import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Form, Input, SubmitButton } from '../../../common';
import { useAuth } from '../../../../context/AuthContext';

export default function LoginForm(): JSX.Element {
    const [error, setError] = useState<string | null>(null);
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const loginHandler = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setIsSubmitting(true);
            const loginStatus: boolean = await login(inputs);
            if (!loginStatus) {
                setError('Incorrect email or password');
                setIsSubmitting(false);
                return;
            }
            navigate('/');
            setInputs({ email: '', password: '' });
        } catch (error) {
            const errorMessage = error instanceof AxiosError ? error.response?.data.message : 'Unknown error';

            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <h2 className='text-3xl font-bold theme-label text-center mb-8'>Login to Warehouse</h2>

                <div className='theme-card theme-card-elevated p-8 w-full'>
                    <Form onSubmit={loginHandler}>
                        <Input
                            id='email'
                            type='email'
                            placeholder='Enter your email'
                            value={inputs.email}
                            onChange={(event) => setInputs({ ...inputs, email: event.target.value })}
                            label='Email'
                        />
                        <Input
                            id='password'
                            type='password'
                            placeholder='Enter your password'
                            value={inputs.password}
                            onChange={(event) => setInputs({ ...inputs, password: event.target.value })}
                            label='Password'
                        />
                        <SubmitButton buttonText='Login' isLoading={isSubmitting} loadingText='Signing in...' />
                    </Form>

                    {error && (
                        <div
                            className='
                mt-4 p-4 rounded-lg
                bg-red-50 border border-red-200
                text-red-600 text-center text-sm
              '
                        >
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
