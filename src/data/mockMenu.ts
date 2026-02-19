import { MenuItem } from '../interfaces/MenuItem';

export const mockMenu: MenuItem[] = [
    // Starters
    {
        id: '1',
        name: 'Bruschetta Classico',
        description: 'Grilled bread rubbed with garlic and topped with olive oil and salt.',
        price: 8.50,
        category: 'Starters',
        imageUrl: 'https://images.unsplash.com/photo-1572695157363-bc31c5d5316e?auto=format&fit=crop&w=500&q=60',
        isAvailable: true,
        tags: ['vegetarian'],
        allergens: ['gluten']
    },
    {
        id: '2',
        name: 'Crispy Calamari',
        description: 'Fried squid rings served with lemon wedges and tartar sauce.',
        price: 11.00,
        category: 'Starters',
        imageUrl: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=500&q=60',
        isAvailable: true,
        allergens: ['seafood', 'gluten']
    },

    // Main Courses
    {
        id: '3',
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon fillet grilled to perfection, served with asparagus.',
        price: 22.00,
        category: 'Main Course',
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&w=500&q=60',
        isAvailable: true,
        tags: ['healthy', 'gluten-free'],
        allergens: ['fish']
    },
    {
        id: '4',
        name: 'Ribeye Steak',
        description: '10oz premium ribeye steak cooked to your liking.',
        price: 28.50,
        category: 'Main Course',
        imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=500&q=60',
        isAvailable: true,
        allergens: []
    },
    {
        id: '5',
        name: 'Truffle Mushroom Pasta',
        description: 'Creamy fettuccine with wild mushrooms and truffle oil.',
        price: 18.00,
        category: 'Main Course',
        imageUrl: 'https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=500&q=60',
        isAvailable: true,
        tags: ['vegetarian'],
        allergens: ['gluten', 'dairy']
    },
    {
        id: '6',
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with sharp cheddar, lettuce, tomato, and house sauce.',
        price: 14.50,
        category: 'Main Course',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60',
        isAvailable: false, // Out of stock example
        allergens: ['gluten', 'dairy']
    },

    // Desserts
    {
        id: '7',
        name: 'Tiramisu',
        description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone.',
        price: 9.00,
        category: 'Desserts',
        imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=60',
        isAvailable: true,
        allergens: ['dairy', 'gluten', 'eggs']
    },
    {
        id: '8',
        name: 'New York Cheesecake',
        description: 'Creamy cheesecake on a graham cracker crust with strawberry topping.',
        price: 9.50,
        category: 'Desserts',
        imageUrl: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=500&q=60',
        isAvailable: true,
        allergens: ['dairy', 'gluten']
    },

    // Drinks
    {
        id: '9',
        name: 'Classic Mojito',
        description: 'Refreshing cocktail with white rum, sugar, lime juice, soda water, and mint.',
        price: 10.00,
        category: 'Drinks',
        imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=500&q=60',
        isAvailable: true,
        tags: ['alcoholic'],
        allergens: []
    },
    {
        id: '10',
        name: 'Homemade Lemonade',
        description: 'Freshly squeezed lemons with a touch of mint.',
        price: 5.00,
        category: 'Drinks',
        imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=60',
        isAvailable: true,
        tags: ['non-alcoholic'],
        allergens: []
    }
];
