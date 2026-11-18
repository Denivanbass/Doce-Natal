
import { Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer
            id="contato"
            className="bg-[#2C1E16] text-[#FDFBF7]/80 border-t-4 border-[#8B1E24]"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-3 gap-8 items-center">
                <div>
                    <span className="font-serif text-2xl font-bold text-[#FDFBF7] block">
                        DOCE NATAL
                    </span>
                    <span className="text-xs text-[#C59B27] uppercase">
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

                <div className="sm:text-right space-y-2">
                    <span className="text-xs uppercase tracking-wider text-[#FDFBF7]/60 block">
                        Formas de Pagamento
                    </span>
                    <div className="inline-flex flex-wrap gap-2 text-xs font-semibold">
                        <span className="bg-[#FDFBF7]/10 px-2.5 py-1 rounded text-[#FDFBF7]">
                            PIX (5% OFF)
                        </span>
                        <span className="bg-[#FDFBF7]/10 px-2.5 py-1 rounded text-[#FDFBF7]">
                            Cartão de Crédito
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}