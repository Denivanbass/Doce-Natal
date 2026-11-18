
import Link from "next/link";
import {
    LogIn,
    ArrowRight,
} from "lucide-react";

import LoginForm from "./loginForm";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">

            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">

                {/* Cabeçalho */}
                <div className="mb-8 text-center">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">
                        <LogIn size={30} />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Bem-vindo de volta
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Entre com suas credenciais para acessar sua conta.
                    </p>

                </div>

                {/* Formulário de autenticação */}
                <LoginForm />

                {/* Rodapé */}
                <div className="mt-8 border-t border-slate-100 pt-6 text-center">

                    <p className="text-sm text-slate-500">
                        Ainda não possui uma conta?
                    </p>

                    <Link
                        href="/register"
                        className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-600"
                    >
                        Criar minha conta
                        <ArrowRight size={16} />
                    </Link>

                </div>

            </div>

        </main>
    );
}
