import React, { useState } from 'react';
import { X, Check, ShieldCheck, ArrowRight, ArrowLeft, Printer, BookOpen } from 'lucide-react';
import { CartItem, OrderReceipt } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  giftWrapping: boolean;
  onOrderCompleted: (receipt: OrderReceipt) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  giftWrapping,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [formData, setFormData] = useState({
    name: 'Julian Mercer',
    email: 'julian.mercer@oxfordalumni.org',
    address: '42 St. Giles High Street, Flat 3B',
    city: 'Oxford',
    postalCode: 'OX1 3PW',
    country: 'United Kingdom',
    giftNote: giftWrapping ? 'For Clara, with warm literary wishes from the autumn collection.' : '',
    cardNumber: '•••• •••• •••• 4821',
    cardExp: '08/28',
    cardCvc: '•••',
  });
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const giftWrapCost = giftWrapping ? 4.50 : 0;
  const shippingCost = subtotal >= 40 ? 0 : 5.00;
  const total = subtotal + giftWrapCost + shippingCost;

  const handleCompleteOrder = () => {
    const orderNumber = `MR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReceipt: OrderReceipt = {
      orderId: orderNumber,
      date: 'October 28, 2026',
      items: [...items],
      subtotal,
      shipping: shippingCost,
      giftWrapping,
      giftNote: formData.giftNote,
      tax: 0,
      total,
      customer: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
    };

    setReceipt(newReceipt);
    setStep('confirmation');
    onOrderCompleted(newReceipt);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/50 backdrop-blur-xs animate-fadeIn"
    >
      <div className="w-full max-w-2xl bg-[#FAF8F5] border border-[#E2DCD5] rounded-[0.375rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Modal Header */}
        <div className="px-6 py-4 border-b border-[#E2DCD5] flex items-center justify-between bg-white shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C2410C]">
              {step === 'confirmation' ? 'Order Confirmed' : 'Bespoke Checkout'}
            </span>
            <h2 id="checkout-title" className="font-serif-editorial text-lg font-semibold text-[#0F172A]">
              {step === 'shipping' && 'Step 1: Recipient & Shipping Address'}
              {step === 'payment' && 'Step 2: Payment & Order Finalization'}
              {step === 'confirmation' && `Order Receipt ${receipt?.orderId}`}
            </h2>
          </div>
          {step !== 'confirmation' && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-[#F5F1EA] rounded-full text-slate-500 hover:text-black cursor-pointer"
              aria-label="Close Checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === 'shipping' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-[0.25rem] text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-[0.25rem] text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-[0.25rem] text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-[0.25rem] text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-[0.25rem] text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-[0.25rem] text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                  />
                </div>
              </div>

              {giftWrapping && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Handwritten Gift Note (Included with Archival Wax Seal)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.giftNote}
                    onChange={(e) => setFormData({ ...formData, giftNote: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#CBD5E1] rounded-[0.25rem] text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                  />
                </div>
              )}
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <div className="p-4 bg-white border border-[#E2DCD5] rounded-[0.25rem]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Payment Method
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      disabled
                      className="w-full px-3 py-2 text-sm font-mono bg-[#FAF8F5] border border-[#CBD5E1] rounded-[0.25rem] text-slate-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Expiration</label>
                      <input
                        type="text"
                        value={formData.cardExp}
                        disabled
                        className="w-full px-3 py-2 text-sm font-mono bg-[#FAF8F5] border border-[#CBD5E1] rounded-[0.25rem] text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Security Code</label>
                      <input
                        type="text"
                        value={formData.cardCvc}
                        disabled
                        className="w-full px-3 py-2 text-sm font-mono bg-[#FAF8F5] border border-[#CBD5E1] rounded-[0.25rem] text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="p-4 bg-[#F5F1EA] rounded-[0.25rem] border border-[#E2DCD5] text-xs font-sans-editorial">
                <span className="font-bold text-[#0F172A] block mb-2">Order Ledger Summary:</span>
                <div className="space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>{items.reduce((s, i) => s + i.quantity, 0)} Items Subtotal</span>
                    <span className="font-semibold text-[#0F172A]">${subtotal.toFixed(2)}</span>
                  </div>
                  {giftWrapping && (
                    <div className="flex justify-between">
                      <span>Archival Gift Wrap</span>
                      <span className="font-semibold text-[#0F172A]">${giftWrapCost.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping ({shippingCost === 0 ? 'Complimentary' : 'Standard'})</span>
                    <span className="font-semibold text-[#0F172A]">
                      {shippingCost === 0 ? '$0.00' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#0F172A] pt-2 border-t border-[#E2DCD5]">
                    <span>Total Charged</span>
                    <span className="tabular-nums">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'confirmation' && receipt && (
            <div className="space-y-6">
              <div className="text-center py-4 bg-[#F7FEE7] border border-[#3F6212]/30 rounded-[0.25rem]">
                <div className="w-10 h-10 rounded-full bg-[#3F6212] text-white mx-auto flex items-center justify-center mb-2">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif-editorial text-xl font-bold text-[#0F172A]">
                  Order Confirmed & Preparing for Dispatch
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  A receipt has been dispatched to <span className="font-semibold">{receipt.customer.email}</span>
                </p>
              </div>

              {/* Editorial Ledger Receipt */}
              <div className="p-5 bg-white border border-[#E2DCD5] rounded-[0.25rem] text-xs font-sans-editorial">
                <div className="flex justify-between items-baseline border-b border-[#E2DCD5] pb-3 mb-3">
                  <div>
                    <span className="font-serif-editorial text-lg font-bold text-[#0F172A]">
                      MonaReads Bookseller
                    </span>
                    <p className="text-[11px] text-slate-500">Bespoke Archival Fulfillment</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-[#0F172A]">{receipt.orderId}</span>
                    <p className="text-[11px] text-slate-400">{receipt.date}</p>
                  </div>
                </div>

                <div className="divide-y divide-[#E2DCD5] mb-4">
                  {receipt.items.map((it) => (
                    <div key={it.id} className="py-2.5 flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-[#0F172A]">{it.title}</p>
                        <p className="text-[11px] text-slate-500">
                          {it.format} · Qty: {it.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-[#0F172A] tabular-nums">
                        ${(it.price * it.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E2DCD5] pt-3 space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="text-[#0F172A] font-medium">${receipt.subtotal.toFixed(2)}</span>
                  </div>
                  {receipt.giftWrapping && (
                    <div className="flex justify-between text-slate-600">
                      <span>Archival Kraft Gift Wrap</span>
                      <span className="text-[#0F172A] font-medium">$4.50</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Courier Delivery</span>
                    <span className="text-[#0F172A] font-medium">
                      {receipt.shipping === 0 ? 'Complimentary' : `$${receipt.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#0F172A] pt-2 border-t border-[#E2DCD5]">
                    <span>Total Paid</span>
                    <span className="tabular-nums">${receipt.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2DCD5] text-[11px] text-slate-500">
                  <span className="font-bold text-slate-700 block mb-0.5">Dispatched to:</span>
                  <p>{receipt.customer.name}</p>
                  <p>{receipt.customer.address}, {receipt.customer.city} {receipt.customer.postalCode}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-white border-t border-[#E2DCD5] flex items-center justify-between shrink-0">
          {step === 'shipping' && (
            <>
              <button
                onClick={onClose}
                className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep('payment')}
                className="px-5 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-semibold uppercase tracking-wider rounded-[0.25rem] flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 'payment' && (
            <>
              <button
                onClick={() => setStep('shipping')}
                className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-black flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={handleCompleteOrder}
                className="px-6 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-semibold uppercase tracking-wider rounded-[0.25rem] flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Authorize & Place Order (${total.toFixed(2)})</span>
              </button>
            </>
          )}

          {step === 'confirmation' && (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-[#CBD5E1] rounded-[0.25rem] text-xs font-semibold text-slate-700 hover:bg-[#F5F1EA] flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded-[0.25rem] cursor-pointer"
              >
                Return to Bookstore
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
