import Link from "next/link";

export default function LogoLoja() {
    return (

        <Link href={'/'} className="flex flex-col outline-none text-center">

            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#8B1E24]">
                DOCE NATAL
            </span>
            <span className="text-[11px]  uppercase tracking-[0.2em] text-[#2C1E16]/70 -mt-1">
                Sobremesas Festivas
            </span>

        </Link>


    )
}