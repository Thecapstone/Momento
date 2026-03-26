"use client";

import { CapsuleCard } from "./CapsuleCardTwo";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./Loading";

type Capsule = {
  id: string;
  title: string;
  status: "draft" | "active" | "archived";
  entryCount?: number;
  coverImage?: string;
};

export default function CapsulesPage() {
  const capsules: Capsule[] = [
    {
      id: "1",
      title: "Workspace Evolution",
      status: "active",
      entryCount: 24,
      coverImage: "/images/demo_project.png",
    },
    {
      id: "2",
      title: "Sonic Textures",
      status: "draft",
      coverImage: "/images/demo_project.png",
    },
  ];

  if (!capsules) return <LoadingState />;

  if (capsules.length === 0) return <EmptyState />;

  return (
    <div className="p-6 pb-20 bg-capsule_amber">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Your Capsules</h1>
        <p className="text-gray-400">
          Track, revisit, and grow your projects over time.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {capsules.map((capsule) => (
          <CapsuleCard key={capsule.id} capsule={capsule} />
        ))}
      </div>
    </div>
  );
}
