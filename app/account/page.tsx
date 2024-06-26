"use client";
import Information from "@/components/account/information";
import UserRentals from "@/components/account/user-rentals";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Account = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated") return router.push("/login");

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20 2xl:py-24 space-y-8">
      <div className="space-y-4" id="settings">
        <h1 className="text-xl font-bold">Informações</h1>
        <Information user={session?.user!} />
      </div>
      <div className="space-y-4" id="history">
        <h1 className="text-xl font-bold">Reservas</h1>
        <UserRentals email={session?.user?.email!} />
      </div>
    </div>
  );
};

export default Account;
