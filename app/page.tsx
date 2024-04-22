import Header from "@/components/header";
import Hero from "@/components/hero";
import Vehicles from "@/components/vehicles";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Vehicles />
    </>
  );
}
