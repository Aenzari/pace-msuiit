import React from "react";

type BadgeVariant = "maroon" | "gold" | "glass" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  size?: "sm" | "md";
}

const variantStyles: Record<BadgeVariant, string> = {
  maroon:
    "bg-[#7A0016]/30 text-[#F5A623] border border-[#7A0016]/50",
  gold:
    "bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30",
  glass:
    "bg-white/8 text-white/70 border border-white/12 backdrop-blur-sm",
  success:
    "bg-green-500/15 text-green-400 border border-green-500/30",
  warning:
    "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  danger:
    "bg-red-500/15 text-red-400 border border-red-500/30",
  info:
    "bg-blue-500/15 text-blue-400 border border-blue-500/30",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs rounded-md",
  md: "px-3 py-1 text-xs rounded-lg",
};

export default function Badge({
  children,
  variant = "glass",
  className = "",
  size = "md",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 font-medium whitespace-nowrap
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
