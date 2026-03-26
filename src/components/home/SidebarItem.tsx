import Link from "next/link";
import { ReactNode } from "react";

type SidebarItemProps = {
  label: string;
  icon: ReactNode;
  href: string;
  isOpen: boolean;
  color?: string;
};

export const SidebarItem = ({
  label,
  icon,
  href,
  isOpen,
  color,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-xl
        transition-all duration-200
        hover:bg-capsule_amber_200/20
        active:scale-[0.98]
        ${color || "text-capsule_green"}
      `}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-5 h-5">
        {icon}
      </div>

      {/* Label */}
      <span
        className={`
          text-sm font-medium whitespace-nowrap
          transition-all duration-200
          ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
        `}
      >
        {label}
      </span>
    </Link>
  );
};