import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { fetchVehicles } from "@/lib/utils";

export const BASE_VALUE = 75;

const Vehicles = async () => {
  const { vehicles } = await fetchVehicles();

  return (
    vehicles && (
      <section className="container px-6 pt-6 pb-12 mx-auto" id="vehicles">
        <div className="space-y-4">
          <div className="inline-block rounded-full bg-secondary px-3 py-1 text-sm">
            Popular Models
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Explore Our Premium Car Selection
          </h2>
          <p className="max-w-[900px] md:text-xl lg:text-base xl:text-xl">
            Browse our collection of luxury and high-performance vehicles,
            perfect for any occasion.
          </p>
        </div>
        <div className="grid gap-8 py-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((car) => (
            <Card className="space-y-4 group">
              <div className="relative aspect-video">
                <Image
                  src={`/cars/${car.slug}.png`}
                  alt=""
                  fill
                  className="object-contain p-4 hover:p-2 transition-[padding] border-b"
                />
              </div>
              <CardContent>
                <h2 className="text-xl font-bold">
                  {car.manufacturer} {car.model}
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    R$ {(BASE_VALUE * car.rental_factor).toFixed(2)}/day
                  </span>
                  <Button asChild>
                    <Link
                      href="/rent"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      Book
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  );
};

export default Vehicles;
