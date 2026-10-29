import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export default function Input({
  label,
  error,
  hint,
  icon,
  rightElement,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-white/70"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          {...props}
          className={`
            w-full bg-white/5 border rounded-xl py-3 text-white
            placeholder-white/30 transition-all duration-300
            focus:outline-none focus:ring-2 
            ${icon ? "pl-10" : "pl-4"}
            ${rightElement ? "pr-10" : "pr-4"}
            ${
              error
                ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
                : "border-white/12 focus:border-[#F5A623]/60 focus:ring-[#F5A623]/20 hover:border-white/20"
            }
            ${className}
          `}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1">
          <svg
            className="w-3 h-3 flex-shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 3.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5zm.75 7a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
          </svg>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-white/30 text-xs">{hint}</p>
      )}
    </div>
  );
}
