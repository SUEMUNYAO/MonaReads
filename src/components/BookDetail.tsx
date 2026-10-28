import React, { useState } from 'react';
import {
  Star,
  BookOpen,
  Bookmark,
  Share2,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowLeft,
  Plus,
  Minus
} from 'lucide-react';
import { Book, BookFormatType } from '../types';

interface BookDetailProps {
  book: Book;
  onBack: () => void;
  onAddToCart: (book: Book, format: BookFormatType, quantity: number) => void;
  onLookInside: (book: Book) => void;
  isSaved: boolean;
  onToggleSave: (bookId: string) => void;
}

export const BookDetail: React.FC<BookDetailProps> = ({
  book,
  onBack,
  onAddToCart,
  onLookInside,
  isSaved,
  onToggleSave,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<BookFormatType>(book.formats[0].type);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeFormat = book.formats.find(f => f.type === selectedFormat) || book.formats[0];

  const handleAddToCart = () => {
    onAddToCart(book, selectedFormat, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 lg:px-12 py-8 animate-fadeIn">
      {/* Editorial Breadcrumbs & Back Action */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E2DCD5]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-[#0F172A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#C2410C]" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-sans-editorial">
          <span>{book.category}</span>
          <span>/</span>
          <span className="text-[#0F172A] font-medium truncate max-w-[200px] sm:max-w-none">
            {book.title}
          </span>
        </div>
      </div>

      {/* Main 2-Column Contiguous Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Cover Showcase & Physical Specs */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-md bg-[#F5F1EA] p-8 md:p-12 border border-[#E2DCD5] rounded-[0.375rem] flex flex-col items-center justify-center relative">
            {book.badge && (
              <span
                className={`absolute top-4 left-4 px-2.5 py-1 text-[11px] font-bold rounded-[0.125rem] ${
                  book.badge.type === 'terracotta'
                    ? 'bg-[#FFF7ED] text-[#C2410C] border border-[#C2410C]/40'
                    : 'bg-[#F7FEE7] text-[#3F6212] border border-[#3F6212]/40'
                }`}
              >
                {book.badge.text}
              </span>
            )}

            {/* Book Cover with Enhanced Dual-Layer Spine Shadow */}
            <div className="w-64 sm:w-72 aspect-[3/4] relative my-4">
              <img
                src={book.coverImage}
                alt={book.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[0.125rem] book-spine-shadow-lg border-l border-white/20"
              />
              <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/25 via-white/10 to-transparent pointer-events-none rounded-l-[0.125rem]" />
            </div>

            {/* Look Inside Trigger */}
            <button
              onClick={() => onLookInside(book)}
              className="mt-6 w-full py-2.5 px-4 bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#0F172A] text-xs font-semibold uppercase tracking-wider rounded-[0.25rem] border border-[#E2DCD5] flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#C2410C]" />
              <span>Read Chapter Excerpt & Look Inside</span>
            </button>
          </div>

          {/* Physical Specifications Table */}
          <div className="w-full max-w-md mt-8 p-6 bg-[#FAF8F5] border border-[#E2DCD5] rounded-[0.25rem]">
            <h4 className="font-serif-editorial text-base font-semibold text-[#0F172A] mb-4 pb-2 border-b border-[#E2DCD5]">
              Volume Specifications & Provenance
            </h4>
            <dl className="grid grid-cols-2 gap-y-3 text-xs font-sans-editorial">
              <dt className="text-slate-500 font-medium">Binding Format</dt>
              <dd className="text-[#0F172A] font-semibold text-right">{book.specs.binding}</dd>

              <dt className="text-slate-500 font-medium">Paper Stock</dt>
              <dd className="text-[#0F172A] text-right truncate" title={book.specs.paperStock}>
                {book.specs.paperStock}
              </dd>

              <dt className="text-slate-500 font-medium">Page Count</dt>
              <dd className="text-[#0F172A] font-semibold text-right tabular-nums">{book.specs.pages} pages</dd>

              <dt className="text-slate-500 font-medium">Dimensions</dt>
              <dd className="text-[#0F172A] text-right">{book.specs.dimensions}</dd>

              <dt className="text-slate-500 font-medium">Publisher</dt>
              <dd className="text-[#0F172A] text-right">{book.specs.publisher}</dd>

              <dt className="text-slate-500 font-medium">ISBN-13</dt>
              <dd className="text-[#0F172A] font-mono text-right">{book.specs.isbn13}</dd>
            </dl>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module & Editorial Commentary */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          {/* Category & Author in label-caps */}
          <div className="mb-2 flex items-center gap-2 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#C2410C]">
              {book.category}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
              By {book.author}
            </span>
          </div>

          {/* Book Title */}
          <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F172A] leading-tight mb-3">
            {book.title}
          </h1>

          {book.subtitle && (
            <p className="font-serif-editorial text-lg text-slate-600 italic mb-4">
              {book.subtitle}
            </p>
          )}

          {/* Star Rating Unit */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#E2DCD5]">
            <div className="flex items-center text-[#3F6212]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(book.rating)
                      ? 'fill-[#3F6212] text-[#3F6212]'
                      : 'text-[#E2DCD5]'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-[#0F172A] tabular-nums">
              {book.rating.toFixed(2)}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">
              {book.reviewCount} Verified Critical & Reader Reviews
            </span>
          </div>

          {/* Format Selector Module */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Select Binding & Edition:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {book.formats.map((fmt) => (
                <button
                  key={fmt.type}
                  type="button"
                  onClick={() => setSelectedFormat(fmt.type)}
                  className={`p-3.5 text-left rounded-[0.25rem] border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedFormat === fmt.type
                      ? 'bg-[#0F172A] text-[#FAF8F5] border-[#0F172A] shadow-sm'
                      : 'bg-[#FAF8F5] text-[#0F172A] border-[#E2DCD5] hover:bg-[#F5F1EA]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-bold tracking-tight">
                      {fmt.type}
                    </span>
                    <span className="text-sm font-bold tabular-nums">
                      ${fmt.price.toFixed(2)}
                    </span>
                  </div>
                  <p
                    className={`text-xs line-clamp-2 ${
                      selectedFormat === fmt.type ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {fmt.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Stock status */}
          <div className="bg-[#FAF8F5] p-5 border border-[#E2DCD5] rounded-[0.25rem] mb-6">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <span className="text-xs text-slate-500 block uppercase tracking-wider font-medium">
                  Current Format Total
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-sans-editorial text-3xl font-bold text-[#0F172A] tabular-nums">
                    ${(activeFormat.price * quantity).toFixed(2)}
                  </span>
                  {activeFormat.msrp && (
                    <span className="text-sm text-slate-600 line-through tabular-nums">
                      ${(activeFormat.msrp * quantity).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block text-xs font-semibold px-2.5 py-1 bg-[#F7FEE7] text-[#3F6212] border border-[#3F6212]/30 rounded-[0.125rem]">
                  {activeFormat.stockStatus}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">Dispatches within 24 hours</p>
              </div>
            </div>

            {/* Actions Bar: Quantity, Add to Bag, Bookmark */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#CBD5E1] bg-white rounded-[0.25rem] h-11">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 h-full flex items-center justify-center text-slate-600 hover:text-black cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-bold tabular-nums text-[#0F172A]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 h-full flex items-center justify-center text-slate-600 hover:text-black cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Primary Add to Bag CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 h-11 px-6 text-sm font-semibold uppercase tracking-wider rounded-[0.25rem] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  addedAnimation
                    ? 'bg-[#3F6212] text-white'
                    : 'bg-[#C2410C] hover:bg-[#9A3412] active:translate-y-px text-white'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add {quantity > 1 ? `${quantity} Copies` : ''} to Bag</span>
                )}
              </button>

              {/* Save / Wishlist Toggle */}
              <button
                type="button"
                onClick={() => onToggleSave(book.id)}
                className={`h-11 px-3.5 border rounded-[0.25rem] flex items-center justify-center cursor-pointer transition-colors ${
                  isSaved
                    ? 'bg-[#F5F1EA] border-[#0F172A] text-[#C2410C]'
                    : 'bg-white border-[#CBD5E1] text-slate-600 hover:text-[#0F172A]'
                }`}
                title={isSaved ? 'In your Reading Room' : 'Save to Reading Room'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#C2410C]' : ''}`} />
              </button>

              {/* Share button */}
              <button
                type="button"
                onClick={handleShare}
                className="h-11 px-3.5 bg-white border border-[#CBD5E1] text-slate-600 hover:text-[#0F172A] rounded-[0.25rem] flex items-center justify-center cursor-pointer transition-colors"
                title="Share link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-[#3F6212]" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#E2DCD5] mb-8 text-xs text-slate-600 font-sans-editorial">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#3F6212] shrink-0" />
              <span>Complimentary over $40</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3F6212] shrink-0" />
              <span>Archival Kraft Wrap</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#3F6212] shrink-0" />
              <span>30-Day Literary Exchange</span>
            </div>
          </div>

          {/* Staff Recommendation Card per Design System Spec */}
          {book.staffPickNote && (
            <div className="mb-8 p-6 bg-[#F5F1EA] border border-[#E2DCD5] rounded-[0.25rem] relative">
              <span className="font-serif-editorial text-5xl text-[#C2410C]/40 absolute top-2 left-4 select-none pointer-events-none">
                “
              </span>
              <p className="font-serif-editorial text-base italic text-[#0F172A] leading-relaxed relative z-10 pl-6 mb-4">
                {book.staffPickNote.quote}
              </p>
              <div className="flex items-center justify-between pl-6 border-t border-[#E2DCD5] pt-3">
                <div>
                  <p className="text-xs font-bold text-[#0F172A]">
                    {book.staffPickNote.curatorName}
                  </p>
                  <p className="text-[11px] text-slate-500 font-sans-editorial">
                    {book.staffPickNote.curatorRole}
                  </p>
                </div>
                <span className="font-serif-editorial italic text-xs text-slate-400">
                  Staff Dispatch
                </span>
              </div>
            </div>
          )}

          {/* Book Synopsis & Longform Prose */}
          <div className="prose prose-slate max-w-none mb-10">
            <h3 className="font-serif-editorial text-xl font-semibold text-[#0F172A] mb-3">
              Editorial Overview
            </h3>
            <p className="font-sans-editorial text-[15px] leading-relaxed text-slate-700 whitespace-pre-line">
              {book.synopsis}
            </p>
          </div>

          {/* Reviews Breakdown Section */}
          <div className="p-6 bg-white border border-[#E2DCD5] rounded-[0.25rem]">
            <h3 className="font-serif-editorial text-xl font-semibold text-[#0F172A] mb-4">
              Reader & Critical Evaluation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6 pb-6 border-b border-[#E2DCD5]">
              <div className="md:col-span-4 text-center md:text-left">
                <span className="font-sans-editorial text-4xl font-bold text-[#0F172A] tabular-nums">
                  {book.rating.toFixed(2)}
                </span>
                <div className="flex items-center justify-center md:justify-start text-[#3F6212] my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(book.rating)
                          ? 'fill-[#3F6212] text-[#3F6212]'
                          : 'text-[#E2DCD5]'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  Based on {book.reviewCount} verified submissions
                </p>
              </div>

              {/* Terracotta Breakdown Bar Chart */}
              <div className="md:col-span-8 flex flex-col gap-1.5">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = book.ratingBreakdown[stars as keyof typeof book.ratingBreakdown] || 0;
                  const pct = Math.round((count / book.reviewCount) * 100);
                  return (
                    <div key={stars} className="flex items-center gap-3 text-xs">
                      <span className="w-12 text-slate-500 font-medium">{stars} Stars</span>
                      <div className="flex-1 h-2 bg-[#F5F1EA] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C2410C] rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-slate-400 tabular-nums">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Reviews List */}
            <div className="space-y-4">
              {book.reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-[#FAF8F5] rounded-[0.25rem] border border-[#E2DCD5]">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-bold text-[#0F172A]">{rev.reviewer}</span>
                      <span className="text-slate-400 mx-1.5">·</span>
                      <span className="text-[11px] text-[#3F6212] font-semibold">{rev.source}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>
                  <p className="font-serif-editorial text-sm italic text-slate-700">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
