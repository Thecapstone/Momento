"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextProps = {
  children?: ReactNode;
  variant?: "hero" | "heroSub" | "title" | "body" | "small" | "label";
  color?: "primary" | "muted" | "accent" | "white" | "green";
  as?: "h1" | "h2" | "p" | "span" | "div";
  animate?: boolean;
  className?: string;
};

export const Text = ({
  children,
  variant = "body",
  color = "primary",
  as = "p",
  animate = false,
  className = "",
}: TextProps) => {
  const variants = {
    hero: "font-serif font-medium text-5xl md:text-7xl tracking-tight",

    title: "font-serif font-medium text-3xl md:text-4xl",

    heroSub:
      "font-sans font-light text-xl md:text-2xl tracking-wide opacity-80",

    body: "font-sans text-base leading-relaxed",

    small: "font-sans text-sm",

    label:
      "font-sans text-[10px] font-bold tracking-[0.2em] uppercase opacity-70",
  };

  const colors = {
    primary: "text-black",
    muted: "text-gray-400",
    accent: "text-capsule_amber_200",
    white: "text-white",
    green: "text-capsule_green",
  };

  const Component = animate ? (motion as any)[as] : as;

  return (
    <Component className={`${variants[variant]} ${colors[color]} ${className}`}>
      {children}
    </Component>
  );
};
