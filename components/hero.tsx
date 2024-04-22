import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section
      className="container px-6 py-12 lg:py-20 2xl:py-24 grid grid-cols-1
    lg:grid-cols-2 gap-8 items-center justify-between mx-auto"
    >
      <div className="flex flex-col gap-4 lg:gap-8 flex-1 justify-center text-center sm lg:text-left">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          Elevate Your Driving Experience
        </h1>
        <p className="max-w-[600px] lg:max-w-full mx-auto md:text-xl lg:mx-0">
          Discover the ultimate in luxury and convenience with our premium car
          rental service.
        </p>
        <Link
          className="flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-opacity hover:opacity-90 min-w-64 mx-auto lg:mx-0"
          href="#vehicles"
        >
          Book Now
        </Link>
      </div>
      <div className="flex-1">
        <img
          alt="Luxury Car"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-contain w-full"
          // fill
          src="/cars/audi-a3-2022.png"
        />
      </div>
    </section>
  );
};

export default Hero;
