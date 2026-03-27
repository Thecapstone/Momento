import { OpaquCard } from "@/components/auth/OpaquCard";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { Text } from "@/components/ui/Text";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const page = () => {
  return (
    <OpaquCard>
      <div className="flex flex-col justify-center items-center gap-5 p-10">
        <div>
          <Text variant="title" color="primary" className="text-center">
            Get Started
          </Text>
          <Text variant="body" color="muted" className="text-center">
            Let&lsquo;s get you started
          </Text>
        </div>
        {/* Inputs */}
        <InputField label="Name" defaultValue="Jeff Bezos" />
        <InputField label="Email" defaultValue="email@email.com" />
        <InputField label="password" placeholder="" encrypt />
        <Button
          icon={<ArrowRightIcon className="w-4 h-4" />}
          text="Sign up"
          rounded="md"
          width="full"
        />

        {/* SIGN IN WITH EMAIL SECTION */}
        {/* section divider */}
        {/* <div className="flex flex-row gap-3 justify-center items-center">
          <div className="h-0.5 w-12 bg-capsule_amber_200" />{" "}
          <p className="text-black">or</p>
          <div className="h-0.5 w-12 bg-capsule_amber_200" />
        </div>
        <Button
          text="Sign in with google"
          rounded="lg"
          width="full"
          className="bg-capsule_amber_100 text-gray-400"
        /> */}
        <a className="text-gray-400">
          Have an account?{" "}
          <span className="text-capsule_amber_200  font-bold">Sign in</span>
        </a>
      </div>
    </OpaquCard>
  );
};

export default page;
