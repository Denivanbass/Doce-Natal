
'use client'

import {
    LockKeyhole,
    Mail,
    ArrowRight,
} from "lucide-react";

import { useActionState } from "react";
import { login } from "@/app/(backend)/_actions/login";

export default function LoginForm() {

    const [state, loginTrigger, isPending] = useActionState(login, null);

    return (
        <form action={loginTrigger} className="space-y-5">

            {/* Mensagem de retorno */}
            {state?.message && (
                <p
                    className={`text-sm text-center ${
                        state.success
                            ? "text-emerald-600"
                            : "text-red-600"
                    }`}
                >
                    {state.message}
                </p>
            )}

            {/* E-mail */}
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    E-mail
                </label>

                <div className="relative">
                    <Mail
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        disabled={isPending}
                        className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                </div>
            </div>

            {/* Senha */}
            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Senha
                </label>

                <div className="relative">
                    <LockKeyhole
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Digite sua senha"
                        required
                        disabled={isPending}
                        className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                </div>
            </div>

            {/* Botão */}
            <button
                type="submit"
                disabled={isPending}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending ? "Autenticando..." : "Entrar na conta"}

                <ArrowRight size={18} />
            </button>

        </form>
    );
}
