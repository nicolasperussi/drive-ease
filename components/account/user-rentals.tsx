import { fetchRentsByUser } from "@/lib/utils";
import { IRental } from "@/types/rental";
import React, { useEffect, useState } from "react";
import { dayjs } from "@/lib/dayjs";
import { Badge } from "../ui/badge";
import Image from "next/image";

interface UserRentalProps {
  email: string;
}

const UserRentals = ({ email }: UserRentalProps) => {
  const [rentals, setRentals] = useState<Array<IRental>>([]);

  useEffect(() => {
    fetchRentsByUser(email).then((res) => {
      setRentals(res.rentals);
    });
  }, []);

  return (
    <div className="space-y-8">
      {rentals.map((rental) => (
        <div
          key={rental.id}
          className="flex w-full xl:w-1/2 flex-col md:flex-row border justify-between p-8 gap-8 rounded-lg"
        >
          <div className="space-y-4 flex-1">
            <Badge className={rental.ongoing ? "bg-green-300" : "bg-red-300"}>
              {rental.ongoing ? "Ativo" : "Inativo"}
            </Badge>
            <h1 className="font-bold flex flex-col text-lg">
              Data de início:{" "}
              <span className="font-normal">
                {dayjs(rental.startDate).format("LLL")}
              </span>
            </h1>
            <h1 className="font-bold flex flex-col text-lg">
              Data de término:{" "}
              <span className="font-normal">
                {dayjs(rental.endDate).format("LLL")}
              </span>
            </h1>
            <h1 className="font-bold flex flex-col text-lg">
              Valor total:{" "}
              <span className="font-normal">
                R$ {rental.totalPrice.toFixed(2)}
              </span>
            </h1>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-2">
              <h1 className="text-xl font-bold">
                <span className="font-normal">{rental.car.manufacturer} </span>
                {rental.car.model}
              </h1>
              <h3 className="text-foreground/50">{rental.car.year}</h3>
            </div>
            <div className="relative ml-auto aspect-video w-full">
              <Image
                src={`/cars/${rental.car.slug}.png`}
                alt={`${rental.car.model}`}
                className="object-contain"
                fill
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserRentals;
