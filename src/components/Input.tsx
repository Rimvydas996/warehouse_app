import React from "react";

interface InputProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Input = ({ id, type, placeholder, value, onChange, label }: InputProps): JSX.Element => {
  return (
    <div className="space-y-2 w-full">
      <label htmlFor={id} className="block text-sm font-medium text-amber-900">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder:text-amber-300 transition duration-200 text-amber-900"
      />
    </div>
  );
};

export default Input;
