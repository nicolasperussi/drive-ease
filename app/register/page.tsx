import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <main className="flex flex-col gap-12 items-center justify-center h-[80vh]">
      <h1 className="text-3xl font-bold text-primary">Register</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            placeholder="mail@example.com"
            required
            type="email"
            className="w-96 p-4 rounded-xl border outline-none"
          />
        </div>
        <button
          className="flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow transition-opacity hover:opacity-90 w-full mx-auto"
          type="submit"
        >
          Sign in
        </button>
      </form>
      <div className="text-center text-sm text-gray-500 flex gap-2">
        Already have an account?
        <Link
          className="font-medium text-primary hover:underline"
          href="/login"
        >
          Login
        </Link>
      </div>
    </main>
  );
};

export default Register;
