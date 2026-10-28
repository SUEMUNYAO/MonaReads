import React, { useState } from 'react';
import { Star, Eye, Plus, Check } from 'lucide-react';
import { Book, BookFormatType } from '../types';

interface BookCardProps {
  book: Book;
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book, format: BookFormatType) => void;
  onLookInside: (book: Book) => void;
  isSaved?: boolean;
  onToggleSave?: (bookId: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onSelectBook,
  onAddToCart,
  onLookInside,
  isSaved = false,
  onToggleSave,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<BookFormatType>(book.formats[0].type);
  const [justAdded, setJustAdded] = useState(false);

  const activeFormatOption = book.formats.find(f => f.type === selectedFormat) || book.formats[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(book, selectedFormat);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleCardClick = () => {
    onSelectBook(book);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-[#FFFFFF] border border-[#E2DCD5] rounded-[0.25rem] p-5 flex flex-col justify-between hover-drift cursor-pointer transition-all duration-200"
    >
      {/* Top Cover Display Area with Dual-Layer Spine Shadow */}
      <div className="relative mb-5 flex justify-center items-center py-2 bg-[#F5F1EA]/50 rounded-[0.25rem] overflow-hidden">
        {/* Curated format badge top-right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-[#FAF8F5] border border-[#E2DCD5] text-[#0F172A] rounded-full shadow-xs">
            {activeFormatOption.type}
          </span>
        </div>

        {/* Optional Editorial badge top-left */}
        {book.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-[0.125rem] ${
                book.badge.type === 'terracotta'
                  ? 'bg-[#FFF7ED] text-[#C2410C] border border-[#C2410C]/40'
                  : 'bg-[#F7FEE7] text-[#3F6212] border border-[#3F6212]/40'
              }`}
            >
              {book.badge.text}
            </span>
          </div>
        )}

        {/* Book Jacket with Spine Ambient Shadow */}
        <div className="relative w-44 sm:w-48 aspect-[3/4] my-2 transition-transform duration-300 group-hover:scale-[1.02]">
          <img
            src={book.coverImage}
            alt={`Book cover of ${book.title} by ${book.author}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover rounded-[0.125rem] book-spine-shadow border-l border-white/20"
          />
          {/* Subtle light reflex along left spine */}
          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-white/15 to-transparent pointer-events-none rounded-l-[0.125rem]" />
        </div>

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-x-4 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLookInside(book);
            }}
            className="flex-1 py-1.5 px-2 bg-[#FAF8F5]/95 hover:bg-white text-[#0F172A] text-xs font-semibold rounded-[0.25rem] border border-[#E2DCD5] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>Look Inside</span>
          </button>
        </div>
      </div>

      {/* Book Metadata & Editorial Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Author in label-caps */}
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#475569] mb-1">
            {book.author}
          </p>

          {/* Book Title in Playfair Display */}
          <h3 className="font-serif-editorial text-[18px] font-semibold leading-snug text-[#0F172A] line-clamp-2 mb-2 group-hover:text-[#C2410C] transition-colors">
            {book.title}
          </h3>

          {/* Star Rating with Olive Sage stars */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-[#3F6212]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(book.rating)
                      ? 'fill-[#3F6212] text-[#3F6212]'
                      : 'text-[#E2DCD5]'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-slate-500 tabular-nums">
              {book.rating.toFixed(1)} ({book.reviewCount})
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-[11px] text-slate-500 truncate max-w-[100px]">
              {book.category}
            </span>
          </div>

          {/* Format selector chips */}
          <div className="flex items-center gap-1.5 mb-4 overflow-x-auto no-scrollbar pb-1">
            {book.formats.map((fmt) => (
              <button
                key={fmt.type}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFormat(fmt.type);
                }}
                className={`text-[11px] px-2 py-0.5 rounded-[0.25rem] transition-all whitespace-nowrap cursor-pointer ${
                  selectedFormat === fmt.type
                    ? 'bg-[#0F172A] text-[#FAF8F5] font-semibold'
                    : 'bg-[#FAF8F5] text-slate-600 border border-[#E2DCD5] hover:border-slate-400'
                }`}
              >
                {fmt.type}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Primary Add to Bag Action */}
        <div className="pt-3 border-t border-[#E2DCD5] flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-sans-editorial text-[20px] font-bold text-[#0F172A] tabular-nums">
              ${activeFormatOption.price.toFixed(2)}
            </span>
            {activeFormatOption.msrp && (
              <span className="text-xs text-slate-600 line-through tabular-nums">
                ${activeFormatOption.msrp.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            aria-label={`Add ${book.title} (${activeFormatOption.type}) to shopping bag`}
            className={`px-3 py-1.5 text-xs font-semibold rounded-[0.25rem] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
              justAdded
                ? 'bg-[#3F6212] text-white'
                : 'bg-[#C2410C] hover:bg-[#9A3412] text-white active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
