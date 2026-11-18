
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function Unauthorized() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">

      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg border border-slate-200">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <ShieldAlert size={40} className="text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Acesso não autorizado
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Você não tem permissão para acessar este perfil.
          Por motivos de segurança, só é permitido visualizar
          as informações do seu próprio perfil.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-700"
        >
          <ArrowLeft size={18} />
          Voltar ao dashboard
        </Link>

      </div>
    </main>
  );
}
