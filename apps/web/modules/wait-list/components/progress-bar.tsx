interface ProgressBarProps {
  progress: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  showLabel?: boolean;
  animate?: boolean;
}

const ProgressBar = ({
  progress,
  max = 100,
  size = "md",
  color = "primary",
  showLabel = false,
  animate = true,
}: ProgressBarProps) => {
  // Ensure progress stays within bounds
  const normalizedProgress = Math.min(Math.max(0, progress), max);
  const percentage = (normalizedProgress / max) * 100;

  // Size variations
  const sizeClasses = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6",
  };

  // Color variations
  const colorClasses = {
    primary: "bg-blue-600",
    secondary: "bg-[#FFBE0A]",
    success: "bg-green-600",
    warning: "bg-yellow-500",
    danger: "bg-red-600",
  };

  return (
    <div className="w-full">
      <div className="w-full bg-[#282828] rounded-full overflow-hidden">
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-500 ${
            animate ? "transition-width" : ""
          }`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={normalizedProgress}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-gray-600">
          {percentage.toFixed(1)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
