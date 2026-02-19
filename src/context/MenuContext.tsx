import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem } from '../interfaces/MenuItem';
import { mockMenu } from '../data/mockMenu';

interface MenuContextProps {
    menuItems: MenuItem[];
    addMenuItem: (item: MenuItem) => void;
    updateMenuItem: (id: string, updatedItem: Partial<MenuItem>) => void;
    deleteMenuItem: (id: string) => void;
    toggleAvailability: (id: string) => void;
    getMenuItemsByCategory: (category: string) => MenuItem[];
    categories: string[];
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
    // Initialize state with localStorage or mock data
    const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
        const savedMenu = localStorage.getItem('menuItems');
        return savedMenu ? JSON.parse(savedMenu) : mockMenu;
    });

    // Save to localStorage whenever menuItems changes
    useEffect(() => {
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }, [menuItems]);

    const addMenuItem = (item: MenuItem) => {
        setMenuItems((prev) => [...prev, item]);
    };

    const updateMenuItem = (id: string, updatedItem: Partial<MenuItem>) => {
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

    // Derive unique categories from items
    const categories = Array.from(new Set(menuItems.map((item) => item.category)));

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
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};
