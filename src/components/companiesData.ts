import type { Product } from './productsData';

export type Company = {
  id: number;
  name: string;
  description: string;
  industry: string;
  location: string;
  logoUrl: string;
  revenue: string;
  purchases: Array<{
    productName: string;
    monthlyQuantity: number; // in kg
    productId?: number;
  }>;
};

export const initialCompanies: Company[] = [
  {
    id: 1,
    name: 'Dairy Fresh Pvt. Ltd.',
    description: 'Leading supplier of fresh dairy products across India.',
    industry: 'Dairy',
    location: 'Mumbai, India',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    revenue: '₹50 Cr',
    purchases: [
      { productName: 'Nutricana Milking Special', monthlyQuantity: 500, productId: 1 },
      { productName: 'Nutricana Milking Plus', monthlyQuantity: 300, productId: 2 },
    ],
  },
  {
    id: 2,
    name: 'Green Pastures Co.',
    description: 'Organic cattle feed and livestock solutions.',
    industry: 'Agriculture',
    location: 'Pune, India',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    revenue: '₹20 Cr',
    purchases: [
      { productName: 'Nutricana Milking Super', monthlyQuantity: 200, productId: 3 },
    ],
  },
  {
    id: 3,
    name: 'ABC livestock Co.',
    description: 'Premium cattle feed manufacturer and distributor.',
    industry: 'Feed Manufacturing',
    location: 'Mohali, India',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    revenue: '₹35 Cr',
    purchases: [
      { productName: 'Nutricana Milking Gold', monthlyQuantity: 400, productId: 4 },
      { productName: 'Nutricana Milking Power', monthlyQuantity: 250, productId: 5 },
    ],
  },
  {
    id: 4,
    name: 'Milk Masters',
    description: 'High-quality milk and dairy product exporter.',
    industry: 'Dairy Export',
    location: 'Delhi, India',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    revenue: '₹40 Cr',
    purchases: [
      { productName: 'Nutricana Milking Plus', monthlyQuantity: 150, productId: 2 },
    ],
  },
]; 