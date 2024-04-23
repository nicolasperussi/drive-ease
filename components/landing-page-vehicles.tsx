import React from "react";
import { fetchVehicles } from "@/lib/utils";
import VehicleCard from "./vehicle-card";

export const BASE_VALUE = 75;

const Vehicles = async () => {
  const { vehicles } = await fetchVehicles();

  return (
    vehicles && (
      <section className="container px-6 pt-6 pb-12 mx-auto" id="vehicles">
        <div className="space-y-4">
          <div className="inline-block rounded-full bg-secondary px-3 py-1 text-sm">
            Modelos Populares
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Explore Nossa Seleção de Carros Premium
          </h2>
          <p className="max-w-[900px] md:text-xl lg:text-base xl:text-xl">
            Navegue pela nossa coleção de veículos de luxo e alto desempenho,
            perfeitos para qualquer ocasião.
          </p>
        </div>
        <div className="grid gap-8 py-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((car) => (
            <VehicleCard car={car} />
          ))}
        </div>
      </section>
    )
  );
};

export default Vehicles;
