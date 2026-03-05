import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, OrderItem, OrderStatus } from '../types';
import { mockMenu } from '../data/mockMenu';
import { getTableFromURL } from '../utils/urlUtils';

interface MenuContextProps {
    menuItems: Product[];
    addMenuItem: (item: Product) => void;
    updateMenuItem: (id: string, updatedItem: Partial<Product>) => void;
    deleteMenuItem: (id: string) => void;
    toggleAvailability: (id: string) => void;
    getMenuItemsByCategory: (category: string) => Product[];
    categories: string[];
    // Order management
    cart: OrderItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    updateQuantity: (productId: string, quantity: number) => void;
    cartTotal: number;
    table: string;
    generateWhatsAppLink: () => string;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
};

interface MenuProviderProps {
    children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
    const [menuItems, setMenuItems] = useState<Product[]>(() => {
        const savedMenu = localStorage.getItem('menuItems');
        return savedMenu ? JSON.parse(savedMenu) : mockMenu;
    });

    const [cart, setCart] = useState<OrderItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [table] = useState<string>(getTableFromURL());

    useEffect(() => {
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }, [menuItems]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addMenuItem = (item: Product) => {
        setMenuItems((prev) => [...prev, item]);
    };

    const updateMenuItem = (id: string, updatedItem: Partial<Product>) => {
        setMenuItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
        );
    };

    const deleteMenuItem = (id: string) => {
        setMenuItems((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleAvailability = (id: string) => {
        setMenuItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
            )
        );
    };

    const getMenuItemsByCategory = (category: string) => {
        return menuItems.filter((item) => item.category === category);
    };

    const categories = Array.from(new Set(menuItems.map((item) => item.category)));

    // Cart Logic
    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter(item => item.id !== productId));
    };

    const clearCart = () => setCart([]);

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prev) =>
            prev.map(item => item.id === productId ? { ...item, quantity } : item)
        );
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const generateWhatsAppLink = () => {
        const phoneNumber = "5491112223334"; // Fake phone number for testing
        let message = `*Nuevo Pedido - Mesa: ${table}*\n\n`;
        cart.forEach(item => {
            message += `• ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
        });
        message += `\n*TOTAL: $${cartTotal.toFixed(2)}*`;

        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    };

    return (
        <MenuContext.Provider
            value={{
                menuItems,
                addMenuItem,
                updateMenuItem,
                deleteMenuItem,
                toggleAvailability,
                getMenuItemsByCategory,
                categories,
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity,
                cartTotal,
                table,
                generateWhatsAppLink
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};
