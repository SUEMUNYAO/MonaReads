import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  ArrowRight,
  Filter,
  SlidersHorizontal,
  X,
  Sparkles,
  ShoppingBag,
  Star,
  Check
} from 'lucide-react';
import { BOOKS_DATA } from './data/books';
import { Book, BookFormatType, CartItem, OrderReceipt } from './types';
import { Header } from './components/Header';
import { BookCard } from './components/BookCard';
import { BookDetail } from './components/BookDetail';
import { ExcerptReaderModal } from './components/ExcerptReaderModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LibraryView } from './components/LibraryView';
import { DispatchesView } from './components/DispatchesView';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & View state
  const [activeView, setActiveView] = useState<'catalog' | 'detail' | 'library' | 'dispatches'>('catalog');
  const [selectedBook, setSelectedBook] = useState<Book>(BOOKS_DATA[0]);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [excerptBook, setExcerptBook] = useState<Book | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Cart & Orders State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-1',
      bookId: 'solitude',
      title: 'The Architecture of Solitude',
      author: 'Elias van der Pol',
      coverImage: '/src/assets/images/book_cover_solitude_1793171382581.jpg',
      format: 'Hardcover',
      price: 28.00,
      quantity: 1,
    },
  ]);
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [orderHistory, setOrderHistory] = useState<OrderReceipt[]>([]);
  const [savedBookIds, setSavedBookIds] = useState<string[]>(['solitude', 'botanical']);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price-asc' | 'price-desc'>('featured');

  // Hero Featured Book Format Selector State
  const heroBook = BOOKS_DATA.find((b) => b.id === 'solitude') || BOOKS_DATA[0];
  const [heroFormat, setHeroFormat] = useState<BookFormatType>('Hardcover');
  const [heroAdded, setHeroAdded] = useState(false);

  // Quick toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Add to Bag handler
  const handleAddToCart = (book: Book, format: BookFormatType, quantity = 1) => {
    const formatOption = book.formats.find((f) => f.type === format) || book.formats[0];
    const existingIndex = cartItems.findIndex(
      (item) => item.bookId === book.id && item.format === format
    );

    if (existingIndex > -1) {
      setCartItems((prev) => {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      });
    } else {
      const newItem: CartItem = {
        id: `${book.id}-${format}-${Date.now()}`,
        bookId: book.id,
        title: book.title,
        author: book.author,
        coverImage: book.coverImage,
        format,
        price: formatOption.price,
        quantity,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
    showToast(`Added “${book.title}” (${format}) to your bag`);
  };

  const handleHeroAdd = () => {
    handleAddToCart(heroBook, heroFormat, 1);
    setHeroAdded(true);
    setTimeout(() => setHeroAdded(false), 1600);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleSave = (bookId: string) => {
    setSavedBookIds((prev) => {
      const exists = prev.includes(bookId);
      if (exists) {
        showToast('Removed from Reading Room');
        return prev.filter((id) => id !== bookId);
      } else {
        showToast('Saved to Reading Room');
        return [...prev, bookId];
      }
    });
  };

  const handleOrderCompleted = (receipt: OrderReceipt) => {
    setOrderHistory((prev) => [receipt, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered & Sorted books
  const filteredBooks = BOOKS_DATA.filter((b) => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.formats[0].price - b.formats[0].price;
    if (sortBy === 'price-desc') return b.formats[0].price - a.formats[0].price;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const categories = [
    'All',
    'Fiction & Prose',
    'Art & Architecture',
    'Botany & Nature',
    'Philosophy',
    'Collector\'s Press',
  ];

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#0F172A] font-sans-editorial selection:bg-[#fdba74] selection:text-[#0F172A]">
      {/* Editorial Announcement Banner */}
      {!bannerDismissed && (
        <div className="bg-[#0F172A] text-[#FAF8F5] px-4 py-2 text-xs flex items-center justify-between text-center transition-all">
          <div className="max-w-[1360px] mx-auto flex-1 flex items-center justify-center gap-2">
            <span className="font-semibold text-[#FFB59D]">The Autumn Salon:</span>
            <span>Complimentary Courier Shipping on orders over $40 · Hand-wrapped in archival deckle paper</span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Bar (Conforms strictly to 3-Zone contract) */}
      <Header
        activeView={activeView}
        onNavigate={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        savedCount={savedBookIds.length}
      />

      {/* View: Catalog / Storefront */}
      {activeView === 'catalog' && (
        <main className="flex-1">
          {/* Broadsheet Hero Showcase */}
          <section className="border-b border-[#E2DCD5] bg-[#FAF8F5] py-12 lg:py-16">
            <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Hero Editorial Copy */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#C2410C] mb-3">
                    <span>Curator&apos;s Autumn Selection</span>
                    <span>·</span>
                    <span>No. 01</span>
                  </div>

                  <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0F172A] leading-[1.12] mb-4 text-balance">
                    {heroBook.title}
                  </h1>

                  <p className="font-serif-editorial text-xl italic text-slate-700 mb-4">
                    By {heroBook.author}
                  </p>

                  <p className="font-sans-editorial text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-6">
                    {heroBook.synopsis}
                  </p>

                  {/* Format switcher on hero */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 mr-2">
                      Edition:
                    </span>
                    {heroBook.formats.map((fmt) => (
                      <button
                        key={fmt.type}
                        type="button"
                        onClick={() => setHeroFormat(fmt.type)}
                        className={`text-xs px-3 py-1.5 rounded-[0.25rem] transition-all cursor-pointer ${
                          heroFormat === fmt.type
                            ? 'bg-[#0F172A] text-white font-semibold'
                            : 'bg-white text-slate-700 border border-[#E2DCD5] hover:border-slate-400'
                        }`}
                      >
                        {fmt.type} · ${fmt.price.toFixed(2)}
                      </button>
                    ))}
                  </div>

                  {/* Hero CTAs */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={handleHeroAdd}
                      className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider rounded-[0.25rem] transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                        heroAdded
                          ? 'bg-[#3F6212] text-white'
                          : 'bg-[#C2410C] hover:bg-[#9A3412] active:translate-y-px text-white'
                      }`}
                    >
                      {heroAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Bag (${(heroBook.formats.find(f => f.type === heroFormat)?.price || 28).toFixed(2)})</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setExcerptBook(heroBook)}
                      className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#0F172A] bg-white hover:bg-[#F5F1EA] border border-[#0F172A] rounded-[0.25rem] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#C2410C]" />
                      <span>Look Inside Volume</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectBook(heroBook)}
                      className="text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-[#0F172A] flex items-center gap-1.5 transition-colors cursor-pointer ml-1"
                    >
                      <span>Full Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C2410C]" />
                    </button>
                  </div>
                </div>

                {/* Hero Book Cover Showcase */}
                <div className="lg:col-span-5 flex justify-center">
                  <div
                    onClick={() => handleSelectBook(heroBook)}
                    className="group relative cursor-pointer"
                  >
                    <div className="w-64 sm:w-80 aspect-[3/4] transition-transform duration-300 group-hover:scale-[1.02]">
                      <img
                        src={heroBook.coverImage}
                        alt="The Architecture of Solitude by Elias van der Pol"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-[0.125rem] book-spine-shadow-lg"
                      />
                    </div>
                    <div className="absolute -bottom-4 right-0 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 border border-[#E2DCD5] rounded-[0.25rem] text-[11px] font-bold text-[#0F172A] shadow-xs flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-[#3F6212] text-[#3F6212]" />
                      <span>4.9 / 5.0 · 42 Reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Catalog Filter & Search Section */}
          <section className="max-w-[1360px] mx-auto px-6 lg:px-12 py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2DCD5]">
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-[0.25rem] transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#0F172A] text-white shadow-xs'
                        : 'bg-[#F5F1EA] text-slate-700 hover:bg-[#E2DCD5]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search & Sort Controls */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search titles, authors..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#CBD5E1] rounded-[0.25rem] text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#0F172A]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 text-xs bg-white border border-[#CBD5E1] rounded-[0.25rem] text-slate-700 focus:outline-none focus:border-[#0F172A] cursor-pointer"
                >
                  <option value="featured">Curator&apos;s Order</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Books Display Grid (conforming strictly to design system card specifications) */}
            <div className="mt-8">
              {filteredBooks.length === 0 ? (
                <div className="py-20 text-center bg-white border border-[#E2DCD5] rounded-[0.25rem]">
                  <p className="font-serif-editorial text-xl text-slate-600 mb-2">
                    No volumes matched your search
                  </p>
                  <p className="text-xs text-slate-500 mb-4">
                    Try broadening your search term or exploring our complete catalog shelves.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#0F172A] rounded-[0.25rem] cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onSelectBook={handleSelectBook}
                      onAddToCart={handleAddToCart}
                      onLookInside={(b) => setExcerptBook(b)}
                      isSaved={savedBookIds.includes(book.id)}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Curated Editorial Spotlight Section */}
          <section className="bg-[#F5F1EA] border-y border-[#E2DCD5] py-16 mt-12">
            <div className="max-w-[1360px] mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-4 flex justify-center">
                  <div className="w-56 sm:w-64 aspect-[3/4]">
                    <img
                      src="/src/assets/images/book_cover_botanical_1793171383259.jpg"
                      alt="Flora of the Quiet Earth"
                      className="w-full h-full object-cover rounded-[0.125rem] book-spine-shadow-lg"
                    />
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#3F6212] block mb-2">
                    Collector&apos;s Press Spotlight
                  </span>
                  <h2 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#0F172A] mb-3">
                    Flora of the Quiet Earth (Gold Foil Clothbound)
                  </h2>
                  <p className="font-serif-editorial text-base italic text-slate-700 leading-relaxed mb-4">
                    &ldquo;Opening this volume feels like stepping into an 18th-century herbarium at midnight.
                    The tactile debossing, gilded top edge, and copperplate engravings make it an heirloom object.&rdquo;
                  </p>
                  <p className="text-xs text-slate-600 max-w-xl mb-6">
                    Hand-bound with Swedish buckram bookcloth and gold foil stamped on historic cylinder presses.
                    Includes fold-out celestial botanical chart.
                  </p>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        const botanical = BOOKS_DATA.find((b) => b.id === 'botanical');
                        if (botanical) handleAddToCart(botanical, 'Hardcover');
                      }}
                      className="px-5 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-semibold uppercase tracking-wider rounded-[0.25rem] transition-colors cursor-pointer"
                    >
                      Secure Collector Edition ($45.00)
                    </button>
                    <button
                      onClick={() => {
                        const botanical = BOOKS_DATA.find((b) => b.id === 'botanical');
                        if (botanical) handleSelectBook(botanical);
                      }}
                      className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] hover:text-[#C2410C] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Monograph</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* View: Book Detail PDP */}
      {activeView === 'detail' && (
        <BookDetail
          book={selectedBook}
          onBack={() => setActiveView('catalog')}
          onAddToCart={handleAddToCart}
          onLookInside={(b) => setExcerptBook(b)}
          isSaved={savedBookIds.includes(selectedBook.id)}
          onToggleSave={handleToggleSave}
        />
      )}

      {/* View: Personal Reading Room */}
      {activeView === 'library' && (
        <LibraryView
          savedBookIds={savedBookIds}
          allBooks={BOOKS_DATA}
          orderHistory={orderHistory}
          onSelectBook={handleSelectBook}
          onRemoveSaved={handleToggleSave}
          onNavigateCatalog={() => setActiveView('catalog')}
          onLookInside={(b) => setExcerptBook(b)}
        />
      )}

      {/* View: Staff Dispatches */}
      {activeView === 'dispatches' && (
        <DispatchesView
          books={BOOKS_DATA}
          onSelectBook={handleSelectBook}
          onLookInside={(b) => setExcerptBook(b)}
        />
      )}

      {/* Footer */}
      <Footer
        onNavigate={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onFilterCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveView('catalog');
        }}
      />

      {/* Look Inside Modal */}
      {excerptBook && (
        <ExcerptReaderModal
          book={excerptBook}
          onClose={() => setExcerptBook(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        giftWrapping={giftWrapping}
        onToggleGiftWrapping={() => setGiftWrapping(!giftWrapping)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        giftWrapping={giftWrapping}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Minimal Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-2.5 rounded-[0.25rem] text-xs font-semibold shadow-lg flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-[#C2410C]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
