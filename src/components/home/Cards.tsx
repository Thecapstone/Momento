import { ReactNode } from "react";

export const OpaquCard = ({ children, className }: { children: ReactNode; className:string }) => {
  return (
    <div className={`relative flex flex-col justify-center gap-10 rounded-xl bg-white/30 backdrop-blur-md border border-white/30 p-6 w-fit ${className}`}>
      {/* blur layer */}
      <div className="absolute inset-0 rounded-xl bg-white/10 blur-xl -z-10" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
