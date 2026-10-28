import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Book } from '../types';

interface DispatchesViewProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  onLookInside: (book: Book) => void;
}

export const DispatchesView: React.FC<DispatchesViewProps> = ({
  books,
  onSelectBook,
  onLookInside,
}) => {
  return (
    <div className="max-w-[1360px] mx-auto px-6 lg:px-12 py-10 animate-fadeIn">
      {/* Editorial Journal Masthead */}
      <div className="text-center max-w-2xl mx-auto mb-14 pb-8 border-b border-[#E2DCD5]">
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#C2410C]">
          The MonaReads Gazette · Issue No. 48
        </span>
        <h1 className="font-serif-editorial text-4xl sm:text-5xl font-semibold text-[#0F172A] mt-2 mb-3">
          Staff Dispatches & Essays
        </h1>
        <p className="font-serif-editorial italic text-base text-slate-600">
          Reflections on binding craft, translated literature, and the quiet dignity of slow reading.
        </p>
      </div>

      {/* Lead Feature Story */}
      <div className="bg-[#FFFFFF] border border-[#E2DCD5] rounded-[0.25rem] p-8 lg:p-12 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-sans-editorial mb-3">
            <span className="text-[#C2410C] font-bold uppercase tracking-wider">Critical Monograph</span>
            <span>·</span>
            <span>By Clara van Dijk, Fiction Buyer</span>
            <span>·</span>
            <span>October 2026</span>
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#0F172A] leading-tight mb-4">
            The Architecture of Solitude: Why Rooms Shape Our Interior Worlds
          </h2>

          <p className="font-serif-editorial text-base text-slate-700 leading-relaxed mb-6">
            In an age of relentless connectivity, what does it mean to design a room for solitude?
            Elias van der Pol’s latest work confronts the geometry of grief through clockmakers’ workbenches
            and sea-facing draughting tables. Here, silence is not an emptiness, but a carefully engineered
            acoustic chamber where truth finally has space to settle.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const book = books.find((b) => b.id === 'solitude') || books[0];
                onSelectBook(book);
              }}
              className="px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider rounded-[0.25rem] flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>Examine the Hardcover Edition</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                const book = books.find((b) => b.id === 'solitude') || books[0];
                onLookInside(book);
              }}
              className="px-4 py-2.5 bg-transparent hover:bg-[#F5F1EA] text-[#0F172A] text-xs font-semibold uppercase tracking-wider rounded-[0.25rem] border border-[#E2DCD5] flex items-center gap-2 cursor-pointer transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C2410C]" />
              <span>Read Excerpt</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="w-64 sm:w-72 aspect-[3/4]">
            <img
              src="/src/assets/images/book_cover_solitude_1793171382581.jpg"
              alt="The Architecture of Solitude"
              className="w-full h-full object-cover rounded-[0.125rem] book-spine-shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Staff Recommendation Cards Grid */}
      <h3 className="font-serif-editorial text-2xl font-semibold text-[#0F172A] mb-6">
        Curator Recommendations
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => {
          if (!book.staffPickNote) return null;
          return (
            <div
              key={book.id}
              className="p-6 bg-[#F5F1EA] border border-[#E2DCD5] rounded-[0.25rem] flex flex-col justify-between relative hover-drift"
            >
              <div>
                <span className="font-serif-editorial text-5xl text-[#C2410C]/40 absolute top-3 left-4 select-none pointer-events-none">
                  “
                </span>
                <p className="font-serif-editorial text-sm italic text-[#0F172A] leading-relaxed relative z-10 pl-6 mb-6">
                  {book.staffPickNote.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2DCD5] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#0F172A]">{book.staffPickNote.curatorName}</p>
                  <p className="text-[11px] text-slate-500">{book.staffPickNote.curatorRole}</p>
                </div>

                <button
                  onClick={() => onSelectBook(book)}
                  className="px-3 py-1.5 bg-white hover:bg-[#FAF8F5] text-[#0F172A] border border-[#E2DCD5] text-xs font-semibold rounded-[0.25rem] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Read Book</span>
                  <ArrowRight className="w-3 h-3 text-[#C2410C]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
