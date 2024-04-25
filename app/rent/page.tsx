"use client";
import RentCarPreviewer from "@/components/rent/rent-car-previewer";
import RentDatePicker from "@/components/rent/rent-date-picker";
import RentHeader from "@/components/rent/rent-header";
import RentVehicles from "@/components/rent/rent-vehicles";
import { Button } from "@/components/ui/button";
import { useRent } from "@/context/rent-context";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { dayjs } from "@/lib/dayjs";

const steps: {
  title: string;
  step: number;
}[] = [
  { title: "Data", step: 1 },
  { title: "Escolha do veículo", step: 2 },
  { title: "Identificação", step: 3 },
];

const Rent = ({ searchParams }: { searchParams: { step: string } }) => {
  const [currentStep, setCurrentStep] = useState(
    () => Number(searchParams.step) || 1
  );

  const { car, startDate, finishDate, clearRent } = useRent();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const step = Number(
      new URLSearchParams(window.location.search).get("step")
    );

    if ((step === 3 || step === 2) && (!startDate || !finishDate)) {
      console.log("entrou 1 if");
      handleChangeStep(1);
    }

    if (step === 3 && !car) {
      console.log("entrou 2 if");
      handleChangeStep(2);
    }
  }, []);

  function handleChangeStep(step: number) {
    if (step === 2 && (!startDate || !finishDate)) return;
    if (step === 3 && (!car || !startDate || !finishDate)) return;
    if (step === 3 && !session) {
      return router.replace("/login?referer=rent?step=3");
    }
    setCurrentStep(step);

    const newPathName = updateSearchParams(step);
    router.push(newPathName, { scroll: false });
  }

  function updateSearchParams(step: number) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("step", step.toString());
    return `${window.location.pathname}?${searchParams.toString()}`;
  }

  function handleIncrementStep() {
    if (currentStep === 3) return;

    handleChangeStep(currentStep + 1);
  }

  async function handleCreateRent() {
    const response = await fetch("/api/rent", {
      method: "POST",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify({
        car,
        userEmail: session?.user?.email,
        startDate,
        finishDate,
      }),
    });

    if (response.ok) {
      router.push("/account");
      clearRent();
    }
  }

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
        {currentStep === 2 && <RentVehicles />}

        {((currentStep === 1 && car) || currentStep === 2) && (
          <div className="flex flex-col gap-8 border w-full xl:w-96 h-fit p-8 rounded-lg">
            {car && <RentCarPreviewer />}
            {car && currentStep === 2 && (
              <Button onClick={handleIncrementStep}>
                Continuar com este carro
              </Button>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col w-full md:flex-row gap-8">
            <div className="flex flex-col flex-1 border rounded-lg p-8 gap-8">
              <h1 className="text-3xl font-bold text-primary">
                Resumo da reserva
              </h1>
              <div className="text-xl flex flex-col gap-1">
                <span className="font-bold">Nome do locatário: </span>
                {session?.user?.name}
              </div>
              <div className="text-xl flex flex-col gap-1">
                <span className="font-bold">Data e hora de início: </span>
                {dayjs(startDate).format("LLL")}
              </div>
              <div className="text-xl flex flex-col gap-1">
                <span className="font-bold">Data e hora de término: </span>
                {dayjs(finishDate).format("LLL")}
              </div>
              <div className="text-xl flex flex-col gap-1">
                <span className="font-bold">Valor total: </span>
                R${" "}
                {(
                  car?.rental_price! *
                  (dayjs(finishDate).diff(startDate, "day") + 1)
                ).toFixed(2)}
              </div>
              <Button
                onClick={handleCreateRent}
                className="hidden lg:inline-flex text-lg"
              >
                Reservar
              </Button>
            </div>
            <div className="flex flex-1 sm:flex-col border p-8 rounded-lg items-center sm:items-start">
              <div className="space-y-1 flex-1 sm:flex-none">
                <h1 className="text-xl font-bold ">
                  <span className="font-normal">{car?.manufacturer} </span>
                  {car?.model}
                </h1>
                <h3 className="text-foreground/50">{car?.year}</h3>
              </div>
              <div className="relative aspect-video w-full">
                <Image
                  src={`/cars/${car?.slug}.png`}
                  alt={`${car?.model}`}
                  className="object-contain"
                  fill
                />
              </div>
              <Button
                onClick={handleCreateRent}
                className="hidden md:inline-flex lg:hidden w-full mt-auto text-lg"
              >
                Reservar
              </Button>
            </div>
            <Button onClick={handleCreateRent} className="md:hidden text-lg">
              Reservar
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rent;
