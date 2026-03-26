"use client";

import { useState, ReactNode } from "react";
import {
  PlusCircleIcon,
  UserCircleIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import SideBar from "@/components/home/SideBar";

const menuItems = [
  {
    label: "Create Capsule",
    icon: <PlusCircleIcon className="w-5 h-5" />,
    href: "/create",
  },
  {
    label: "Profile & Stats",
    icon: <UserCircleIcon className="w-5 h-5" />,
    href: "/profile",
  },
  {
    label: "Logout",
    icon: <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />,
    href: "/logout",
    color: "text-red-400",
  },
];

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <SideBar menuItems={menuItems} sidebarIsOpen={setIsOpen} />

      <main
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "pl-64" : "pl-0 md:pl-20"
        }`}
      >
        <div className="w-full min-h-screen">{children}</div>
      </main>
    </div>
  );
};

export default HomeLayout;
