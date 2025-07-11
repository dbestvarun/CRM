export type Product = {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  imageUrl: string;
  weight: string;
  protein: string;
  fat: string;
  fiber: string;
};

export const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Nutricana 1000',
    description: 'Premium cattle feed for high milk yield and improved animal health. Suitable for all milking cows and buffaloes.',
    type: 'Milking Range',
    price: 1250,
    imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2024/3/402636107/WB/JI/MO/10506063/whatsapp-image-2024-03-20-at-5-22-53-pm-1-500x500.jpeg',
    weight: '50kg',
    protein: '20%',
    fat: '4%',
    fiber: '12%',
  },
  {
    id: 2,
    name: 'Nutricana Milking Plus',
    description: 'Balanced feed for lactating cattle, formulated to boost milk production and maintain body condition.',
    type: 'Milking Range',
    price: 1200,
    imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2024/3/402636345/CM/WI/GH/10506063/whatsapp-image-2024-03-20-at-5-22-53-pm-500x500.jpeg',
    weight: '50kg',
    protein: '18%',
    fat: '3.5%',
    fiber: '13%',
  },
  {
    id: 3,
    name: 'Nutricana Milking Super',
    description: 'High-energy feed for high-yielding dairy animals. Supports sustained lactation and animal health.',
    type: 'Milking Range',
    price: 1300,
    imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2024/3/402637174/ZQ/TG/FX/10506063/whatsapp-image-2024-03-20-at-5-22-54-pm-500x500.jpeg',
    weight: '50kg',
    protein: '21%',
    fat: '4.5%',
    fiber: '11%',
  },
  {
    id: 4,
    name: 'Nutricana Milk Wonder Plus',
    description: 'Premium standard feed for dairy cattle, enriched with vitamins and minerals for optimal milk quality and growth.',
    type: 'Milking Range',
    price: 1350,
    imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2024/3/402594423/FU/GL/QS/10506063/nutricana-milk-wonder-plus-250x250.jpeg',
    weight: '50kg',
    protein: '22%',
    fat: '5%',
    fiber: '10%',
  },
  {
    id: 5,
    name: 'Nutricana Milking Magic',
    description: 'Magical Feed for peak lactation, designed for maximum productivity and animal vitality.',
    type: 'Milking Range',
    price: 1400,
    imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2024/3/402638496/QP/NJ/YL/10506063/whatsapp-image-2024-03-20-at-5-23-00-pm-250x250.jpeg',
    weight: '50kg',
    protein: '23%',
    fat: '5.5%',
    fiber: '9%',
  },
]; 