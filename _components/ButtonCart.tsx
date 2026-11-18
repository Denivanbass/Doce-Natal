'use client';

import { useEffect, useState } from 'react';
import { Clock, LogIn, ShoppingBasket } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';


export default function ButtonCart() {
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);

  // Evita hydration mismatch do Next.js com localStorage
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <button
        onClick={openCart}
        className="relative inline-flex items-center gap-2 bg-[#1E4D3B] hover:bg-[#163A2C] text-[#FDFBF7] px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm cursor-pointer"
      >
        <ShoppingBasket className="w-5 h-5" />
        <span>Carrinho</span>
        {mounted && totalItems > 0 && (
          <span className="ml-1 bg-[#C59B27] text-[#2C1E16] text-xs font-bold px-2 py-0.5 rounded-full">
            {totalItems}
          </span>
        )}
      </button>

    </>
  );
}