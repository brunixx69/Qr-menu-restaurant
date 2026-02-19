export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
  tags?: string[]; // e.g., 'vegan', 'spicy', 'gluten-free'
  allergens?: string[];
}

export type MenuCategory = string;
