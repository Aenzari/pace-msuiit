import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "gold";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#7A0016] hover:bg-[#9B0020] text-white shadow-lg hover:shadow-[#7A0016]/40 hover:shadow-xl border border-[#9B0020]/50",
  secondary:
    "bg-[#1A1A2E] hover:bg-[#16213E] text-white shadow-lg hover:shadow-black/30 border border-white/10 hover:border-white/20",
  gold:
    "bg-[#F5A623] hover:bg-[#FFD700] text-[#0F0F0F] font-bold shadow-lg hover:shadow-[#F5A623]/40 hover:shadow-xl border border-[#C8851C]/30",
  ghost:
    "bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-white/40",
  outline:
    "bg-transparent hover:bg-[#7A0016]/10 text-[#9B0020] border border-[#7A0016] hover:border-[#9B0020] hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3 text-base rounded-xl",
  xl: "px-8 py-4 text-lg rounded-2xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center font-semibold transition-all duration-300 
        active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
        focus:ring-[#F5A623]/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
