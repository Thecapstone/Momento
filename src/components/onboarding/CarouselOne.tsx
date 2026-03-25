import Image from "next/image";
import { motion } from "framer-motion";

const CarouselOne = () => (
  <div className="flex flex-col gap-5 items-center">
    <Image
      src="/images/logo.png"
      width={100}
      height={100}
      alt="company logo"
      className="md:hidden"
    />

    {/* text */}
    <div className="flex flex-col md:flex-row gap-3">
      <motion.p className="text-capsule_orange font-extrabold text-4xl md:text-6xl"
      initial={{x:"-100vw"}}
      animate={{x:0}}
      transition={{type:"tween"}}
      >
        Builder&lsquo;s
      </motion.p>
      <motion.p className="font-normal text-black text-3xl md:text-5xl"
      initial={{x:"100vw"}}
      animate={{x:0}}
      transition={{type:"tween"}}
      >
        Time <br className="hidden md:block" />
        Capsule
      </motion.p>
    </div>

    {/* mobile liner */}
    <div className="flex flex-row gap-5 md:hidden">
      <div className="h-0.5 w-12 bg-[#F2E1C3]/50" />
      <div className="h-0.5 w-12 bg-[#F2E1C3]/50" />
    </div>

    {/* desktop liner */}
    {/* Decorative Divider */}
    <div>
      <div className="hidden md:flex flex-row gap-3 mt-8 items-center">
        <div className="h-1 w-16 bg-capsule_orange" />
        <div className="h-1 w-8 bg-[#F2E1C3]" />
        <div className="h-1 w-4 bg-[#F2E1C3]/50" />
      </div>
      <p className="hidden md:block mt-6 text-gray-600 max-w-md text-lg lg:text-xl font-medium">
        Preserving the legacy of your craftsmanship, one project at a time.
      </p>
    </div>
  </div>
);
export default CarouselOne;
