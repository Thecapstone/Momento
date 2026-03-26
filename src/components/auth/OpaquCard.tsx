import { ReactNode } from "react";

const OpaquCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col justify-end md:justify-center md:items-center">
      <div className="flex flex-col justify-center gap-10 rounded-t-3xl md:rounded-3xl bg-white/40 h-[70vh] md:h-auto md:w-fit">
        {children}
      </div>
    </div>
  );
};

export { OpaquCard };

