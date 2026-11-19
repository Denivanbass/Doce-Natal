import {
  Sparkles,
  Truck,
  ShieldCheck,
  Gift,
  MapPin,
  MessageCircle,
  Clock,
  Award,
} from 'lucide-react';
import { connection } from 'next/server';
import CartDrawer from '@/_components/CartDrawer';
import ProductCard from '@/_components/ProductCard';
import { prisma } from './(backend)/lib/prisma';

export default async function NatalConfeitariaPage() {
  // Indica explicitamente ao Next.js 16 que esta página deve ser renderizada no momento da requisição
  await connection();

  // Busca os produtos cadastrados no banco lojaVirtual via Prisma (ordenado pelos mais recentes)
  const rawProducts = await prisma.products.findMany({
    orderBy: { id: 'desc' },
  });

  // Converte o preço do tipo Decimal do Prisma para Number comum
  const products = rawProducts.map((p) => ({
    ...p,
    price: Number(p.price),
  }));

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1E16] font-sans selection:bg-[#8B1E24] selection:text-[#FDFBF7]">
      {/* Hero Section */}
      <section
        id="inicio"
        className="relative bg-[#2C1E16] text-[#FDFBF7] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-[center_75%]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1740385549630-4e31b8019fec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b0e11] via-[#1b0e11]/50 to-[#1b0e11]/10" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#2C1E16]/80 border border-[#C59B27]/50 px-3.5 py-1.5 rounded-full text-xs sm:text-sm">
              <span className="bg-[#C59B27] text-[#2C1E16] font-bold px-2 py-0.5 rounded-full text-[12px] uppercase">
                Edição 2026
              </span>
              <span className="text-[#FDFBF7]/90">
                Encomendas Abertas!
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-[#FDFBF7]">
              Torne Sua Ceia{' '}
              <span className="text-[#C59B27] italic">Inesquecível</span>
            </h1>

            <p className="text-base sm:text-lg text-[#FDFBF7]/85 max-w-xl leading-relaxed">
              Sobremesas artesanais feitas com ingredientes selecionados, das frutas ao
              chocolate, com receitas tradicionais e deliciosas para a noite de Natal da sua família.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#produtos"
                className="bg-[#1E4D3B] hover:bg-[#163A2C] text-[#FDFBF7] px-7 py-3.5 rounded-lg font-semibold text-base transition-all shadow-lg shadow-black/20 inline-flex items-center gap-2"
              >
                Ver sobremesas
              </a>
              <a
                href="#sobre"
                className="border border-[#C59B27]/60 hover:bg-[#C59B27]/15 text-[#FDFBF7] px-6 py-3.5 rounded-lg font-medium text-base transition-all"
              >
                Quem somos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vitrine de Produtos */}
      <section id="produtos" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C59B27]">
            Cardápio Especial de Natal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#8B1E24]">
            Nossas Sobremesas
          </h2>
          <p className="text-[#2C1E16]/75 text-sm sm:text-base">
            Escolha os clássicos que não podem faltar na sua mesa.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#2C1E16]/10 shadow-sm max-w-xl mx-auto space-y-3">
            <p className="text-[#2C1E16]/75 text-base font-medium">
              Nenhuma sobremesa cadastrada no banco de dados.
            </p>
            <p className="text-xs text-[#2C1E16]/50">
              Cadastre novos produtos na sua página de administração para vê-los aqui na vitrine.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Banner de Garantia e Entrega */}
      <section id="presentes" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative rounded-2xl bg-[#2C1E16] text-[#FDFBF7] overflow-hidden border border-[#C59B27]/30 shadow-xl">
          <div className="grid md:grid-cols-12 items-center">
            <div className="md:col-span-5 h-56 md:h-full">
              <img
                src="https://images.unsplash.com/photo-1525640788966-69bdb028aa73?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                alt="Presentes de Natal embalados com fita vermelha"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-7 p-8 sm:p-10 space-y-5">
              <div className="inline-flex items-center gap-2 text-[#C59B27] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Magia e Sabor na Sua Mesa
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                O grand finale perfeito para a sua ceia de Natal
              </h3>

              <p className="text-sm sm:text-base text-[#FDFBF7]/80 leading-relaxed">
                Deixe a nossa confeitaria artesanal cuidar da sobremesa mais importante do ano.
                Receitas exclusivas entregues frescas
                e prontas para encantar toda a sua família na noite de Natal.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#FDFBF7]/90">
                  <Truck className="w-5 h-5 text-[#C59B27] shrink-0" />
                  <span>Taxa Única de Entrega</span>
                </div>
                <div className="flex items-center gap-2 text-[#FDFBF7]/90">
                  <Gift className="w-5 h-5 text-[#C59B27] shrink-0" />
                  <span>Embalagens Lindas</span>
                </div>
                <div className="flex items-center gap-2 text-[#FDFBF7]/90">
                  <ShieldCheck className="w-5 h-5 text-[#C59B27] shrink-0" />
                  <span>Produção Limitada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Sobre / Nossa Cozinha */}

      <section
        id="sobre"
        className="border-t border-[#2C1E16]/10 bg-white py-16 sm:py-24"
      >
        <div className="max-w-6xl mx-auto p-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center ">

          {/* Foto da Fachada */}
          <div className="w-full ">
            <div className="relative aspect-[5/4] w-full rounded-2xl overflow-hidden shadow-xl border border-[#2C1E16]/10 bg-[#FDFBF7]">

              <img
                src="/casa.jpg"
                alt="Fachada da nossa confeitaria artesanal"
                className="w-full h-full object-cover object-center "
              />

              {/* Selo de Produção Própria */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#2C1E16]/95 backdrop-blur-sm text-[#FDFBF7] px-4 py-3 rounded-xl border border-[#C59B27]/40 flex items-center gap-3 shadow-lg">

                <div className="bg-[#C59B27]/20 p-2 rounded-lg text-[#C59B27] shrink-0">
                  <Award className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">
                    Produção Própria
                  </p>

                  <p className="text-xs sm:text-sm text-[#FDFBF7]/90">
                    Confeitaria artesanal com retirada no local ou delivery
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* História e Informações da Loja */}
          <div className="flex flex-col justify-center space-y-6">

            {/* Título */}
            <div className="space-y-3">

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C59B27]">
                Nossa História
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#8B1E24] leading-tight">
                Feito em família
              </h2>

            </div>

            {/* Descrição */}
            <div className="space-y-4">

              <p className="text-[#2C1E16]/80 text-sm sm:text-base leading-relaxed">
                Cada pudim, mousse e torta de Natal é
                preparado artesanalmente sob encomenda em nosso ateliê, sem
                conservantes e com seleção rigorosa de ingredientes frescos.
              </p>

              <p className="text-[#2C1E16]/80 text-sm sm:text-base leading-relaxed">
                Trabalhamos com lotes limitados para garantir que cada
                encomenda chegue impecável à sua mesa, seja por entrega agendada
                ou retirada.
              </p>

            </div>

            {/* Cards de Endereço e Horário */}
            <div className="grid sm:grid-cols-2 gap-4 items-stretch">

              <div className="h-full bg-[#FDFBF7] p-4 rounded-xl border border-[#2C1E16]/10 flex items-start gap-3">

                <MapPin className="w-5 h-5 text-[#8B1E24] shrink-0 mt-0.5" />

                <div>
                  <h3 className="font-semibold text-sm text-[#2C1E16]">
                    Retirada no Local
                  </h3>

                  <p className="text-xs text-[#2C1E16]/70 mt-2 leading-relaxed">
                    Rua Rio José Afonso, nº 26 — Eldorado, Diadema
                  </p>
                </div>

              </div>

              <div className="h-full bg-[#FDFBF7] p-4 rounded-xl border border-[#2C1E16]/10 flex items-start gap-3">

                <Clock className="w-5 h-5 text-[#1E4D3B] shrink-0 mt-0.5" />

                <div>
                  <h3 className="font-semibold text-sm text-[#2C1E16]">
                    Atendimento de Natal
                  </h3>

                  <p className="text-xs text-[#2C1E16]/70 mt-2 leading-relaxed">
                    Seg a Sáb, das 09h às 19h • Entregas agendadas até 24/12
                  </p>
                </div>

              </div>

            </div>

            {/* Ações rápidas */}
            <div className="flex flex-wrap items-center gap-3 pt-1">

              <a
                href="#produtos"
                className="bg-[#8B1E24] hover:bg-[#70161B] text-[#FDFBF7] px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-sm"
              >
                Fazer minha encomenda
              </a>

              <a

                href="https://wa.me/5511989585389"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E4D3B] hover:text-[#163A2C] px-4 py-3 rounded-lg border border-[#1E4D3B]/25 hover:bg-[#1E4D3B]/5 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Tirar dúvidas no WhatsApp
              </a>

            </div>

          </div>

        </div>
      </section>


      <CartDrawer />
    </div>
  );
}