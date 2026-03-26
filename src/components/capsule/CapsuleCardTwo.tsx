"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Capsule = {
  id: string;
  title: string;
  description?: string;
  status: "draft" | "active" | "archived";
  entryCount?: number;
  coverImage?: string;
};

export const CapsuleCard = ({ capsule }: { capsule: Capsule }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/capsules/${capsule.id}`);
  };

  const statusStyles = {
    draft: "bg-gray-500/20 text-gray-300",
    active: "bg-green-500/20 text-green-300",
    archived: "bg-yellow-500/20 text-yellow-300",
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
    >
      {/* Cover */}
      <div className="relative h-60 w-full">
        <Image
          src={capsule.coverImage || "/placeholder.jpg"}
          alt={capsule.title}
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end">
          {/* Status */}
          <span
            className={`text-xs px-3 py-1 rounded-full w-fit mb-2 ${statusStyles[capsule.status]}`}
          >
            {capsule.status.toUpperCase()}
          </span>

          {/* Title */}
          <h3 className="text-white text-xl font-semibold">{capsule.title}</h3>

          {/* Meta */}
          {capsule.entryCount !== undefined && (
            <p className="text-gray-300 text-sm">
              {capsule.entryCount} entries
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
