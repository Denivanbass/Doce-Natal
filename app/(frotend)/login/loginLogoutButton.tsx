import { logout } from "@/app/(backend)/_actions/logout";
import { cookies } from "next/headers";
import Link from "next/link";



export default async function LoginLogoutButton() {

    const coockieStore = await cookies();

    const token = coockieStore.get('session')?.value

    return (
        <>
            {token ? (
                <form action={logout}>
                    <button
                        type="submit"
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                    >
                        Sair da conta
                    </button>
                </form>
            ) : (
                <Link
                    href="/login"
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                    Entrar
                </Link>
            )}
        </>
    )
}