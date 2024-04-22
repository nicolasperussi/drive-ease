import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <main className="flex flex-col gap-12 items-center justify-center h-[80vh]">
      <div className="space-y-2 text-center flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-primary">Login</h1>
        <p>Enter your credentials to access your account.</p>
      </div>
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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-medium" htmlFor="password">
              Password
            </label>
            <Link className="text-sm text-primary hover:underline" href="#">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            placeholder="your password"
            required
            type="password"
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
        Don't have an account?
        <Link
          className="font-medium text-primary hover:underline"
          href="/register"
        >
          Register
        </Link>
      </div>
    </main>
  );
};

export default Login;