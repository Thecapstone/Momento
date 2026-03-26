import { useState } from "react";
import {
  SparklesIcon,
  Squares2X2Icon,
  LockClosedIcon,
  GlobeAltIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { VisibilityCard } from "./VisibilityCard";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { CapsuleCard } from "./CapsuleCard";

export const CreateCapsuleForm = () => {
  const [visibility, setVisibility] = useState<"private" | "public">("private");

  return (
    <div className="max-w-xl mx-auto p-6 bg-capsule_amber">
      {/* Header Section */}
      <div className="mb-10 text-center md:text-left">
        <Text variant="hero" as="h1" className="text-center mb-4">
          Create Capsule
        </Text>
        <Text variant="heroSub" className="text-center">
          Preserve a moment in the digital strata.
        </Text>
      </div>

      <CapsuleCard>
        {/* Capsule Name Input */}
        {/* todo(refactor): move the input fields into a seprate container
              mapover an arrary of inputs and actions to render inputs and fields*/}
        <div className="mb-8">
          <label className="block text-[10px] font-bold tracking-widest text-neutral-500 uppercase mb-3 ml-2">
            Capsule Name
          </label>
          <div className="relative group">
            <SparklesIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
            <input
              type="text"
              placeholder="e.g., Summer of '24 Observations"
              className="w-full bg-[#FDF2E3] border border-transparent focus:border-[#EADCC7] focus:ring-0 rounded-2xl py-6 pl-12 pr-4 text-neutral-700 placeholder:text-neutral-400 transition-all outline-none"
            />
          </div>
        </div>
        {/* Archive Category Select */}
        <div className="mb-8">
          <label className="block text-[10px] font-bold tracking-widest text-neutral-500 uppercase mb-3 ml-2">
            Archive Category
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Squares2X2Icon className="w-5 h-5 text-neutral-500" />
            </div>
            <select className="w-full appearance-none bg-[#FDF2E3] border border-transparent rounded-2xl py-4 pl-12 pr-12 text-neutral-700 focus:border-[#EADCC7] outline-none cursor-pointer">
              <option>Visual Journal</option>
              <option>Technical Log</option>
              <option>Personal Milestone</option>
            </select>
            <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
          </div>
        </div>
        {/* Visibility Status */}
        <div className="mb-12">
          <label className="block text-[10px] font-bold tracking-widest text-neutral-500 uppercase mb-3 ml-2">
            Visibility Status
          </label>
          <div className="grid grid-cols-2 gap-4">
            <VisibilityCard
              icon={<LockClosedIcon className="w-5 h-5" />}
              label="Private"
              isActive={visibility === "private"}
              onClick={() => setVisibility("private")}
            />
            <VisibilityCard
              icon={<GlobeAltIcon className="w-5 h-5" />}
              label="Public"
              isActive={visibility === "public"}
              onClick={() => setVisibility("public")}
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col gap-6 items-center">
          <Button text="Seal This Capsule" width="full" rounded="lg" />

          <button className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 hover:text-neutral-600 transition-colors uppercase">
            Discard Draft
          </button>
        </div>
      </CapsuleCard>
    </div>
  );
};
