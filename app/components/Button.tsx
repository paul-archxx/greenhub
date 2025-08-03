import React from "react";
import IconSelector from "./IconSelector";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: string;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  icon,
  variant = "primary",
  className = "",
}) => {
  const baseClasses =
    "relative overflow-hidden font-semibold py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 group shadow-lg";

  const variantClasses = {
    primary:
      "bg-purple-700 hover:bg-purple-700 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(139,92,246,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.4),0_6px_20px_rgba(139,92,246,0.6)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.1)] active:transform active:scale-95",
    secondary:
      "bg-purple-600/20 border border-purple-500/50 hover:bg-purple-600/30 text-white backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.2),0_2px_8px_rgba(139,92,246,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(139,92,246,0.3)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_-1px_0_rgba(255,255,255,0.05)] active:transform active:scale-95",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} !shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.4),0_6px_20px_rgba(139,92,246,0.4)] cursor-pointer ${
        variantClasses[variant]
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {/* Inner shadow overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/10 rounded-xl pointer-events-none" />

      {/* Flare/Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

      {/* Content */}
      <div className="relative z-10 flex items-center space-x-2">
        {/* {icon && <IconSelector icon={icon} size={20} />} */}
        <span>{children}</span>
      </div>
    </button>
  );
};

export default Button;
