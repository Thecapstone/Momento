import Image from "next/image";
import {motion} from "framer-motion"
import { CarouseAnimationStyles } from "@/app/lib/onboardingUtils";

const {animate, initial, transition} = CarouseAnimationStyles

export const CarouselThree = () => (
  <div className="flex flex-col items-center w-full  gap-10 pb-10">
<motion.p className="hidden md:block text-gray-600 max-w-md text-lg lg:text-xl font-medium"
      animate={animate}
      initial={initial}
      transition={transition}
      >
      Capture every milestone. Turn your projects into lasting memories.
      </motion.p>
    <Image
      src="/images/orange_hourglass.png"
      alt=""
      width={200}
      height={200}
      sizes="(max-width: 768px) 100vw, 200px"
      className="w-full h-auto md:w-50"
    />
  </div>
);