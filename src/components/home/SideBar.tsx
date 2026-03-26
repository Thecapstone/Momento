import React, { JSX, useEffect, useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

type MenuItems = (
  | {
      label: string;
      icon: JSX.Element;
      href: string;
      color?: undefined;
    }
  | {
      label: string;
      icon: JSX.Element;
      href: string;
      color: string;
    }
)[];

const SideBar = ({
  menuItems,
  sidebarIsOpen,
}: {
  menuItems: MenuItems;
  sidebarIsOpen: (state: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    sidebarIsOpen(isOpen);
  }, [isOpen, sidebarIsOpen]);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-50 bg-capsule_amber border-r border-capsule_amber_200 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col`}
    >
      {/* Toggle Button Card - Floating slightly off the sidebar edge */}
      <div className="absolute -right-5 top-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 bg-capsule_green border border-capsule_amber_200 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all group"
        >
          <ChevronLeftIcon
            className={`w-5 h-5 text-capsule_amber_700 transition-transform duration-500 ${
              !isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Brand / Logo Area */}
      <div className="flex items-center px-6 pt-10">
        <span
          className={`font-bold text-xl text-black transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4 pointer-events-none"
          }`}
        >
          Time Capsule
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-14 px-4 space-y-4">
        {menuItems.map((item, idx) => (
          <SidebarItem key={idx} {...item} isOpen={isOpen} />
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
