import React, { useState } from 'react';
import { BookOpen, Bookmark, Trash2, ArrowRight, Check, FileText } from 'lucide-react';
import { Book, OrderReceipt } from '../types';

interface ReadingProgress {
  bookId: string;
  currentPage: number;
  notes: string;
}

interface LibraryViewProps {
  savedBookIds: string[];
  allBooks: Book[];
  orderHistory: OrderReceipt[];
  onSelectBook: (book: Book) => void;
  onRemoveSaved: (bookId: string) => void;
  onNavigateCatalog: () => void;
  onLookInside: (book: Book) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  savedBookIds,
  allBooks,
  orderHistory,
  onSelectBook,
  onRemoveSaved,
  onNavigateCatalog,
  onLookInside,
}) => {
  const [activeTab, setActiveTab] = useState<'reading' | 'saved' | 'orders'>('reading');
  const [progressState, setProgressState] = useState<Record<string, ReadingProgress>>({
    solitude: {
      bookId: 'solitude',
      currentPage: 94,
      notes: 'Page 94: "Everything we construct is an apology to the daylight..." Remarkable dialogue on the mechanics of time.',
    },
  });

  const savedBooks = allBooks.filter((b) => savedBookIds.includes(b.id));

  // Determine currently reading books (either from progressState or first book)
  const readingBooks = allBooks.filter(
    (b) => progressState[b.id] !== undefined || b.id === 'solitude'
  );

  const handleUpdatePage = (bookId: string, page: number) => {
    setProgressState((prev) => ({
      ...prev,
      [bookId]: {
        bookId,
        currentPage: page,
        notes: prev[bookId]?.notes || '',
      },
    }));
  };

  const handleUpdateNotes = (bookId: string, notes: string) => {
    setProgressState((prev) => ({
      ...prev,
      [bookId]: {
        bookId,
        currentPage: prev[bookId]?.currentPage || 1,
        notes,
      },
    }));
  };

  return (
    <div className="max-w-[1360px] mx-auto px-6 lg:px-12 py-10 animate-fadeIn">
      {/* Header Banner */}
      <div className="border-b border-[#E2DCD5] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C2410C]">
            Personal Literary Salon
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#0F172A] mt-1">
            The Reading Room
          </h1>
          <p className="font-serif-editorial italic text-sm text-slate-600 mt-1">
            Your personal archive of current volumes, marginalia, and bookbinder orders.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1 bg-[#F5F1EA] rounded-[0.25rem] border border-[#E2DCD5]">
          <button
            onClick={() => setActiveTab('reading')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-[0.25rem] transition-all cursor-pointer ${
              activeTab === 'reading'
                ? 'bg-white text-[#0F172A] shadow-xs'
                : 'text-slate-600 hover:text-black'
            }`}
          >
            Currently Reading
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-[0.25rem] transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-white text-[#0F172A] shadow-xs'
                : 'text-slate-600 hover:text-black'
            }`}
          >
            <span>Saved Wishlist</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#FAF8F5] border border-[#E2DCD5] rounded-full">
              {savedBooks.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-[0.25rem] transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-white text-[#0F172A] shadow-xs'
                : 'text-slate-600 hover:text-black'
            }`}
          >
            <span>Order History</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#FAF8F5] border border-[#E2DCD5] rounded-full">
              {orderHistory.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab: Currently Reading & Marginalia */}
      {activeTab === 'reading' && (
        <div className="space-y-8">
          {readingBooks.map((book) => {
            const prog = progressState[book.id] || { currentPage: 42, notes: '' };
            const total = book.specs.pages;
            const pct = Math.round((prog.currentPage / total) * 100);

            return (
              <div
                key={book.id}
                className="bg-white border border-[#E2DCD5] rounded-[0.25rem] p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-xs"
              >
                {/* Book Cover */}
                <div className="lg:col-span-3 flex justify-center">
                  <div className="w-36 sm:w-44 aspect-[3/4] relative">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover rounded-[0.125rem] book-spine-shadow"
                    />
                  </div>
                </div>

                {/* Progress Details */}
                <div className="lg:col-span-9 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2410C]">
                          In Progress · {pct}% Completed
                        </span>
                        <h3 className="font-serif-editorial text-2xl font-semibold text-[#0F172A]">
                          {book.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-sans-editorial">
                          By {book.author} · {book.specs.binding}
                        </p>
                      </div>

                      <button
                        onClick={() => onLookInside(book)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#0F172A] bg-[#FAF8F5] border border-[#E2DCD5] hover:bg-[#F5F1EA] rounded-[0.25rem] transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#C2410C]" />
                        <span>Open Reader</span>
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="my-4">
                      <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-sans-editorial">
                        <span>Page {prog.currentPage} of {total}</span>
                        <span className="font-mono">{total - prog.currentPage} pages remaining</span>
                      </div>
                      <div className="w-full h-2 bg-[#F5F1EA] rounded-full overflow-hidden border border-[#E2DCD5]">
                        <div
                          className="h-full bg-[#3F6212] transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Page Stepper Control */}
                    <div className="flex items-center gap-3 my-4">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Update Page:
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={total}
                        value={prog.currentPage}
                        onChange={(e) =>
                          handleUpdatePage(
                            book.id,
                            Math.min(total, Math.max(1, parseInt(e.target.value) || 1))
                          )
                        }
                        className="w-20 px-2 py-1 text-xs font-mono bg-[#FAF8F5] border border-[#CBD5E1] rounded-[0.25rem] text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                      />
                      <button
                        onClick={() => handleUpdatePage(book.id, Math.min(total, prog.currentPage + 10))}
                        className="px-2 py-1 text-xs bg-[#FAF8F5] hover:bg-[#F5F1EA] border border-[#E2DCD5] rounded-[0.25rem] text-slate-600 cursor-pointer"
                      >
                        +10 Pages
                      </button>
                    </div>

                    {/* Marginalia & Private Notes */}
                    <div className="mt-4 pt-4 border-t border-[#E2DCD5]">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Marginalia & Reader&apos;s Reflections
                      </label>
                      <textarea
                        rows={3}
                        value={prog.notes}
                        onChange={(e) => handleUpdateNotes(book.id, e.target.value)}
                        placeholder="Inscribe a memorable sentence, character impression, or philosophical thought..."
                        className="w-full p-3 text-xs font-serif-editorial leading-relaxed bg-[#FAF8F5] border border-[#CBD5E1] rounded-[0.25rem] text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: Saved Wishlist */}
      {activeTab === 'saved' && (
        <div>
          {savedBooks.length === 0 ? (
            <div className="py-16 text-center bg-white border border-[#E2DCD5] rounded-[0.25rem]">
              <span className="font-serif-editorial text-4xl text-slate-300 block mb-2">❦</span>
              <p className="font-serif-editorial text-lg text-[#0F172A] mb-1">
                Your Saved Shelf is Empty
              </p>
              <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                Bookmark volumes from our catalog to follow author releases or review bindings later.
              </p>
              <button
                onClick={onNavigateCatalog}
                className="px-4 py-2 bg-[#0F172A] text-white text-xs font-semibold uppercase tracking-wider rounded-[0.25rem] cursor-pointer"
              >
                Explore Curated Shelves
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white border border-[#E2DCD5] rounded-[0.25rem] p-5 flex flex-col justify-between hover:border-slate-400 transition-colors"
                >
                  <div className="flex gap-4 mb-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded-[0.125rem] book-spine-shadow shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C2410C]">
                        {book.category}
                      </span>
                      <h4 className="font-serif-editorial text-base font-semibold text-[#0F172A] line-clamp-2">
                        {book.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">By {book.author}</p>
                      <p className="font-sans-editorial text-sm font-bold text-[#0F172A] mt-2 tabular-nums">
                        From ${book.formats[0].price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E2DCD5]">
                    <button
                      onClick={() => onRemoveSaved(book.id)}
                      className="text-slate-400 hover:text-[#ba1a1a] text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>

                    <button
                      onClick={() => onSelectBook(book)}
                      className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F5F1EA] text-[#0F172A] border border-[#E2DCD5] rounded-[0.25rem] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Volume</span>
                      <ArrowRight className="w-3 h-3 text-[#C2410C]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Order History */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orderHistory.length === 0 ? (
            <div className="py-16 text-center bg-white border border-[#E2DCD5] rounded-[0.25rem]">
              <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="font-serif-editorial text-lg text-[#0F172A] mb-1">
                No Prior Orders Found
              </p>
              <p className="text-xs text-slate-500 mb-4">
                Completed purchases and tracking ledgers will be permanently recorded here.
              </p>
              <button
                onClick={onNavigateCatalog}
                className="px-4 py-2 bg-[#0F172A] text-white text-xs font-semibold uppercase tracking-wider rounded-[0.25rem] cursor-pointer"
              >
                Browse Books
              </button>
            </div>
          ) : (
            orderHistory.map((order) => (
              <div
                key={order.orderId}
                className="bg-white border border-[#E2DCD5] rounded-[0.25rem] p-6 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2DCD5] pb-4 mb-4 gap-2">
                  <div>
                    <span className="font-mono text-sm font-bold text-[#0F172A]">
                      {order.orderId}
                    </span>
                    <span className="text-slate-300 mx-2">·</span>
                    <span className="text-xs text-slate-500">{order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-[#F7FEE7] text-[#3F6212] border border-[#3F6212]/30 rounded-[0.125rem]">
                      Fulfillment Complete · In Transit
                    </span>
                    <span className="font-sans-editorial text-base font-bold text-[#0F172A] tabular-nums">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.coverImage}
                          alt=""
                          className="w-8 h-11 object-cover rounded-[0.125rem] border border-[#E2DCD5]"
                        />
                        <div>
                          <p className="font-bold text-[#0F172A]">{item.title}</p>
                          <p className="text-slate-500">{item.format} · Qty {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-[#0F172A] tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {order.giftWrapping && (
                  <div className="mt-4 pt-3 border-t border-[#E2DCD5] text-xs text-slate-600 flex items-center justify-between">
                    <span>Archival Kraft Gift Wrap with Botanical Wax Seal</span>
                    <span className="font-semibold text-[#0F172A]">$4.50</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
