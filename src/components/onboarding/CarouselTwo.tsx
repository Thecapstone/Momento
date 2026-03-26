import { CarouseAnimationStyles } from "@/lib/onboardingUtils";
import { motion } from "framer-motion";
import Image from "next/image";

const { animate, initial, transition } = CarouseAnimationStyles;

export const CarouselTwo = () => (
  <div className="flex flex-col items-center">
    <motion.p
      className="hidden md:block text-gray-600 max-w-md text-lg lg:text-xl font-medium"
      animate={animate}
      initial={initial}
      transition={transition}
    >
      Secure your work. Preserve your legacy one project at a time.
    </motion.p>

    <Image
      src="/svg/lock_n_key.svg"
      width={300}
      height={300}
      alt="company logo"
    />
  </div>
);
