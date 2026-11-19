
import { Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer
            id="contato"
            className=" w-full bg-[#2C1E16] text-[#FDFBF7]/80 border-t-4 border-[#8B1E24] "
        >
            <div className="max-w-6xl m-auto p-4   flex flex-col items-center justify-center gap-5 md:flex-row  md:justify-between  ">
                <div>
                    <span className="font-serif text-2xl font-bold text-[#FDFBF7] flex justify-center md:block">
                        DOCE NATAL
                    </span>
                    <span className="text-xs text-[#C59B27] uppercase flex justify-center md:block">
                        Sobremesas Festivas
                    </span>
                    <p className="text-xs text-[#FDFBF7]/60 mt-3">
                        © 2026 Doce Natal. Todos os direitos reservados.
                    </p>
                </div>

                <div className="flex flex-col sm:items-center gap-2 text-sm">
                    <a
                        href="https://wa.me/5511989585389"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 hover:text-[#C59B27] transition-colors"
                    >
                        <Phone className="w-4 h-4 text-[#C59B27]" />
                        (11) 98958-5389 — WhatsApp
                    </a>

                </div>

                <div className=" flex justify-center items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-[#FDFBF7]/60 flex flex-nowrap">
                        Formas de Pagamento:
                    </span>
                    <div className="flex  gap-2 text-xs font-semibold ">
                        <span className="bg-[#FDFBF7]/10 px-2.5 py-1 rounded text-[#FDFBF7]">
                            PIX 
                        </span>
                        <span className="bg-[#FDFBF7]/10 px-2.5 py-1 rounded text-[#FDFBF7]">
                            DINHEIRO
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}