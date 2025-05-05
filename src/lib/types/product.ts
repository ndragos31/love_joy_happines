export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  featured?: boolean;
  new?: boolean;
  bestSeller?: boolean;
  details?: string;
  sizes?: string[];
  colors?: string[];
}
