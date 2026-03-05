import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, OrderItem } from '../types';
import { mockMenu } from '../data/mockMenu';
import { getTableFromURL, formatCurrency } from '../utils/urlUtils';

interface NotificationState {
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
}

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
    // Notifications
    notification: NotificationState;
    showNotification: (message: string, severity?: NotificationState['severity']) => void;
    hideNotification: () => void;
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
    const [notification, setNotification] = useState<NotificationState>({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }, [menuItems]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const showNotification = (message: string, severity: NotificationState['severity'] = 'success') => {
        setNotification({ open: true, message, severity });
    };

    const hideNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    const addMenuItem = (item: Product) => {
        setMenuItems((prev) => [...prev, item]);
        showNotification('Plato añadido correctamente');
    };

    const updateMenuItem = (id: string, updatedItem: Partial<Product>) => {
        setMenuItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
        );
        showNotification('Plato actualizado');
    };

    const deleteMenuItem = (id: string) => {
        setMenuItems((prev) => prev.filter((item) => item.id !== id));
        showNotification('Plato eliminado', 'warning');
    };

    const toggleAvailability = (id: string) => {
        setMenuItems((prev) => {
            const updated = prev.map((item) =>
                item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
            );
            const item = updated.find(i => i.id === id);
            if (item) {
                showNotification(`${item.name} está ahora ${item.isAvailable ? 'disponible' : 'agotado'}`, item.isAvailable ? 'success' : 'info');
            }
            return updated;
        });
    };

    const getMenuItemsByCategory = (category: string) => {
        return menuItems.filter((item) => item.category === category);
    };

    const categories = Array.from(new Set(menuItems.map((item) => item.category)));

    const addToCart = (product: Product) => {
        if (!product.isAvailable) {
            showNotification('Este producto no está disponible', 'error');
            return;
        }
        setCart((prev) => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        showNotification(`${product.name} añadido al carrito`);
    };

    const removeFromCart = (productId: string) => {
        const item = cart.find(i => i.id === productId);
        setCart((prev) => prev.filter(item => item.id !== productId));
        if (item) showNotification(`${item.name} eliminado`, 'info');
    };

    const clearCart = () => {
        setCart([]);
        showNotification('Carrito vaciado');
    };

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
        const phoneNumber = "5491112223334";
        let message = `*NUEVO PEDIDO - MESA: ${table.toUpperCase()}*\n\n`;
        cart.forEach(item => {
            message += `• ${item.quantity}x ${item.name} (${formatCurrency(item.price * item.quantity)})\n`;
        });
        message += `\n*TOTAL: ${formatCurrency(cartTotal)}*`;

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
                generateWhatsAppLink,
                notification,
                showNotification,
                hideNotification
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};
