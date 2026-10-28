import React from 'react';
import { BookOpen } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'catalog' | 'library' | 'dispatches') => void;
  onFilterCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onFilterCategory }) => {
  return (
    <footer className="mt-20 border-t border-[#E2DCD5] bg-[#F5F1EA] text-[#0F172A] font-sans-editorial">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Editorial Mission */}
          <div className="md:col-span-5">
            <span className="font-serif-editorial text-2xl font-bold tracking-tight text-[#0F172A] block mb-2">
              MonaReads
            </span>
            <p className="font-serif-editorial italic text-sm text-slate-700 leading-relaxed max-w-sm mb-4">
              An independent boutique bookseller dedicated to the tactile beauty of archival paper stocks,
              cloth-bound volumes, and courageous contemporary prose.
            </p>
            <p className="text-xs text-slate-600">
              Orders dispatched from our broadsheet archive in archival unbleached kraft paper with botanical wax seals.
            </p>
          </div>

          {/* Catalog Shelves */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#0F172A] mb-4">
              Curated Shelves
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => {
                    onFilterCategory('Fiction & Prose');
                    onNavigate('catalog');
                  }}
                  className="hover:text-[#C2410C] transition-colors cursor-pointer"
                >
                  Fiction & Translated Prose
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onFilterCategory('Art & Architecture');
                    onNavigate('catalog');
                  }}
                  className="hover:text-[#C2410C] transition-colors cursor-pointer"
                >
                  Art, Design & Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onFilterCategory('Botany & Nature');
                    onNavigate('catalog');
                  }}
                  className="hover:text-[#C2410C] transition-colors cursor-pointer"
                >
                  Botany, Herbaria & Nature
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onFilterCategory('Philosophy');
                    onNavigate('catalog');
                  }}
                  className="hover:text-[#C2410C] transition-colors cursor-pointer"
                >
                  Philosophy & Solitude
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onFilterCategory('Collector\'s Press');
                    onNavigate('catalog');
                  }}
                  className="hover:text-[#C2410C] transition-colors cursor-pointer"
                >
                  Collector&apos;s Letterpress Press
                </button>
              </li>
            </ul>
          </div>

          {/* Bookbinder & Salon Information */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#0F172A] mb-4">
              The Bookbinder&apos;s Promise
            </h4>
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong className="text-[#0F172A]">Complimentary Courier Shipping:</strong> Automatically applied to all orders exceeding $40.00.
              </p>
              <p>
                <strong className="text-[#0F172A]">Archival Binding Guarantee:</strong> Every volume is verified for Smyth-sewn durability and acid-free archival longevity.
              </p>
              <p>
                <strong className="text-[#0F172A]">Reading Room:</strong> Inscribe private marginalia and follow your chapter journey without algorithmic tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-10 mt-10 border-t border-[#E2DCD5] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>© 2026 MonaReads Bookseller. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Smyth-Sewn Publishing</span>
            <span>·</span>
            <span>Uncoated Rag Paper</span>
            <span>·</span>
            <span>Independent Literary Press</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
