import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface InformationProps {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

const Information = ({ user }: InformationProps) => {
  return (
    <div className="flex w-full xl:w-1/2 flex-col border p-8 gap-2 rounded-lg">
      <div className="flex gap-4 items-center">
        <Avatar className="size-16">
          <AvatarImage src={user.image!} />
          <AvatarFallback className="text-xl font-bold">
            {user.name?.split(" ")[0][0]}
            {user.name?.split(" ").slice(-1)[0][0]}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h1 className="text-xl font-bold">{user.name}</h1>
          <h3 className="text-sm sm:text-base font-medium text-foreground/50">
            {user.email}
          </h3>
        </div>
      </div>
      <Button
        onClick={() => signOut()}
        variant="destructive"
        className="mt-4 sm:max-w-16"
      >
        Sair
      </Button>
    </div>
  );
};

export default Information;
