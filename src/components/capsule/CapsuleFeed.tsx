"use client";

import { EntryCard } from "@/components/capsule/EntryCard";

type Entry = {
  date: string;
  time: string;
  title: string;
  description: string;
  tags?: string[];
  image?: string;
  isPrivate?: boolean;
};

type Props = {
  entries: Entry[];
};

export const CapsuleFeed = ({ entries }: Props) => {
  return (
    <div className="mt-16 space-y-6">
      {entries.map((entry, idx) => (
        <EntryCard key={idx} {...entry} />
      ))}
    </div>
  );
};