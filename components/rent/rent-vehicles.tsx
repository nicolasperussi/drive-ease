"use client";
import { fetchVehicles } from "@/lib/utils";
import { ICar } from "@/types/car";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { BASE_VALUE } from "../landing-page-vehicles";
import { useRent } from "@/context/rent-context";

interface RentVehiclesProps {
  handleIncrementStep(): void;
}

const RentVehicles = ({ handleIncrementStep }: RentVehiclesProps) => {
  const [vehicles, setVehicles] = useState<Array<ICar>>([]);
  const { handleSetCar } = useRent();

  useEffect(() => {
    fetchVehicles().then((res) => {
      setVehicles(res.vehicles);
    });
  }, []);

  return (
    <div className="flex flex-col gap-8 flex-1 xl:mr-8">
      <h1 className="text-3xl font-bold text-primary">
        Hora de escolher seu carro!
      </h1>
      <div className="grid gap-8 grid-cols-2 xl:grid-cols-3">
        {vehicles.map((car) => (
          <Card
            className="space-y-4 group hover:border-primary cursor-pointer"
            key={car.id}
            onClick={() => {
              handleSetCar(car);
              handleIncrementStep();
            }}
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
                R$ {car.rental_price.toFixed(2)}/dia
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RentVehicles;
