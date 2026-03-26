import React, { ReactNode } from "react";

const CapsuleCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#FFF9F2] rounded-[40px] p-8 shadow-sm border border-neutral-100">
      {children}
    </div>
  );
};


export { CapsuleCard };
