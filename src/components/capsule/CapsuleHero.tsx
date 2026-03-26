"use client";

import Image from "next/image";
import { Text } from "@/components/ui/Text";

type Props = {
  image?: string;
  title: string;
  volume?: string;
};

export const CapsuleHero = ({ image, title, volume = "Volume I" }: Props) => {
  return (
    <div className="relative w-full max-h-125 rounded-4xl overflow-hidden shadow-2xl mb-12 flex items-center justify-center bg-black/5">
      <Image
        src={image || "/images/proj_cover.png"}
        width={1200}
        height={800}
        alt="Cover"
        className="w-full h-auto object-contain"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />

      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between text-white">
        <Text variant="small" color="white" className="opacity-40">
          Project Cover
        </Text>

        <div className="space-y-2">
          <Text className="text-white/60 tracking-[0.3em] text-xs">
            {volume}
          </Text>

          <Text variant="hero" color="white" className="italic leading-[0.95]">
            {title}
          </Text>

          <div className="pt-4 flex justify-between items-center opacity-40 border-t border-white/20">
            <Text color="white" className="text-[10px]">ARCHIVE</Text>

            <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
