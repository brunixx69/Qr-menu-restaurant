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
    target.src = 'https://via.placeholder.com/600x400/1a1a1a/D4AF37?text=Gourmet+QR';
};
