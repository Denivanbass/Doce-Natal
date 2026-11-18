
'use client';

import { useState } from 'react';
import {
  ShoppingBag,
  Check,
  Plus,
  Minus,
  X,
  Trash2,
  Store,
  Truck,
  User,
  MapPin,
} from 'lucide-react';

import { useCartStore } from '@/store/useCartStore';
import { formatBRL } from '@/data/products';

type DeliveryMethod = 'retirada' | 'entrega';

const DELIVERY_FEE = 20;
const WHATSAPP_NUMBER = '5511989585389';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    clearCart,
  } = useCartStore();

  const [customerName, setCustomerName] = useState('');
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>('retirada');
  const [address, setAddress] = useState('');

  // Calcula o subtotal dos produtos
  const subtotalPrice = items.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );

  // Calcula a taxa de entrega
  const deliveryFee =
    deliveryMethod === 'entrega' ? DELIVERY_FEE : 0;

  // Calcula o valor total
  const totalPrice = subtotalPrice + deliveryFee;

  // Valida os campos obrigatórios
  const isCheckoutDisabled =
    items.length === 0 ||
    !customerName.trim() ||
    (deliveryMethod === 'entrega' && !address.trim());

  // Monta e envia o pedido para o WhatsApp
  const handleCheckout = () => {
    if (isCheckoutDisabled) return;

    const summary = items
      .map(
        (item) =>
          `• ${item.quantity}x ${item.product.name} — ${formatBRL(
            item.product.price * item.quantity
          )}`
      )
      .join('\n');

    const deliveryInfo =
      deliveryMethod === 'retirada'
        ? `🛍️ *Forma de recebimento:* Retirada no local (Grátis)`
        : `🚚 *Forma de recebimento:* Entrega
📍 *Endereço:* ${address.trim()}
💵 *Taxa de entrega:* ${formatBRL(DELIVERY_FEE)}`;

    const rawMessage = [
      'Olá! Tudo bem? 😊',
      '',
      `Meu nome é *${customerName.trim()}* e gostaria de fazer uma encomenda.`,
      '',
      '🎄 *MEU PEDIDO*',
      '',
      summary,
      '',
      '━━━━━━━━━━━━━━━━',
      '🧾 *RESUMO DOS VALORES*',
      '',
      `Subtotal: ${formatBRL(subtotalPrice)}`,
      ...(deliveryMethod === 'entrega'
        ? [`Entrega: ${formatBRL(DELIVERY_FEE)}`]
        : []),
      '',
      `💰 *TOTAL: ${formatBRL(totalPrice)}*`,
      '━━━━━━━━━━━━━━━━',
      '',
      '📦 *FORMA DE RECEBIMENTO*',
      '',
      deliveryInfo,
      '',
      'Gostaria de confirmar a disponibilidade do pedido e receber as orientações para pagamento.',
      '',
      'Aguardo seu retorno! Muito obrigado(a). ❤️',
    ].join('\n');

    const message = encodeURIComponent(rawMessage);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div
      onClick={closeCart}
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-out ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm bg-[#FDFBF7] text-[#2C1E16] h-full shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2C1E16]/10 shrink-0">
          <h3 className="font-serif text-xl font-bold text-[#8B1E24]">
            Sua Encomenda de Natal
          </h3>

          <button
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="p-1.5 rounded-lg hover:bg-[#2C1E16]/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Carrinho vazio */}
        {items.length === 0 ? (
          <div className="py-16 text-center space-y-3 my-auto">
            <ShoppingBag className="w-12 h-12 mx-auto text-[#2C1E16]/30" />

            <p className="text-sm text-[#2C1E16]/70">
              Seu carrinho ainda está vazio.
            </p>
          </div>
        ) : (
          <>
            {/* Área central com rolagem */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-5 mt-2">

              {/* Lista de produtos */}
              <div className="divide-y divide-[#2C1E16]/10">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="py-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-lg object-cover shrink-0 border border-[#2C1E16]/10 bg-[#EFE6D8]"
                      />

                      <div className="min-w-0">
                        <p className="font-semibold text-sm leading-snug line-clamp-2">
                          {product.name}
                        </p>

                        <p className="text-xs text-[#8B1E24] font-bold mt-1">
                          {formatBRL(product.price * quantity)}
                        </p>
                      </div>
                    </div>

                    {/* Controle de quantidade */}
                    <div className="flex items-center gap-1.5 border border-[#2C1E16]/20 rounded-lg px-2 py-1 shrink-0">
                      <button
                        onClick={() =>
                          updateQuantity(product.id, -1)
                        }
                        aria-label="Diminuir quantidade"
                        className="p-1 hover:text-[#8B1E24] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-sm font-semibold w-5 text-center">
                        {quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(product.id, 1)
                        }
                        aria-label="Aumentar quantidade"
                        className="p-1 hover:text-[#1E4D3B] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dados do cliente */}
              <div className="pt-4 border-t border-[#2C1E16]/10 space-y-4">

                {/* Nome */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="customer-name"
                    className="text-xs font-bold uppercase tracking-wider text-[#2C1E16]/75 flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-[#8B1E24]" />
                    Seu Nome *
                  </label>

                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) =>
                      setCustomerName(e.target.value)
                    }
                    placeholder="Ex: Maria Silva"
                    className={`w-full px-3 py-2.5 text-sm rounded-lg bg-white border transition-colors focus:outline-none ${
                      !customerName.trim()
                        ? 'border-[#2C1E16]/20 focus:border-[#8B1E24]'
                        : 'border-[#1E4D3B]/40 focus:border-[#1E4D3B]'
                    }`}
                  />

                  {!customerName.trim() && (
                    <p className="text-[11px] text-[#2C1E16]/50">
                      Informe seu nome para identificar sua encomenda.
                    </p>
                  )}
                </div>

                {/* Forma de recebimento */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2C1E16]/75 block">
                    Como deseja receber?
                  </span>

                  <div className="grid grid-cols-2 gap-2">

                    {/* Retirada */}
                    <button
                      type="button"
                      onClick={() =>
                        setDeliveryMethod('retirada')
                      }
                      className={`py-2.5 px-3 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                        deliveryMethod === 'retirada'
                          ? 'bg-[#8B1E24] text-[#FDFBF7] border-[#8B1E24] shadow-xs'
                          : 'bg-white text-[#2C1E16]/80 border-[#2C1E16]/20 hover:border-[#8B1E24]/50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Store className="w-3.5 h-3.5" />
                        Retirada
                      </span>

                      <span className="text-[10px] opacity-80 font-normal">
                        Grátis
                      </span>
                    </button>

                    {/* Entrega */}
                    <button
                      type="button"
                      onClick={() =>
                        setDeliveryMethod('entrega')
                      }
                      className={`py-2.5 px-3 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                        deliveryMethod === 'entrega'
                          ? 'bg-[#8B1E24] text-[#FDFBF7] border-[#8B1E24] shadow-xs'
                          : 'bg-white text-[#2C1E16]/80 border-[#2C1E16]/20 hover:border-[#8B1E24]/50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5" />
                        Entrega
                      </span>

                      <span className="text-[10px] opacity-80 font-normal">
                        + {formatBRL(DELIVERY_FEE)} (ABC)
                      </span>
                    </button>
                  </div>
                </div>

                {/* Endereço condicional */}
                {deliveryMethod === 'entrega' && (
                  <div className="space-y-1.5 bg-[#EFE6D8]/50 p-3 rounded-lg border border-[#2C1E16]/10">

                    <div className="flex items-center justify-between text-xs text-[#2C1E16]/80">
                      <span>
                        Taxa fixa para toda a região do ABC:
                      </span>

                      <span className="font-bold text-[#8B1E24]">
                        {formatBRL(DELIVERY_FEE)}
                      </span>
                    </div>

                    <label
                      htmlFor="delivery-address"
                      className="text-xs font-bold uppercase tracking-wider text-[#2C1E16]/75 flex items-center gap-1.5 pt-1"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#8B1E24]" />
                      Endereço para entrega *
                    </label>

                    <input
                      id="delivery-address"
                      type="text"
                      required
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                      placeholder="Rua, número, bairro e cidade"
                      className="w-full px-3 py-2 text-sm rounded-lg bg-white border border-[#2C1E16]/20 focus:border-[#8B1E24] focus:outline-none"
                    />

                    {!address.trim() && (
                      <p className="text-[11px] text-[#8B1E24]">
                        Informe o endereço para continuar.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Rodapé fixo */}
            <div className="pt-4 mt-3 border-t border-[#2C1E16]/15 space-y-3 shrink-0">

              {/* Resumo dos valores */}
              <div className="space-y-1 text-xs text-[#2C1E16]/75 pb-2 border-b border-[#2C1E16]/10">
                <div className="flex justify-between">
                  <span>Subtotal dos itens</span>
                  <span>{formatBRL(subtotalPrice)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Taxa de entrega</span>
                  <span className="font-medium text-[#2C1E16]">
                    {deliveryFee > 0
                      ? formatBRL(deliveryFee)
                      : 'Grátis'}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between text-base font-bold">
                <span>Total da Encomenda</span>

                <span className="text-xl text-[#8B1E24]">
                  {formatBRL(totalPrice)}
                </span>
              </div>

              {/* Finalizar pedido */}
              <button
                onClick={handleCheckout}
                disabled={isCheckoutDisabled}
                className={`w-full py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  isCheckoutDisabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#1E4D3B] hover:bg-[#163A2C] text-[#FDFBF7] cursor-pointer'
                }`}
              >
                <Check className="w-4 h-4" />

                {isCheckoutDisabled
                  ? 'Preencha seus dados para continuar'
                  : 'Finalizar Encomenda no WhatsApp'}
              </button>

              {/* Limpar carrinho */}
              <button
                onClick={clearCart}
                className="w-full text-xs text-[#2C1E16]/60 hover:text-[#8B1E24] flex items-center justify-center gap-1.5 py-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Limpar carrinho
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
