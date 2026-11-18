import LogoLoja from "@/_components/LogoLoja";


export default function Loading() {
    return (
        <div className="min-h-screen m-auto flex justify-center items-center">
            <div className="flex flex-col gap-4 ">
                <LogoLoja />
                <p className="flex justify-center items-center text-xl text-green-950">Carregando...</p>
            </div>
        </div>

    )
}