import { useMemo } from 'react';
import { MenuItem } from '../interfaces/MenuItem';

export const useFilteredMenu = (
    items: MenuItem[],
    searchQuery: string,
    selectedCategory: string
) => {
    return useMemo(() => {
        let filtered = items;

        if (selectedCategory && selectedCategory !== 'All') {
            filtered = filtered.filter((item) => item.category === selectedCategory);
        }

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(lowerQuery) ||
                item.description.toLowerCase().includes(lowerQuery)
            );
        }

        const grouped = filtered.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {} as Record<string, MenuItem[]>);

        return { filteredItems: filtered, groupedItems: grouped };
    }, [items, searchQuery, selectedCategory]);
};
