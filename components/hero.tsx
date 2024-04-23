import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      className="container px-6 py-12 lg:py-20 2xl:py-24 grid grid-cols-1
    lg:grid-cols-5 gap-y-16 lg:gap-16 items-center justify-between mx-auto relative"
    >
      <div className="flex flex-col gap-4 lg:gap-8 justify-center text-center lg:text-left col-span-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          Eleve Sua Experiência de Condução
        </h1>
        <p className="max-w-[600px] lg:max-w-full mx-auto md:text-xl lg:mx-0">
          Descubra o máximo em luxo e conveniência com o nosso serviço premium
          de aluguel de carros.
        </p>
        <Button asChild>
          <Link
            className="flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-opacity hover:opacity-90 min-w-64 mx-auto lg:mx-0"
            href="#vehicles"
          >
            Reservar Agora
          </Link>
        </Button>
      </div>
      <div className="relative aspect-video flex-1 col-span-3">
        <Image
          alt="Luxury Car"
          className="object-contain"
          fill
          src="/cars/audi-a3-2022.png"
        />
      </div>
    </section>
  );
};

export default Hero;
