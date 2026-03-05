import { MenuItem } from '../interfaces/MenuItem';

export const mockMenu: any[] = [
    // Entradas
    {
        id: '1',
        name: 'Bruschetta Clásica',
        description: 'Pan tostado frotado con ajo y cubierto con aceite de oliva, sal y tomates frescos.',
        price: 8.50,
        category: 'Entradas',
        imageUrl: 'https://images.unsplash.com/photo-1572695157363-bc31c5d5316e?q=80&w=1000&auto=format&fit=crop',
        isAvailable: true,
        tags: ['VEGETARIANO'],
    },
    {
        id: '2',
        name: 'Calamares Crujientes',
        description: 'Anillos de calamar fritos servidos con rodajas de limón y salsa tártara.',
        price: 11.00,
        category: 'Entradas',
        imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=1000&auto=format&fit=crop',
        isAvailable: true,
    },

    // Platos Principales
    {
        id: '3',
        name: 'Salmón a la Parrilla',
        description: 'Filete de salmón fresco a la parrilla servido con espárragos tiernos.',
        price: 22.00,
        category: 'Plato Principal',
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?q=80&w=1000&auto=format&fit=crop',
        isAvailable: true,
        tags: ['SALUDABLE', 'SIN GLUTEN'],
    },
    {
        id: '4',
        name: 'Ojo de Bife Premium',
        description: 'Bife de bife de 300g cocinado a su gusto, servido con papas rústicas.',
        price: 28.50,
        category: 'Plato Principal',
        imageUrl: 'https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=1000&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        id: '5',
        name: 'Pasta de Hongos y Trufa',
        description: 'Fettuccine cremoso con hongos silvestres y aceite de trufa blanca.',
        price: 18.00,
        category: 'Plato Principal',
        imageUrl: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1000&auto=format&fit=crop',
        isAvailable: true,
        tags: ['VEGETARIANO'],
    },
    {
        id: '6',
        name: 'Cheeseburger Clásica',
        description: 'Medallón de carne jugosa con queso cheddar, lechuga, tomate y salsa de la casa.',
        price: 14.50,
        category: 'Plato Principal',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
        isAvailable: false,
    },

    // Postres
    {
        id: '7',
        name: 'Tiramisú Artesanal',
        description: 'Clásico postre italiano con capas de bizcocho café y crema mascarpone.',
        price: 9.00,
        category: 'Postres',
        imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop',
        isAvailable: true,
    },
    {
        id: '8',
        name: 'Cheesecake New York',
        description: 'Cremoso pastel de queso con base de galleta y cobertura de frutos rojos.',
        price: 9.50,
        category: 'Postres',
        imageUrl: 'https://images.unsplash.com/photo-1524350303359-868ad581ff22?q=80&w=1000&auto=format&fit=crop',
        isAvailable: true,
    },

    // Bebidas
    {
        id: '9',
        name: 'Mojito Tradicional',
        description: 'Refrescante cóctel con ron blanco, azúcar, lima, soda y menta fresca.',
        price: 10.00,
        category: 'Bebidas',
        imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1000&auto=format&fit=crop',
        isAvailable: true,
        tags: ['CON ALCOHOL'],
    },
    {
        id: '10',
        name: 'Limonada Casera',
        description: 'Limones frescos exprimidos con un toque de jengibre y menta.',
        price: 5.00,
        category: 'Bebidas',
        imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop',
        isAvailable: true,
        tags: ['SIN ALCOHOL'],
    }
];
