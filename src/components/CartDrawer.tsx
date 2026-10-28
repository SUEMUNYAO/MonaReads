import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Gift, Check, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  giftWrapping: boolean;
  onToggleGiftWrapping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  giftWrapping,
  onToggleGiftWrapping,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const giftWrapCost = giftWrapping ? 4.50 : 0;
  const freeShippingThreshold = 40.00;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = items.length === 0 ? 0 : (isFreeShipping ? 0 : 5.00);
  const total = subtotal + giftWrapCost + shippingCost;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Muted Ink Scrim */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E2DCD5] shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-[#E2DCD5] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C2410C]">
                Your Order Ledger
              </span>
              <h2 id="cart-drawer-title" className="font-serif-editorial text-xl font-semibold text-[#0F172A]">
                Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#F5F1EA] rounded-[0.25rem] text-slate-500 hover:text-[#0F172A] transition-colors cursor-pointer"
              aria-label="Close Shopping Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="px-6 py-3 bg-[#F5F1EA] border-b border-[#E2DCD5] text-xs">
              {isFreeShipping ? (
                <div className="flex items-center gap-2 text-[#3F6212] font-semibold">
                  <Check className="w-4 h-4" />
                  <span>Complimentary Courier Shipping unlocked</span>
                </div>
              ) : (
                <div>
                  <p className="text-slate-700">
                    Add <span className="font-bold text-[#0F172A]">${remainingForFreeShipping.toFixed(2)}</span> more for Complimentary Courier Shipping
                  </p>
                  <div className="w-full h-1.5 bg-[#E2DCD5] rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-[#C2410C] rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E2DCD5]">
            {items.length === 0 ? (
              <div className="py-20 text-center">
                <span className="font-serif-editorial text-4xl text-slate-300 block mb-2">
                  ❦
                </span>
                <p className="font-serif-editorial text-lg text-slate-600 mb-1">
                  Your bag is currently empty
                </p>
                <p className="text-xs text-slate-600 font-sans-editorial max-w-xs mx-auto mb-6">
                  Browse our curated catalogue for first editions, independent fiction, and rare collector bindings.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0F172A] border border-[#0F172A] hover:bg-[#0F172A] hover:text-[#FAF8F5] transition-colors rounded-[0.25rem] cursor-pointer"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 flex gap-4">
                  {/* Thumbnail with miniature spine shadow */}
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-16 h-22 object-cover rounded-[0.125rem] book-spine-shadow shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-editorial text-sm font-semibold text-[#0F172A] line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-600 hover:text-[#ba1a1a] transition-colors p-0.5 cursor-pointer"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-600 font-bold mt-0.5">
                        {item.author}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 bg-[#F5F1EA] text-[#0F172A] rounded-full border border-[#E2DCD5]">
                        {item.format}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#CBD5E1] bg-white rounded-[0.25rem] h-7">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 h-full flex items-center justify-center text-slate-600 hover:text-black cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold tabular-nums text-[#0F172A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 h-full flex items-center justify-center text-slate-600 hover:text-black cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-sans-editorial text-sm font-bold text-[#0F172A] tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Gift Wrapping & Ledger Summary Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-[#FFFFFF] border-t border-[#E2DCD5]">
              {/* Gift Wrapping Toggle */}
              <div
                onClick={onToggleGiftWrapping}
                className={`p-3 rounded-[0.25rem] border mb-4 cursor-pointer transition-all flex items-center justify-between text-xs ${
                  giftWrapping
                    ? 'bg-[#FFF7ED] border-[#C2410C]/40 text-[#0F172A]'
                    : 'bg-[#FAF8F5] border-[#E2DCD5] text-slate-600 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Gift className={`w-4 h-4 ${giftWrapping ? 'text-[#C2410C]' : 'text-slate-500'}`} />
                  <div>
                    <span className="font-semibold block">Archival Gift Presentation (+$4.50)</span>
                    <span className="text-[11px] text-slate-600">
                      Unbleached kraft paper, botanical wax seal & card
                    </span>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-[0.125rem] border flex items-center justify-center transition-colors ${
                    giftWrapping ? 'bg-[#0F172A] border-[#0F172A] text-white' : 'border-slate-300'
                  }`}
                >
                  {giftWrapping && <Check className="w-3 h-3" />}
                </div>
              </div>

              {/* Order Ledger Breakdown */}
              <div className="space-y-2 text-xs font-sans-editorial border-b border-[#E2DCD5] pb-4 mb-4">
                <div className="flex justify-between text-slate-600">
                  <span>Merchandise Subtotal</span>
                  <span className="text-[#0F172A] font-semibold tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {giftWrapping && (
                  <div className="flex justify-between text-slate-600">
                    <span>Archival Gift Wrap</span>
                    <span className="text-[#0F172A] font-semibold tabular-nums">${giftWrapCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Courier Shipping</span>
                  <span className="text-[#0F172A] font-semibold tabular-nums">
                    {shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0F172A] pt-2 border-t border-[#E2DCD5]">
                  <span>Total Due</span>
                  <span className="tabular-nums text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Primary Action Button per spec */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3 px-4 bg-[#C2410C] hover:bg-[#9A3412] active:translate-y-px text-white text-xs font-semibold uppercase tracking-wider rounded-[0.25rem] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 mt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3F6212]" />
                <span>Encrypted checkout · Dispatched in archival book mailers</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
