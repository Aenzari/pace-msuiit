import React from "react";

export default function PaceLogo({
  size = 40,
  showText = true,
  variant = "light", // 'light' (on white/light gray) or 'dark' (on maroon/navy)
}: {
  size?: number;
  showText?: boolean;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <div className="inline-flex items-center gap-3 select-none">
      <img
        src="/msuiit-logo.png"
        alt="MSU-Iligan Institute of Technology"
        width={size}
        height={size}
        className="shrink-0 object-contain drop-shadow-sm"
      />

      {/* Typographic Lockup */}
      {showText && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight text-lg sm:text-xl ${
                isDark ? "text-white" : "text-[#0F172A]"
              }`}
            >
              P.A.C.E.
            </span>
            <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-[#FFF3D6] text-[#7A0016] border border-[#F5A623]/60 uppercase tracking-wider">
              MSU-IIT
            </span>
          </div>
          <span
            className={`text-[10px] font-medium tracking-wide mt-1 uppercase ${
              isDark ? "text-stone-300" : "text-[#64748B]"
            }`}
          >
            Career Ecosystem
          </span>
        </div>
      )}
    </div>
  );
}
