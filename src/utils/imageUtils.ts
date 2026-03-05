/**
 * Validates if a string is a valid URL.
 */
export const validateImageURL = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};

/**
 * Global image error handler to provide a fallback image.
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop
    target.src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop';
};
