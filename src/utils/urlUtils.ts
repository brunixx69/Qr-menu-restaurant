/**
 * Extracts the 'mesa' parameter from the URL.
 * Defaults to 'Barra' if not found.
 */
export const getTableFromURL = (): string => {
    const params = new URLSearchParams(window.location.search);
    const table = params.get('mesa');
    return table || 'Barra';
};
