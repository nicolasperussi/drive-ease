import Image from "next/image";
import Link from "next/link";
import React from "react";

const Vehicles = async () => {
  const BASE_VALUE = 50;
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
          {vehicles.map((car: any, i: any) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden flex flex-col gap-2 border group bg-white shadow-md"
            >
              <div className="relative aspect-video">
                <Image
                  src={`/cars/${car.slug}.png`}
                  alt=""
                  fill
                  className="object-contain p-4 hover:p-2 transition-[padding] border-b"
                />
              </div>
              <div className="p-4 space-y-4">
                <h2 className="text-xl font-bold">
                  {car.manufacturer} {car.model}
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 h-8">
                    R$ {(BASE_VALUE * car.rental_factor).toFixed(2)}/day
                  </span>
                  <Link
                    className="hidden group-hover:inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-white shadow transition-colors hover:opacity-90"
                    href="#"
                  >
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  );
};

export default Vehicles;

async function fetchVehicles() {
  const res = await fetch(`http://localhost:3000/api/vehicles`, {
    method: "GET",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}
