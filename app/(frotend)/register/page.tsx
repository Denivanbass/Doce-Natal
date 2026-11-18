
import Link from "next/link";
import {
  UserRound,
  Mail,
  LockKeyhole,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import FormRegister from "./formRegister";

export default function Register() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">

      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">

        {/* Cabeçalho */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <UserPlus size={30} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Criar uma conta
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Preencha seus dados para começar.
          </p>

        </div>

        {/* Formulário */}
        <FormRegister />

        {/* Rodapé */}
        <div className="mt-8 border-t border-slate-100 pt-6 text-center">

          <p className="text-sm text-slate-500">
            Já possui uma conta?
          </p>

          <Link
            href="/login"
            className="mt-2 inline-block text-sm font-semibold text-slate-900 transition hover:text-slate-600"
          >
            Fazer login
          </Link>

        </div>

      </div>

    </main>
  );
}
