"use client";
import DatePicker from "@/components/date-picker";
import { BASE_VALUE } from "@/components/landing-page-vehicles";
import RentDatePicker from "@/components/rent/rent-date-picker";
import RentHeader from "@/components/rent/rent-header";
import RentVehicles from "@/components/rent/rent-vehicles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRent } from "@/context/rent-context";
import { fetchVehicles } from "@/lib/utils";
import { ICar } from "@/types/car";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const steps: {
  title: string;
  step: number;
}[] = [
  { title: "Data", step: 1 },
  { title: "Escolha do veículo", step: 2 },
  { title: "Identificação", step: 3 },
];

const Rent = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();
  function handleChangeStep(step: number) {
    setCurrentStep(step);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("step", step.toString());
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname, { scroll: false });
  }
  function handleIncrementStep() {
    if (currentStep === 3) return;

    handleChangeStep(currentStep + 1);
  }

  const { car, handleSetCar } = useRent();

  return (
    <section className="relative">
      <RentHeader
        steps={steps}
        currentStep={currentStep}
        handleChangeStep={handleChangeStep}
      />

      <div className="container mx-auto px-6 py-24 flex flex-col-reverse gap-8 xl:flex-row justify-between">
        {currentStep === 1 && (
          <RentDatePicker handleIncrementStep={handleIncrementStep} />
        )}
        {currentStep === 2 && (
          <RentVehicles handleIncrementStep={handleIncrementStep} />
        )}

        {((currentStep === 1 && car) || currentStep === 2) && (
          <div className="flex flex-col gap-8 border w-full xl:w-96 h-fit p-8 rounded-lg">
            {car && (
              <div className="flex items-center justify-center xl:items-start xl:flex-col gap-4 w-full">
                <div className="space-y-1">
                  <h1 className="text-xl font-bold">
                    <span className="font-normal">{car.manufacturer} </span>
                    {car.model}
                  </h1>
                  <h3 className="text-foreground/50">{car.year}</h3>
                </div>
                <div className="relative aspect-video w-48 xl:w-full">
                  <Image
                    src={`/cars/${car.slug}.png`}
                    alt={car.model}
                    className="object-contain"
                    fill
                  />
                </div>
              </div>
            )}

            {/* TODO: create api route to create rental and call on this button */}
            {car && currentStep === 2 && (
              <Button>Continuar com este carro</Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Rent;
