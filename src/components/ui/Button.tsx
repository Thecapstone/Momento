"use client";

import { ReactNode } from "react";

type ButtonProps = {
  text?: string;
  icon?: ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;

  width?: "full" | "fit";
  rounded?: "full" | "lg" | "md";

  className?: string;
};
const widthStyles = {
  full: "w-full",
  fit: "w-fit",
};

const roundedStyles = {
  full: "rounded-full",
  lg: "rounded-xl",
  md: "rounded-lg",
};

export const Button = ({
  text,
  icon,
  onClick,
  loading = false,
  disabled = false,
  width = "fit",
  rounded = "full",
  className = "",
}: ButtonProps) => {
  if (!text && !icon && !loading) return null;

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex items-center justify-center gap-2
        px-8 py-3
        bg-[#3C5D52] text-[#F2E1C3]
        shadow-lg
        transition-colors
        ${widthStyles[width]}
        ${roundedStyles[rounded]}
        ${loading || disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-[#3C5D52]/80"}
        ${className}
      `}
    >
      {/* Loader */}
      {loading && (
        <span className="w-4 h-4 border-2 border-[#F2E1C3] border-t-transparent rounded-full animate-spin" />
      )}

      {/* Content */}
      {!loading && (
        <>
          {text && <span>{text}</span>}
          {icon && <span className="flex items-center">{icon}</span>}
        </>
      )}
    </button>
  );
};
