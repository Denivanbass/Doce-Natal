'use client';

import { useActionState } from 'react';
import { AlertCircle, ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { userRegister } from '@/app/(backend)/_actions/userRegister';


export default function FormRegister() {

  const [state, handleSubmit, isPending] = useActionState(userRegister, null)



  return (


    <form className="space-y-5" action={handleSubmit}>

      <p className='text-red-500 text-center'>{state?.error}</p>

      {/* Nome */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Nome completo
        </label>

        <div className="relative">
          <UserRound
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Seu nome"
            required
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>

      {/* Email */}
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
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
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
            placeholder="Crie uma senha"
            required
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>

      {/* Confirmar senha */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Confirmar senha
        </label>

        <div className="relative">
          <LockKeyhole
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Repita sua senha"
            required
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Criar minha conta
        <ArrowRight size={18} />
      </button>

    </form>
  )
}