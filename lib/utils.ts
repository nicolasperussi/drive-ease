import { ICar } from "@/types/car";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchVehicles(): Promise<{ vehicles: Array<ICar> }> {
  const res = await fetch(`http://localhost:3000/api/vehicles`, {
    method: "GET",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const result = await res.json();

  console.log(result.vehicles);

  return result;
}
