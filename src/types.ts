export type BookFormatType = 'Hardcover' | 'Paperback' | 'E-Book' | 'Audiobook';

export interface BookFormatOption {
  type: BookFormatType;
  price: number;
  msrp?: number;
  description: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Pre-Order';
  details?: string; // e.g. "Clothbound with slipcase", "11 hrs 42 mins"
}

export interface Review {
  id: string;
  reviewer: string;
  source: string; // e.g. "The Paris Review", "Verified Reader", "London Review of Books"
  rating: number;
  date: string;
  comment: string;
  isStaff?: boolean;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  translator?: string;
  coverImage: string;
  category: 'Fiction & Prose' | 'Art & Architecture' | 'Botany & Nature' | 'Philosophy' | 'Collector\'s Press';
  badge?: {
    text: string;
    type: 'terracotta' | 'sage'; // terracotta for Bestseller/Staff Pick, sage for Award/First Edition
  };
  formats: BookFormatOption[];
  synopsis: string;
  staffPickNote?: {
    curatorName: string;
    curatorRole: string;
    quote: string;
  };
  excerpt: {
    chapterTitle: string;
    content: string[];
  };
  specs: {
    isbn13: string;
    pages: number;
    publisher: string;
    pubDate: string;
    dimensions: string;
    weight: string;
    binding: string;
    paperStock: string;
  };
  rating: number;
  reviewCount: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews: Review[];
  featured?: boolean;
}

export interface CartItem {
  id: string;
  bookId: string;
  title: string;
  author: string;
  coverImage: string;
  format: BookFormatType;
  price: number;
  quantity: number;
}

export interface OrderReceipt {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  giftWrapping: boolean;
  giftNote?: string;
  tax: number;
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface ShelfItem {
  bookId: string;
  status: 'Currently Reading' | 'Want to Read' | 'Completed';
  currentPage?: number;
  totalPages: number;
  notes?: string;
  dateAdded: string;
}
