import Image from "next/image";
import { ReactNode } from "react";

const BackgroundDoubleGlass = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative w-full min-h-[50vh] overflow-hidden">
      <Image
        src="/svg/double_bg.svg"
        fill
        alt=""
        priority
        className="object-cover -z-10"
      />

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export { BackgroundDoubleGlass };
