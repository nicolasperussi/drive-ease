"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="border-b">
      <header className="container px-6 h-14 flex items-center mx-auto">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Image src="/logo.svg" alt="logo" width={24} height={24} />
          <span className="font-bold text-primary">DriveEase</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6 relative">
          <Link
            className="text-sm text-primary font-medium hover:underline underline-offset-4"
            href="/#vehicles"
          >
            Veículos
          </Link>
          <Link
            className="text-sm text-primary font-medium hover:underline underline-offset-4"
            href="#"
          >
            Sobre
          </Link>
          <Link
            className="text-sm text-primary font-medium hover:underline underline-offset-4"
            href="#"
          >
            Fale Conosco
          </Link>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="text-sm text-primary font-medium hover:underline underline-offset-4 ml-12 flex gap-2 items-center cursor-pointer">
                  Minha Conta
                  <ChevronDown className="size-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Button
                    className="justify-start w-full"
                    variant="ghost"
                    asChild
                  >
                    <Link href="/account#settings">Ajustes</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button
                    className="justify-start w-full"
                    variant="ghost"
                    asChild
                  >
                    <Link href="/account#history">Histórico</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Button
                    className="justify-start text-red-500 gap-2 w-full"
                    variant="ghost"
                    onClick={() => signOut()}
                  >
                    Sair
                    <LogOut className="size-4" />
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              className="text-sm text-primary font-medium hover:underline ml-12 underline-offset-4"
              href="/login"
            >
              Entrar
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
