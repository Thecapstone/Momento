import React from "react";
import { BackgroundDoubleGlass } from "../ui/BackgroundDoubleGlass";
import Image from "next/image";
import { OpaquCard } from "./Cards";
import { Text } from "../ui/Text";

const Landing = () => {
  return (
    <div className="w-full h-auto">
      <BackgroundDoubleGlass>
        <div className="flex gap-10 flex-col min-h-[55vh] w-full py-10 px-10 md:px-0">
          <Image
            src="/images/logo.png"
            width={60}
            height={60}
            alt="company logo"
            className="md:ml-10"
          />

          <OpaquCard className="md:rounded-l-xs">
            <div className="flex flex-col gap-5 p-5 md:min-w-xl">
              <Text
                as="span"
                variant="title"
                color="primary"
                className="whitespace-nowrap"
              >
                Builder’s{" "}
                <Text as="span" variant="title" color="accent">
                  Time
                  <br />
                  Capsule
                </Text>
              </Text>

              <div>
                <Text as="span" color="green" variant="small">
                  ----- THE{" "}
                  <Text color="accent" variant="small" as="span">
                    ARCHIVE
                  </Text>{" "}
                  BEGINS -----
                </Text>
              </div>
            </div>
          </OpaquCard>
        </div>
      </BackgroundDoubleGlass>
      <Image
        src="/images/demo_project.png"
        width={250}
        height={250}
        alt="empty project place holder"
        className="absolute right-32 top-64 hidden md:block"
      />

      <div className="flex flex-col p-10 md:px-24 py-10 gap-5 bg-capsule_amber">
        <Text as="span" variant="body" color="accent">
          A curated space to preserve your creative journey. Beyond simple
          notes,
          <br />
          we capture the intent, the pivots, and the evolution of your craft.
        </Text>
        <div className="flex flex-col md:flex-row gap-5">
          <Image
            src="/images/minimal_desk.png"
            width={200}
            height={200}
            alt="picture of a work table"
            className=""
          />
          <Image
            src="/images/minimal_desk.png"
            width={200}
            height={200}
            alt="picture of a work table"
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export { Landing };
