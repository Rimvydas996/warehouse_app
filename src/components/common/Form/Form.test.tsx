import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Form from './Form';

describe('Form Component', () => {
    const mockSubmit = vi.fn((e) => e.preventDefault());

    const defaultProps = {
        children: (
            <>
                <label htmlFor='email'>
                    Email
                    <input type='email' id='email' name='email' data-testid='email-input' aria-label='Email input' />
                </label>
                <label htmlFor='password'>
                    Password
                    <input
                        type='password'
                        id='password'
                        name='password'
                        data-testid='password-input'
                        aria-label='Password input'
                    />
                </label>
                <button type='submit' data-testid='submit-button' aria-label='Submit form'>
                    Submit
                </button>
            </>
        ),
        onSubmit: mockSubmit,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Rendering', () => {
        it('should render form with all elements', () => {
            render(<Form {...defaultProps}>{defaultProps.children}</Form>);

            expect(screen.getByTestId('form')).toBeInTheDocument();
            expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
            expect(screen.getByRole('button')).toBeInTheDocument();
        });
    });

    describe('Form Submission', () => {
        it('should call onSubmit handler when form is submitted', () => {
            render(<Form {...defaultProps}>{defaultProps.children}</Form>);

            const form = screen.getByTestId('form');
            fireEvent.submit(form);

            expect(mockSubmit).toHaveBeenCalled();
        });
    });
});
