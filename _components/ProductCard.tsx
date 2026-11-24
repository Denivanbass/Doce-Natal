'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

export const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    small_description: string | null;
    description: string;
    price: number | any;
    weight: string;
    tag?: string | null;
    image: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const numericPrice = Number(product.price);

  return (
    <div className="group bg-white rounded-2xl border border-[#2C1E16]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <Link href={`/produtos/${product.id}`}>
        <div className="relative h-60 overflow-hidden bg-[#EFE6D8]">
          <img
            src={`${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.tag && (
            <span className="absolute top-3 left-3 bg-[#8B1E24] text-[#FDFBF7] text-xs font-semibold px-3 py-1 rounded-full shadow">
              {product.tag}
            </span>
          )}
        </div>
      </Link>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2">
          <Link href={`/produtos/${product.id}`}>
            <span className="text-xs font-medium text-[#C59B27]">
              {product.weight}
            </span>
            <h3 className="font-serif text-xl font-bold text-[#2C1E16] group-hover:text-[#8B1E24] transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-[#2C1E16]/75 leading-relaxed ">
              {product.small_description}
            </p>
          </Link>
        </div>

        <div className="pt-4 border-t border-[#2C1E16]/10 flex items-center justify-between gap-4">
          <div>
            <span className="text-sm text-[#2C1E16]/80 block">
              Valor unitário
            </span>
            <span className="text-2xl font-bold text-[#2C1E16]">
              {formatBRL(numericPrice)}
            </span>
          </div>

          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                small_description: product.small_description || '',
                description: product.description,
                price: numericPrice,
                weight: product.weight,
                tag: product.tag || undefined,
                image: product.image,
              })
            }
            className="bg-[#1E4D3B] hover:bg-[#163A2C] active:scale-[0.98] text-[#FDFBF7] px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm cursor-pointer"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}