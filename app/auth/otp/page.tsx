import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { Text } from "@/components/ui/Text";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex h-screen flex-col justify-center items-center p-10">
      <div className="flex h-screen flex-col justify-center items-center gap-5">
        <Image
          src="/images/logo.png"
          width={100}
          height={100}
          alt="company logo"
          className="md:hidden"
        />
        <Text variant="body" color="primary" className="text-center font-bold">
          Email Verification
        </Text>
        <Text variant="body" color="muted" className="text-center">
          Enter the OTP sent to{" "}
          <Text variant="body" color="primary" className="inline">
            email@email.com
          </Text>
        </Text>

        {/* Inputs */}
        <InputField label="" defaultValue="Enter OTP" />
        <Button text="Verify Email" rounded="md" width="full" />
      </div>
    </div>
  );
};

export default page;
