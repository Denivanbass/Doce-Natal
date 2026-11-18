
'use client';

import { useState, useEffect, type MouseEvent } from 'react';

import { useParams } from 'next/navigation';

import {
  Sparkles,
  Truck,
  ShieldCheck,
  Gift,
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  ZoomIn,
} from 'lucide-react';

import { getProductById } from '@/app/(backend)/_actions/produtos/getProductsdetails';

import { useCartStore } from '@/store/useCartStore';

import CartDrawer from '@/_components/CartDrawer';

import Link from 'next/link';

// Tipo do produto recebido do banco
type Product = {
  id: number;
  name: string;
  small_description: string;
  description: string;
  price: number;
  weight: string;
  tag: string | null;
  image: string;
};

// Formatação de preço
const formatBRL = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export default function ProdutoDetalhePage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;

  // Dados do produto
  const [product, setProduct] = useState<Product | null>(null);

  // Imagem selecionada
  const [selectedImage, setSelectedImage] = useState('');

  // Quantidade
  const [quantity, setQuantity] = useState(1);

  // Estados de carregamento e erro
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados do zoom
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({
    x: 50,
    y: 50,
  });

  // Zustand
  const addItem = useCartStore((state) => state.addItem);

  // Busca o produto no banco através da Server Action
  useEffect(() => {
    let active = true;

    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {
        const result = await getProductById(productId);

        if (!active) return;

        if (!result.success) {
          setError(result.error);
          setProduct(null);
          return;
        }

        setProduct(result.product);
        setSelectedImage(result.product.image);

      } catch (err) {
        console.error('Erro ao carregar produto:', err);

        if (active) {
          setError('Não foi possível carregar o produto.');
          setProduct(null);
        }

      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      active = false;
    };

  }, [productId]);

  // Galeria de imagens
  // Atualmente o banco possui apenas uma imagem por produto
  const galleryImages: string[] = product
    ? [product.image]
    : [];

  // Incrementa quantidade
  const handleIncrement = () =>
    setQuantity((prev) => prev + 1);

  // Decrementa quantidade
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Adiciona produto ao carrinho
  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  // Calcula posição do cursor para o zoom
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setMousePos({ x, y });
  };

  // Volta ao topo quando muda o produto
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, [productId]);

  // Estado de carregamento
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] text-[#2C1E16]">
        Carregando produto...
      </div>
    );
  }

  // Produto inexistente ou erro na consulta
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FDFBF7] text-[#2C1E16]">

        <h1 className="text-2xl font-bold">
          {error || 'Produto não encontrado.'}
        </h1>

        <Link
          href="/"
          className="text-[#8B1E24] underline"
        >
          Voltar para o cardápio
        </Link>

      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] text-[#2C1E16] font-sans selection:bg-[#8B1E24] selection:text-[#FDFBF7]">

      {/* Barra de Navegação Superior / Voltar */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#2C1E16]/75 hover:text-[#8B1E24] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />

          Voltar para o Cardápio de Natal

        </Link>

      </div>

      {/* Seção Principal do Produto */}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Galeria de Imagens com Zoom */}

          <div className="md:col-span-6 space-y-4">

            {/* Container da Imagem Principal */}

            <div
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              className="relative rounded-2xl overflow-hidden bg-[#EFE6D8] border border-[#2C1E16]/10 shadow-lg aspect-square cursor-zoom-in group"
            >

              <img
                src={selectedImage}
                alt={product.name}
                style={{
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                }}
                className={`w-full h-full object-cover transition-transform duration-200 ease-out ${
                  isZoomed ? 'scale-175' : 'scale-100'
                }`}
              />

              {product.tag && (
                <span className="absolute top-4 left-4 bg-[#8B1E24] text-[#FDFBF7] text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md pointer-events-none">

                  {product.tag}

                </span>
              )}

              {/* Indicador discreto de zoom */}

              <div
                className={`absolute bottom-3 right-3 bg-[#2C1E16]/75 backdrop-blur-xs text-[#FDFBF7] text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 pointer-events-none transition-opacity duration-200 ${
                  isZoomed ? 'opacity-0' : 'opacity-90'
                }`}
              >

                <ZoomIn className="w-3.5 h-3.5 text-[#C59B27]" />

                <span>Passe o mouse para ampliar</span>

              </div>

            </div>

            {/* Lista de Miniaturas */}

            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">

                {galleryImages.map((imgUrl, index) => {

                  const isActive = selectedImage === imgUrl;

                  return (
                    <button
                      key={`${imgUrl}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(imgUrl)}
                      aria-label={`Visualizar foto ${index + 1} de ${product.name}`}
                      className={`w-8/12 relative aspect-square rounded-xl overflow-hidden bg-[#EFE6D8] border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#8B1E24] ring-2 ring-[#C59B27]/40 shadow-sm'
                          : 'border-transparent opacity-70 hover:opacity-100 hover:border-[#2C1E16]/20'
                      }`}
                    >

                      <img
                        src={imgUrl}
                        alt={`${product.name} - ângulo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />

                    </button>
                  );
                })}

              </div>
            )}

          </div>

          {/* Informações e Ações */}

          <div className="md:col-span-6 space-y-6">

            <div className="space-y-3">

              <div className="inline-flex items-center gap-2 bg-[#C59B27]/15 border border-[#C59B27]/40 px-3 py-1 rounded-full text-xs font-semibold text-[#8B1E24] uppercase tracking-wider">

                <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />

                Edição Limitada de Natal

              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1E16] leading-tight">

                {product.name}

              </h1>

              <div className="flex items-center gap-3">

                <span className="text-sm font-semibold text-[#C59B27] bg-[#C59B27]/10 px-3 py-0.5 rounded-md">

                  {product.weight}

                </span>

              </div>

            </div>

            <div className="border-t border-b border-[#2C1E16]/10 py-5 space-y-3">

              <span className="text-xs uppercase tracking-wider font-bold text-[#2C1E16]/60 block">

                Descrição da Sobremesa

              </span>

              <p className="text-base text-[#2C1E16]/80 leading-relaxed">

                {product.description}

              </p>

            </div>

            {/* Preço e Seletor de Quantidade */}

            <div className="space-y-5 pt-2">

              <div>

                <span className="text-xs text-[#2C1E16]/75 block">
                  Valor unitário
                </span>

                <span className="text-3xl font-bold text-[#8B1E24]">

                  {formatBRL(product.price)}

                </span>

              </div>

              <div className="flex flex-wrap items-center gap-4">

                {/* Contador */}

                <div className="inline-flex items-center border border-[#2C1E16]/20 rounded-lg bg-white overflow-hidden shadow-sm">

                  <button
                    onClick={handleDecrement}
                    className="px-3 py-3 text-[#2C1E16] hover:bg-[#FDFBF7] transition-colors cursor-pointer"
                    aria-label="Diminuir quantidade"
                  >

                    <Minus className="w-4 h-4" />

                  </button>

                  <span className="px-4 text-base font-semibold text-[#2C1E16]">

                    {quantity}

                  </span>

                  <button
                    onClick={handleIncrement}
                    className="px-3 py-3 text-[#2C1E16] hover:bg-[#FDFBF7] transition-colors cursor-pointer"
                    aria-label="Aumentar quantidade"
                  >

                    <Plus className="w-4 h-4" />

                  </button>

                </div>

                {/* Botão Comprar */}

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#1E4D3B] hover:bg-[#163A2C] active:scale-[0.99] text-[#FDFBF7] px-7 py-3.5 rounded-lg font-semibold text-base transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
                >

                  <ShoppingBag className="w-5 h-5" />

                  Adicionar ao carrinho

                </button>

              </div>

            </div>

            {/* Benefícios Rápidos */}

            <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-[#2C1E16]/10 text-xs">

              <div className="flex items-center gap-2 text-[#2C1E16]/80">

                <Truck className="w-4 h-4 text-[#C59B27] shrink-0" />

                <span>Entrega refrigerada em 23/24 dez</span>

              </div>

              <div className="flex items-center gap-2 text-[#2C1E16]/80">

                <Gift className="w-4 h-4 text-[#C59B27] shrink-0" />

                <span>Embalagem presenteável inclusa</span>

              </div>

              <div className="flex items-center gap-2 text-[#2C1E16]/80">

                <ShieldCheck className="w-4 h-4 text-[#C59B27] shrink-0" />

                <span>100% Produção Artesanal</span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Componente do Carrinho */}

      <CartDrawer />

    </div>
  );
}
