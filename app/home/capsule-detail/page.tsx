import { CapsuleHero } from "@/components/capsule/CapsuleHero";
import { CapsuleMeta } from "@/components/capsule/CapsuleMeta";
import { CapsuleFeed } from "@/components/capsule/CapsuleFeed";

const entries = [
  {
    date: "OCT 24, 2023",
    time: "02:14 AM",
    title: "The Anatomy of a Shadow",
    description:
      "Observations on how light interacts with the brutalist structures...",
    tags: ["Draft", "3 Photos"],
    image: "/images/demo_project.png",
  },
  {
    date: "OCT 18, 2023",
    time: "11:45 PM",
    title: "Rhythm of the Rain",
    description:
      "There is a particular tempo to the rain tonight. It matches the...",
    tags: ["Archived"],
    image: "/images/demo_project.png",
  },
  {
    date: "OCT 12, 2023",
    time: "04:00 AM",
    title: "Quiet Realizations",
    description:
      '"The archive is not about the past, but about the future we were building..."',
    isPrivate: true,
  },
];
const CapsuleDetails = () => {
  return (
    <div className="w-full bg-capsule_amber">
      <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-6 py-12 bg-capsule_amber min-h-screen">
        <CapsuleHero title={"Midnight \n Reflections"} volume="Volume IV" />

        <CapsuleMeta
          description="A curated collection of late-night thoughts, architectural sketches, and the quiet evolution of a creative mind through the autumn season."
          entriesCount={12}
        />

        <CapsuleFeed entries={entries} />
      </div>
    </div>
  );
};

export default CapsuleDetails;
