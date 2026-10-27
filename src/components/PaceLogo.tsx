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
      {/* Precision Vector Insignia */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
      >
        <defs>
          <linearGradient id="paceMaroonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A001A" />
            <stop offset="50%" stopColor="#7A0016" />
            <stop offset="100%" stopColor="#50000E" />
          </linearGradient>
          <linearGradient id="paceGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E59819" />
            <stop offset="50%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>

        {/* Outer Shield / Octagon Foundation */}
        <rect
          x="3"
          y="3"
          width="58"
          height="58"
          rx="14"
          fill="url(#paceMaroonGrad)"
          stroke="#F5A623"
          strokeWidth="2.5"
        />

        {/* Dynamic Architectural Career Step Chevron / 'P' Silhouette */}
        <path
          d="M20 46V18H34C40.6274 18 46 22.4772 46 28C46 33.5228 40.6274 38 34 38H28V46H20Z"
          fill="white"
        />
        <path
          d="M28 25H33.5C36.5376 25 39 26.3431 39 28C39 29.6569 36.5376 31 33.5 31H28V25Z"
          fill="#7A0016"
        />

        {/* Ascending Chevron / North-East Vector (Symbolizing Professional Advancement) */}
        <path
          d="M34 16L45 16L45 27"
          stroke="url(#paceGoldGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 33L44 17"
          stroke="url(#paceGoldGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Gold Base Anchor Dot */}
        <circle cx="24" cy="46" r="2.5" fill="#FFD700" />
      </svg>

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
