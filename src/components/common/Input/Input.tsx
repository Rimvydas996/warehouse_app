import type IInputProps from '../../../types/models/IInput';

const Input = ({ id, type, placeholder, value, onChange, label }: IInputProps): JSX.Element => {
    return (
        <div className='space-y-2 w-full'>
            <label htmlFor={id} className='block text-sm font-medium theme-label'>
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className='w-full px-4 py-3 theme-input focus:border-transparent placeholder:text-amber-300 transition duration-200'
            />
        </div>
    );
};

export default Input;
