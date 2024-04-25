"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/error-message";
import { LoaderCircle } from "lucide-react";

const registerUserFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "O nome não pode estar em branco")
      .transform((val) => val.replace(/\s+/g, " ")),
    email: z
      .string()
      .min(1, "O e-mail não pode estar em branco")
      .email("Este não é um e-mail válido"),
    password: z
      .string()
      .min(8, "A senha precisa conter ao menos 8 caracteres")
      .regex(new RegExp(/[0-9]/), "A senha precisa conter ao menos um número"),
    confirmPassword: z.string().min(1, "Por favor, confirme a senha"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  type registerUserFormData = z.infer<typeof registerUserFormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerUserFormData>({
    mode: "onBlur",
    resolver: zodResolver(registerUserFormSchema),
  });

  async function onSubmit(data: any) {
    setLoading(true);

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    if (response.ok) {
      const signInData = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInData?.error) {
        setLoading(false);
        console.log(signInData.error);
      } else {
        router.push("/");
      }
    }
  }

  // TODO: change the form and inputs to Form and Inputs components from shadcn/ui

  return (
    <main className="flex flex-col gap-12 items-center justify-center pt-14">
      <h1 className="text-3xl font-bold text-primary">Criar conta</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="name">
            Nome
          </label>
          <input
            {...register("name")}
            placeholder="Nome Completo"
            className="w-96 p-4 rounded-xl border outline-none"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="email">
            E-mail
          </label>
          <input
            {...register("email")}
            placeholder="exemplo@dominio.com"
            className="w-96 p-4 rounded-xl border outline-none"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="Password">
            Senha
          </label>
          <input
            {...register("password")}
            autoComplete="new-password"
            type="password"
            placeholder="••••••••"
            className="w-96 p-4 rounded-xl border outline-none"
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="Password">
            Confirme a senha
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="••••••••"
            className="w-96 p-4 rounded-xl border outline-none"
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </div>
        <Button type="submit">
          {loading ? <LoaderCircle className="animate-spin" /> : "Criar conta"}
        </Button>
      </form>
      <div className="text-center text-sm text-gray-500">
        Já possui uma conta?&nbsp;
        <Link
          className="font-medium text-primary hover:underline"
          href="/login"
        >
          Entrar
        </Link>
      </div>
    </main>
  );
};

export default Register;
