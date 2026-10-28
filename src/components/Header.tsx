import React from 'react';
import { ShoppingBag, BookOpen, Bookmark } from 'lucide-react';

interface HeaderProps {
  activeView: 'catalog' | 'detail' | 'library' | 'dispatches';
  onNavigate: (view: 'catalog' | 'library' | 'dispatches') => void;
  cartCount: number;
  onOpenCart: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  cartCount,
  onOpenCart,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E2DCD5] transition-all">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark in Playfair Display (single text element) */}
        <button
          onClick={() => onNavigate('catalog')}
          className="text-left group flex items-baseline gap-2 cursor-pointer focus:outline-none"
          aria-label="MonaReads Homepage"
        >
          <span className="font-serif-editorial text-2xl lg:text-3xl font-bold tracking-tight text-[#0F172A] transition-colors group-hover:text-[#C2410C]">
            MonaReads
          </span>
          <span className="hidden sm:inline-block text-[11px] font-sans-editorial uppercase tracking-[0.14em] text-slate-500 font-semibold">
            Boutique Bookseller
          </span>
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-sans-editorial text-slate-700">
          <button
            onClick={() => onNavigate('catalog')}
            className={`whitespace-nowrap shrink-0 pb-1 font-medium transition-all cursor-pointer ${
              activeView === 'catalog'
                ? 'text-[#0F172A] font-semibold border-b-2 border-[#C2410C]'
                : 'hover:text-[#0F172A] border-b-2 border-transparent'
            }`}
          >
            Curated Catalog
          </button>
          <button
            onClick={() => onNavigate('dispatches')}
            className={`whitespace-nowrap shrink-0 pb-1 font-medium transition-all cursor-pointer ${
              activeView === 'dispatches'
                ? 'text-[#0F172A] font-semibold border-b-2 border-[#C2410C]'
                : 'hover:text-[#0F172A] border-b-2 border-transparent'
            }`}
          >
            Staff Dispatches
          </button>
          <button
            onClick={() => onNavigate('catalog')}
            className="whitespace-nowrap shrink-0 pb-1 font-medium text-slate-700 hover:text-[#0F172A] border-b-2 border-transparent transition-all cursor-pointer"
          >
            Collector&apos;s Press
          </button>
          <button
            onClick={() => onNavigate('library')}
            className={`whitespace-nowrap shrink-0 pb-1 font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'library'
                ? 'text-[#0F172A] font-semibold border-b-2 border-[#C2410C]'
                : 'hover:text-[#0F172A] border-b-2 border-transparent'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-slate-500" />
            <span>Reading Room</span>
            {savedCount > 0 && (
              <span className="text-[11px] bg-[#F5F1EA] text-[#0F172A] px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label={`View Shopping Bag with ${cartCount} items`}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#C2410C] hover:bg-[#9A3412] active:translate-y-px rounded-[0.25rem] transition-colors flex items-center gap-2.5 shadow-sm cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-black/25 text-white rounded-[0.125rem] tabular-nums font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
