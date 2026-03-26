import { Text } from "../ui/Text";
import Image from "next/image";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export const EntryCard = ({ 
  date, 
  time, 
  title, 
  description, 
  image, 
  tags, 
  isPrivate 
}:{ 
  date?:string, 
  time?:string, 
  title?:string, 
  description?:string, 
  image?:string, 
  tags?:string[], 
  isPrivate?:boolean 
}) => {
  return (
    <div className="flex flex-col gap-4 py-10 border-b border-neutral-100 last:border-0">
      <div className="flex justify-between items-start">
        <Text variant="label" className="text-neutral-400">
          {date} <span className="mx-2">•</span> {time}
        </Text>
        {isPrivate && <LockClosedIcon className="w-4 h-4 text-neutral-300" />}
      </div>

      <div className="space-y-2">
        <Text variant="title" as="h3" className="text-neutral-800">
          {title}
        </Text>
        <Text variant="body" className="text-neutral-500 font-light max-w-xl">
          {description}
        </Text>
      </div>

      {tags && (
        <div className="flex gap-2">
          {tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-capsule_amber rounded-full text-[10px] font-bold tracking-wider uppercase text-capsule_orange/70">
              {tag}
            </span>
          ))}
        </div>
      )}

      {image && (
        <div className="relative w-full aspect-2/1 rounded-2xl overflow-hidden mt-2">
          <Image src={image} fill className="object-contain" alt={title??""} />
        </div>
      )}
    </div>
  );
};