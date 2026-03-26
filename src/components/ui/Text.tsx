"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type TextProps = {
  children?: ReactNode;
  variant?: "hero" | "heroSub" | "title" | "body" | "small";
  color?: "primary" | "muted" | "accent" | "white" | "green";
  as?: "p" | "span" | "div";
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
    hero: "font-extrabold text-3xl md:text-6xl",

    heroSub: "font-normal text-2xl md:text-3xl",

    title: "font-bold text-3xl md:text-4xl",

    body: "text-base",

    small: "text-sm",
  };

  const colors = {
    primary: "text-black",
    muted: "text-gray-400",
    accent: "text-capsule_amber_200",
    white: "text-white",
    green:"text-capsule_green"
  };

  const Component = animate ? motion[as] : as;

  return (
    <Component
      className={`${variants[variant]} ${colors[color]} ${className}`}
    >
      {children}
    </Component>
  );
};