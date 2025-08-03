import React from "react";
import IconSelector from "./IconSelector";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  icon,
  variant = "primary",
  className = "",
}) => {
  const baseClasses =
    "relative overflow-hidden font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group";

  const variantClasses = {
    primary:
      "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-purple-600/20 border border-purple-500/50 hover:bg-purple-600/30 text-white backdrop-blur-sm",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {/* Flare/Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

      {/* Content */}
      <div className="relative z-10 flex items-center space-x-2">
        {icon && <IconSelector icon={icon} size={20} />}
        <span>{children}</span>
      </div>
    </button>
  );
};

export default Button;
