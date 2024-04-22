import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="border-b border-b-black/10">
      <header className="container px-6 h-14 flex items-center mx-auto">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Image src="/logo.svg" alt="logo" width={24} height={24} />
          <span className="font-bold text-primary">DriveEase</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link
            className="text-sm hover:text-accent font-medium hover:underline underline-offset-4"
            href="#"
          >
            Vehicle Fleet
          </Link>
          <Link
            className="text-sm hover:text-accent font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm hover:text-accent font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
