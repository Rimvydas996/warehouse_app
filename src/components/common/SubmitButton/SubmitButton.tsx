import React from "react";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

interface SubmitButtonProps {
  buttonText: string;
  isLoading?: boolean;
  disabled?: boolean;
  loadingText?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  buttonText,
  isLoading = false,
  disabled = false,
  loadingText = "Loading...",
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="submit"
      className="
        theme-button-strong
        w-full py-2 px-4
        font-semibold
        rounded-lg shadow-md
        hover:shadow-lg
        transition duration-200
        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed
      "
      disabled={isDisabled}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <LoadingIndicator
          label={loadingText}
          size="sm"
          labelClassName="text-white text-sm"
          spinnerClassName="border-white/60 border-t-white"
        />
      ) : (
        buttonText
      )}
    </button>
  );
};

export default SubmitButton;
