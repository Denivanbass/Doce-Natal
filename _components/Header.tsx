import { Clock} from "lucide-react";

import Link from "next/link";
import LogoLoja from "./LogoLoja";
import ButtonCart from "./ButtonCart";


export default async function Header() {




    return (
        <>


            {/* Top Bar de Urgência */}
            <div className="bg-[#8B1E24] text-[#FDFBF7] text-xs sm:text-sm py-2.5 px-4 text-center font-medium tracking-wide">
                <span className="inline-flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C59B27]" />
                    Não fique sem sua sobremesa de Natal! Faça sua encomenda agora, pedidos até 23/12/26.
                </span>
            </div>
            {/* Navbar */}
            <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#2C1E16]/10">

                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">

                    <LogoLoja />


                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2C1E16]/80">
                        <Link href='/' className=" uppercase hover:text-[#8B1E24] transition-colors">
                            Início
                        </Link>
                        <Link href="/#produtos" className="  uppercase hover:text-[#8B1E24] transition-colors">
                            Produtos
                        </Link>

                        <Link href="/#contato" className=" uppercase hover:text-[#8B1E24] transition-colors">
                            Contato
                        </Link>
                    </nav>

                    {/* Aqui fica o botão do carinho */}
                    <ButtonCart />


                </div>
            </header>

        </>
    )
}