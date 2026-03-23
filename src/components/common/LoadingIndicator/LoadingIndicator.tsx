interface ILoadingIndicatorProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  labelClassName?: string;
  spinnerClassName?: string;
}

const SIZE_CLASSES: Record<NonNullable<ILoadingIndicatorProps["size"]>, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-4",
};

export default function LoadingIndicator({
  label = "Loading...",
  size = "md",
  className,
  labelClassName,
  spinnerClassName,
}: ILoadingIndicatorProps) {
  const spinnerClasses =
    spinnerClassName ?? "border-amber-200 border-t-amber-700";

  return (
    <div
      className={`inline-flex items-center gap-2 ${className ?? ""}`}
      role="status"
      aria-live="polite"
    >
      <span
        className={`animate-spin rounded-full ${SIZE_CLASSES[size]} ${spinnerClasses}`}
        aria-hidden="true"
      />
      {label && (
        <span className={labelClassName ?? "text-amber-900 text-sm font-medium"}>
          {label}
        </span>
      )}
    </div>
  );
}
