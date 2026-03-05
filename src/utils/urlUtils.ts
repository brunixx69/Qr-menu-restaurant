/**
 * Extracts the 'mesa' parameter from the URL.
 * Defaults to 'Barra' if not found.
 */
/**
 * Validates if the mesa parameter is a non-empty string.
 * Type Guard for strict URL parameter checking.
 */
export const isValidMesa = (mesa: any): mesa is string => {
    return typeof mesa === 'string' && mesa.trim().length > 0;
};

/**
 * Global currency formatter for AR/Local format ($ 1.200,00)
 */
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    }).format(amount).replace('ARS', '$');
};

export const getTableFromURL = (): string => {
    const params = new URLSearchParams(window.location.search);
    const mesaParam = params.get('mesa');

    if (isValidMesa(mesaParam)) {
        return mesaParam;
    }

    return 'Barra';
};
