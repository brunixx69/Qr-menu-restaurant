export enum Category {
    STARTERS = 'Starters',
    MAINS = 'Mains',
    DESSERTS = 'Desserts',
    DRINKS = 'Drinks',
    SPECIALS = 'Specials'
}

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    PREPARING = 'PREPARING',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category | string;
    imageUrl: string;
    isAvailable: boolean;
    tags?: string[];
    allergens?: string[];
}

export interface OrderItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    table: string;
    createdAt: Date;
}

export interface UserConfig {
    theme: 'light' | 'dark';
    language: 'es' | 'en';
}
