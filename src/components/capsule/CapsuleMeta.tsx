"use client";

import { Text } from "@/components/ui/Text";

type Props = {
  description: string;
  entriesCount?: number;
  status?: string;
};

export const CapsuleMeta = ({
  description,
  entriesCount = 0,
  status = "Active Archive",
}: Props) => {
  return (
    <div className="space-y-6 mb-12">
      <Text className="text-neutral-600 leading-relaxed text-lg">
        {description}
      </Text>

      <div className="flex gap-3 flex-wrap">
        <button className="px-5 py-2 bg-[#F6E9D6] rounded-full text-xs font-bold text-capsule_orange tracking-widest uppercase">
          {entriesCount} Entries
        </button>

        <button className="px-5 py-2 bg-[#D1E5DE] rounded-full text-xs font-bold text-capsule_green tracking-widest uppercase">
          {status}
        </button>
      </div>
    </div>
  );
};
