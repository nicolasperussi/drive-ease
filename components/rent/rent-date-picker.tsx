"use client";
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import DatePicker from "../date-picker";
import { Button } from "../ui/button";
import { dayjs } from "@/lib/dayjs";
import { useRent } from "@/context/rent-context";

interface RentDatePickerProps {
  handleIncrementStep(): void;
}

const RentDatePicker = ({ handleIncrementStep }: RentDatePickerProps) => {
  const {
    startDate,
    startTime,
    handleSetStartDate,
    handleSetStartTime,
    finishDate,
    finishTime,
    handleSetFinishDate,
    handleSetFinishTime,
  } = useRent();

  return (
    <div className="space-y-8 flex-1">
      <h1 className="text-3xl font-bold text-primary">
        Selecione a data para seguir com a reserva
      </h1>
      <div className="flex p-8 flex-col xl:flex-row gap-8 border rounded-lg">
        <div className="flex justify-between gap-4 xl:gap-8 flex-col md:flex-row flex-1">
          <div className="flex flex-col gap-4 w-full md:w-[48%]">
            <Label>Data de início</Label>
            <div className="flex flex-wrap lg:flex-nowrap gap-2 sm:border sm:rounded-lg">
              <DatePicker
                date={startDate}
                onSelect={handleSetStartDate}
                className="sm:border-l-0 sm:border-y-0 border-r sm:rounded-r-none flex-1 w-full"
              />
              <Input
                onChange={(e) => handleSetStartTime(e.target.value)}
                value={startTime}
                type="time"
                className="sm:border-none sm:border-l-0 outline-none sm:w-fit items-center justify-center"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-[48%]">
            <Label>Data de término</Label>
            <div className="flex flex-wrap lg:flex-nowrap gap-2 sm:border sm:rounded-lg">
              <DatePicker
                date={finishDate}
                minDate={dayjs(startDate).add(1, "day").toDate()}
                onSelect={handleSetFinishDate}
                className="sm:border-l-0 sm:border-y-0 border-r sm:rounded-r-none flex-1 w-full"
              />
              <Input
                onChange={(e) => handleSetFinishTime(e.target.value)}
                value={finishTime}
                type="time"
                className="sm:border-none sm:border-l-0 outline-none sm:w-fit items-center justify-center"
              />
            </div>
          </div>
        </div>
        <Button onClick={handleIncrementStep} className="mt-auto w-full">
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default RentDatePicker;
