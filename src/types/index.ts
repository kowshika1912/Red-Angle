export interface Album {
  id: string;
  title: string;
  category: AlbumCategory;
  description?: string;
  coverImage?: string;
  isPublic: boolean;
  isClientGallery: boolean;
  clientName?: string;
  eventDate?: string;
  createdAt: string;
  images?: Image[];
  _count?: { images: number };
}

export type AlbumCategory =
  | 'WEDDING'
  | 'PRE_WEDDING'
  | 'CANDID'
  | 'MATERNITY'
  | 'KIDS'
  | 'FASHION'
  | 'CORPORATE'
  | 'COMMERCIAL';

export interface Image {
  id: string;
  albumId: string;
  url: string;
  caption?: string;
  order: number;
  fileType: string;
  createdAt: string;
}

export interface Package {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  image?: string;
  inclusions: string[];
  isActive: boolean;
  isPopular: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  author?: { name?: string; email: string };
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
  image?: string;
  isActive: boolean;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'ADMIN' | 'USER';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
