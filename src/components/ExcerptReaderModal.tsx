import React, { useState } from 'react';
import { X, Type, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { Book, BookFormatType } from '../types';

interface ExcerptReaderModalProps {
  book: Book;
  onClose: () => void;
  onAddToCart: (book: Book, format: BookFormatType) => void;
}

export const ExcerptReaderModal: React.FC<ExcerptReaderModalProps> = ({
  book,
  onClose,
  onAddToCart,
}) => {
  const [paperTheme, setPaperTheme] = useState<'paper' | 'cream' | 'midnight'>('paper');
  const [fontSize, setFontSize] = useState<number>(18);
  const [added, setAdded] = useState(false);

  const themeStyles = {
    paper: 'bg-[#FAF8F5] text-[#0F172A] border-[#E2DCD5]',
    cream: 'bg-[#F4ECE1] text-[#292524] border-[#D6C7B2]',
    midnight: 'bg-[#0F172A] text-[#FAF8F5] border-slate-800',
  };

  const handleAdd = () => {
    onAddToCart(book, book.formats[0].type);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0F172A]/70 backdrop-blur-xs animate-fadeIn"
    >
      <div
        className={`w-full max-w-3xl h-[88vh] flex flex-col rounded-[0.375rem] border shadow-2xl overflow-hidden transition-colors duration-200 ${themeStyles[paperTheme]}`}
      >
        {/* Top Reading Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-inherit shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C2410C]">
              Sample Chapter Preview
            </span>
            <h2 id="reader-title" className="font-serif-editorial text-lg font-semibold truncate max-w-md">
              {book.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Paper Theme Selectors */}
            <div className="flex items-center gap-1.5 p-1 bg-black/5 rounded-full">
              <button
                type="button"
                onClick={() => setPaperTheme('paper')}
                className={`w-6 h-6 rounded-full border border-slate-300 bg-[#FAF8F5] transition-transform cursor-pointer ${
                  paperTheme === 'paper' ? 'scale-110 ring-2 ring-[#C2410C]' : 'opacity-70'
                }`}
                title="Archival Laid Paper"
              />
              <button
                type="button"
                onClick={() => setPaperTheme('cream')}
                className={`w-6 h-6 rounded-full border border-stone-400 bg-[#F4ECE1] transition-transform cursor-pointer ${
                  paperTheme === 'cream' ? 'scale-110 ring-2 ring-[#C2410C]' : 'opacity-70'
                }`}
                title="Warm Deckle Cream"
              />
              <button
                type="button"
                onClick={() => setPaperTheme('midnight')}
                className={`w-6 h-6 rounded-full border border-slate-600 bg-[#0F172A] transition-transform cursor-pointer ${
                  paperTheme === 'midnight' ? 'scale-110 ring-2 ring-[#C2410C]' : 'opacity-70'
                }`}
                title="Midnight Ink"
              />
            </div>

            {/* Font Size Adjusters */}
            <div className="flex items-center gap-1 border border-inherit rounded-[0.25rem] px-2 py-1 text-xs">
              <Type className="w-3.5 h-3.5 opacity-60" />
              <button
                type="button"
                onClick={() => setFontSize(Math.max(15, fontSize - 1))}
                className="hover:text-[#C2410C] px-1 cursor-pointer"
                title="Decrease font size"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-mono text-[11px] tabular-nums px-1">{fontSize}px</span>
              <button
                type="button"
                onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                className="hover:text-[#C2410C] px-1 cursor-pointer"
                title="Increase font size"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
              aria-label="Close excerpt reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Prose Content */}
        <div className="flex-1 overflow-y-auto px-8 sm:px-16 py-10 selection:bg-[#fdba74] selection:text-black">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10 pb-6 border-b border-inherit">
              <span className="text-xs uppercase tracking-[0.2em] font-sans-editorial opacity-60">
                {book.author}
              </span>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-semibold mt-2 mb-1">
                {book.excerpt.chapterTitle}
              </h3>
              <p className="font-serif-editorial italic text-xs opacity-60">
                MonaReads Archival Typesetting Edition
              </p>
            </div>

            <div
              className="font-serif-editorial leading-[1.85] space-y-6"
              style={{ fontSize: `${fontSize}px` }}
            >
              {book.excerpt.content.map((paragraph, index) => {
                if (index === 0) {
                  // Drop cap on first paragraph
                  const firstLetter = paragraph.charAt(0);
                  const rest = paragraph.slice(1);
                  return (
                    <p key={index} className="text-justify">
                      <span className="float-left text-5xl font-serif-editorial font-bold leading-none pr-3 pt-1 text-[#C2410C]">
                        {firstLetter}
                      </span>
                      {rest}
                    </p>
                  );
                }
                return (
                  <p key={index} className="text-justify">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            <div className="text-center mt-12 pt-8 border-t border-inherit">
              <span className="inline-block text-xs uppercase tracking-widest opacity-60 mb-3">
                End of Excerpt Sample
              </span>
              <p className="font-serif-editorial text-sm italic opacity-80 mb-6">
                Continue reading the complete volume by securing your copy below.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Quick Order Footer */}
        <div className="px-6 py-4 border-t border-inherit flex items-center justify-between shrink-0 bg-black/5">
          <div className="flex items-center gap-3">
            <img
              src={book.coverImage}
              alt=""
              className="w-9 h-12 object-cover rounded-[0.125rem] shadow-xs"
            />
            <div>
              <p className="text-xs font-bold leading-none">{book.title}</p>
              <p className="text-[11px] opacity-70 mt-1">
                {book.formats[0].type} · ${book.formats[0].price.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium border border-inherit rounded-[0.25rem] hover:bg-black/5 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleAdd}
              className={`px-4 py-1.5 text-xs font-semibold rounded-[0.25rem] transition-colors flex items-center gap-1.5 cursor-pointer ${
                added ? 'bg-[#3F6212] text-white' : 'bg-[#C2410C] hover:bg-[#9A3412] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
