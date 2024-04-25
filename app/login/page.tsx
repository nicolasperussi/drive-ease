"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/error-message";

const loginUserFormSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail não pode estar em branco")
    .email("Este e-mail não é válido"),
  password: z.string().min(1, "A senha não pode estar em branco"),
});

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  type loginUserFormData = z.infer<typeof loginUserFormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserFormData>({
    mode: "onSubmit",
    resolver: zodResolver(loginUserFormSchema),
  });

  async function onSubmit(data: any) {
    setLoading(true);

    const signInData = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: "Erro ao fazer login",
        description: "Credenciais incorretas",
        variant: "destructive",
        duration: 3000,
      });
      setLoading(false);
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      const referer = searchParams.get("referer");
      if (referer) return router.push(`/${referer}`);
      return router.push("/");
    }
  }

  function goToRegisterPage() {
    const searchParams = new URLSearchParams(window.location.search);
    const referer = searchParams.get("referer");
    if (referer) return router.push(`/register?referer=${referer}`);
    return router.push("/register");
  }
  return (
    <main className="flex flex-col gap-12 items-center justify-center h-[80vh]">
      <div className="space-y-2 text-center flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-primary">Entrar</h1>
        <p>Utilize suas credenciais para acessar sua conta.</p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex items-center justify-between">
            <label className="font-medium" htmlFor="password">
              Senha
            </label>
            {/* TODO: add password resetting */}
            <Link className="text-sm text-primary hover:underline" href="#">
              Esqueceu a senha?
            </Link>
          </div>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="w-96 p-4 rounded-xl border outline-none"
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <Button type="submit">
          {loading ? <LoaderCircle className="animate-spin" /> : "Entrar"}
        </Button>
      </form>
      <div className="text-center text-sm text-gray-500">
        Não possui uma conta?&nbsp;
        <span
          className="font-medium text-primary hover:underline cursor-pointer"
          onClick={goToRegisterPage}
        >
          Crie uma conta
        </span>
      </div>
    </main>
  );
};

export default Login;
