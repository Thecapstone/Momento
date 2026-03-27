"use client";

import { CapsuleCard } from "./CapsuleCardTwo";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./Loading";
import { useCapsules } from "@/lib/api/hooks/useCapsules";

type CapsuleStatus = "draft" | "active" | "archived";

type CapsuleCardProps = {
  id: string;
  title: string;
  description?: string;
  status: CapsuleStatus;
  entryCount?: number;
  coverImage?: string;
};

export default function CapsulesPage() {
  const { data, isLoading } = useCapsules();

  if (isLoading) return <LoadingState />;

  const capsules = data?.map<CapsuleCardProps>((capsule) => ({
    id: capsule.id.toString(),
    title: capsule.title,
    description: capsule.description ?? undefined,
    status: capsule.private ? "draft" : "active",
    entryCount: capsule.members,
    coverImage: capsule.url ?? "/images/demo_project.png",
  }));

  if (!capsules || capsules.length === 0) return <EmptyState />;

  return (
    <div className="p-6 pb-20 bg-capsule_amber">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Your Capsules</h1>
        <p className="text-gray-400">
          Track, revisit, and grow your projects over time.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {capsules.map((capsule) => (
          <CapsuleCard key={capsule.id} capsule={capsule} />
        ))}
      </div>
    </div>
  );
}
