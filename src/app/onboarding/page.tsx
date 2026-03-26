"use client";
import CarouselOne from "@/components/onboarding/CarouselOne";
import { CarouselThree } from "@/components/onboarding/CarouselThree";
import { CarouselTwo } from "@/components/onboarding/CarouselTwo";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const slides = [
  { view: CarouselOne, buttonText: "DOCUMENT PROJECTS" },
  { view: CarouselTwo, buttonText: "SECURE CAPSULES" },
  { view: CarouselThree, buttonText: "CREATE MEMORIES" },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      router.replace("/auth");
      return;
    }
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden ">
      {/* Slide Content */}
      <div
        className="flex-1 flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map(({ buttonText, view: SlideComponent }, index) => (
          <div
            key={index}
            className="min-w-full flex items-center justify-center text-white text-4xl font-bold"
          >
            <SlideComponent />
          </div>
        ))}
      </div>

      {/* Bottom Controls Area */}
      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-6">
        <Button
          onClick={nextSlide}
          rounded="full"
          width="fit"
          text={slides[currentSlide].buttonText}
        />

        {/* Indicators (Dots) */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-6 bg-white" // Expanding active dot
                  : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
