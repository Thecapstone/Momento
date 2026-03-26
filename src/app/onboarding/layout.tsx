import Image from "next/image";
import { ReactNode } from "react";

const OnBoardingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-blend-overlay overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/svg/blurred_green_bg.svg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-white/40" />
      <main className="relative z-10 h-full w-full">{children}</main>
    </div>
  );
};

export default OnBoardingLayout;
