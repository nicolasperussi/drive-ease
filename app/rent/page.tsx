"use client";
import DatePicker from "@/components/date-picker";
import { BASE_VALUE } from "@/components/landing-page-vehicles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchVehicles } from "@/lib/utils";
import { ICar } from "@/types/car";
import dayjs from "dayjs";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const steps: {
  title: string;
  step: number;
}[] = [
  { title: "Data", step: 1 },
  { title: "Escolha do veículo", step: 2 },
  { title: "Identificação", step: 3 },
];

const Rent = () => {
  const [vehicles, setVehicles] = useState<Array<ICar>>([]);
  const [car, setCar] = useState<ICar | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [startDate, setStartDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>();
  const [finishDate, setFinishDate] = useState<Date>();
  const [finishTime, setFinishTime] = useState<string>();

  function handleSetStartDate(date: Date | undefined) {
    if (date) setStartDate(date);
  }
  function handleSetStartTime(time: string) {
    setStartTime(time);
    const [hour, minute] = time.split(":");
    handleSetStartDate(
      dayjs(startDate).hour(Number(hour)).minute(Number(minute)).toDate()
    );
  }
  function handleSetFinishDate(date: Date | undefined) {
    if (date) setFinishDate(date);
  }
  function handleSetFinishTime(time: string) {
    setFinishTime(time);
    const [hour, minute] = time.split(":");
    handleSetFinishDate(
      dayjs(finishDate).hour(Number(hour)).minute(Number(minute)).toDate()
    );
  }

  function handleIncrementStep() {
    if (currentStep === 3) return;
    setCurrentStep((prev) => prev + 1);
  }

  function handleSelectCar(car: any) {
    setCar(car);
    handleIncrementStep();
  }

  useEffect(() => {
    fetchVehicles().then((res) => setVehicles(res.vehicles));
  }, []);

  return (
    <section className="relative">
      <div className="border-b absolute w-full top-0">
        <div className="container mx-auto px-6 py-4 flex justify-around items-center">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={twMerge(
                "flex items-center justify-center gap-4 text-foreground/50 cursor-pointer",
                currentStep >= step.step && "text-primary"
              )}
              onClick={() => setCurrentStep(step.step)}
            >
              <span
                className={twMerge(
                  "size-8 rounded-full border-2 grid place-content-center border-foreground/50",
                  currentStep === step.step && "border-primary",
                  currentStep > step.step && "border-none text-white bg-primary"
                )}
              >
                {currentStep > step.step ? (
                  <Check className="size-4" />
                ) : (
                  step.step
                )}
              </span>
              <span
                className={twMerge(
                  "hidden lg:inline",
                  currentStep === step.step && "font-medium"
                )}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-6 py-24 flex flex-row justify-between">
        {currentStep === 1 && (
          <div className="container mx-auto px-6 py-12 lg:py-20 2xl:py-24 space-y-8">
            <h1 className="text-3xl font-bold text-primary">
              Selecione a data para seguir com a reserva
            </h1>
            <div className="flex p-8 flex-col xl:flex-row gap-8 border rounded-lg">
              <div className="flex justify-between xl:gap-8 flex-col md:flex-row">
                <div className="flex flex-col gap-4 w-full md:w-[48%] xl:w-full">
                  <Label>Data de início</Label>
                  <div className="flex border rounded-lg">
                    <DatePicker
                      date={startDate}
                      onSelect={handleSetStartDate}
                      className="border-none flex-1"
                    />
                    <div className="h-full border-l w-px" />
                    <Input
                      onChange={(e) => handleSetStartTime(e.target.value)}
                      value={startTime}
                      type="time"
                      className="border-none border-l-0 outline-none w-fit items-center justify-center"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full md:w-[48%] xl:w-full">
                  <Label>Data de término</Label>
                  <div className="flex border rounded-lg">
                    <DatePicker
                      date={finishDate}
                      minDate={dayjs(startDate).add(1, "day").toDate()}
                      onSelect={handleSetFinishDate}
                      className="border-none flex-1"
                    />
                    <div className="h-full border-l w-px" />
                    <Input
                      onChange={(e) => handleSetFinishTime(e.target.value)}
                      value={finishTime}
                      type="time"
                      className="border-none border-l-0 outline-none w-fit items-center justify-center"
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleIncrementStep} className="mt-auto w-full">
                Continuar
              </Button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="flex flex-col gap-8 flex-1 mr-8">
            <h1 className="text-3xl font-bold text-primary">
              Hora de escolher seu carro!
            </h1>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {vehicles.map((car) => (
                <Card
                  className="space-y-4 group hover:border-primary cursor-pointer"
                  key={car.id}
                  onClick={() => handleSelectCar(car)}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={`/cars/${car.slug}.png`}
                      alt=""
                      fill
                      className="object-contain p-4 group-hover:p-2 transition-[padding] border-b"
                    />
                  </div>
                  <CardContent className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold">
                      {car.manufacturer} {car.model}
                    </h2>
                    <span className="text-gray-500">
                      R$ {(BASE_VALUE * car.rental_factor).toFixed(2)}/day
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <>
            <div></div>
            <div className="hidden xl:flex w-96 h-fit border p-8 rounded-lg">
              {car && (
                <div className="flex flex-col gap-4 w-full">
                  <div className="space-y-1">
                    <h1 className="text-xl font-bold">
                      {car.manufacturer} {car.model}
                    </h1>
                    <h3 className="text-foreground/50">{car.year}</h3>
                  </div>
                  <div className="relative aspect-video w-full">
                    <Image
                      src={`/cars/${car.slug}.png`}
                      alt={car.model}
                      className="object-contain"
                      fill
                    />
                  </div>
                  <Button className="w-full mt-4">Alugar</Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Rent;
