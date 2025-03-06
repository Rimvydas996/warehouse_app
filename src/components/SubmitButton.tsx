import React from "react";

interface SubmitButtonProps {
  buttonText: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ buttonText }) => {
  return (
    <button
      type="submit"
      className="
                w-full py-2 px-4
                bg-gradient-to-r from-amber-400 to-amber-500
                hover:from-amber-500 hover:to-amber-600
                text-white font-semibold
                rounded-lg shadow-md
                hover:shadow-lg
                transition duration-200
                focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
              "
    >
      {buttonText}
    </button>
  );
};

export default SubmitButton;
