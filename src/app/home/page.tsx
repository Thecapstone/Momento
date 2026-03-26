import CapsulesPage from "@/components/capsule/CapsuleSection";
import { Landing } from "@/components/home/LandingSection";


function page() {
  return (
    <div className="flex flex-col w-full h-fit">
      <Landing />
      <CapsulesPage/>
    </div>
  );
}

export default page;
