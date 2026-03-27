import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-blend-overlay overflow-hidden bg-capsule_amber">
      <div className="w-52 h-52 rounded-full bg-capsule_green/10 absolute z-11 -top-14 -left-14" />
      <div className="w-52 h-52 rounded-full bg-capsule_green/10 absolute z-11 -bottom-14 -right-14" />
      <main className="relative z-10 h-full w-full">{children}</main>
    </div>
  );
};

export default AuthLayout;
