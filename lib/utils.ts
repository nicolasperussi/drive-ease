import { ICar } from "@/types/car";
import { IRental } from "@/types/rental";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXTAUTH_URL;

export async function fetchVehicles(): Promise<{ vehicles: Array<ICar> }> {
  const res = await fetch(`${BASE_URL}/api/vehicles`, {
    method: "GET",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const result = await res.json();

  return result;
}

export async function fetchRentsByUser(
  email: string
): Promise<{ rentals: Array<IRental> }> {
  const res = await fetch(`${BASE_URL}/api/rent/${email}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Failed to fetch data");

  const result: { rentals: Array<IRental> } = await res.json();

  return result;
}
