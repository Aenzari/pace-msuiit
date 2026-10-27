"use client";

import { motion } from "framer-motion";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  glow?: "maroon" | "gold" | "none";
}

export default function Card({
  children,
  className = "",
  hover = false,
  onClick,
  glow = "none",
}: CardProps) {
  const glowStyles = {
    maroon: "hover:shadow-[0_0_40px_rgba(122,0,22,0.35),0_0_80px_rgba(122,0,22,0.15)]",
    gold: "hover:shadow-[0_0_30px_rgba(245,166,35,0.3),0_0_60px_rgba(245,166,35,0.1)]",
    none: "hover:shadow-2xl hover:shadow-black/40",
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.25 }}
      className={`
        glass rounded-2xl border border-white/10 transition-all duration-300
        ${glow !== "none" ? glowStyles[glow] : "hover:shadow-2xl hover:shadow-black/40"}
        ${onClick ? "cursor-pointer" : ""}
        ${hover ? "hover:border-white/20" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
