import React, { useState, useEffect } from 'react';
import { MenuItem } from '../interfaces/MenuItem';
import { Box, Button, TextField, MenuItem as MuiMenuItem, Alert, Typography } from '@mui/material';
import { useMenu } from '../context/MenuContext';

interface AdminFormProps {
    itemToEdit?: MenuItem | null;
    onClose?: () => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ itemToEdit, onClose }) => {
    const { addMenuItem, updateMenuItem, categories } = useMenu();
    // Initialize with a default 'Main Course' category if none avail, or just empty
    const [formData, setFormData] = useState<Partial<MenuItem>>({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        isAvailable: true,
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (itemToEdit) {
            setFormData(itemToEdit);
        } else {
            setFormData({
                name: '',
                description: '',
                price: 0,
                // Default to first category if available, else empty
                category: categories.length > 0 ? categories[0] : '',
                imageUrl: '',
                isAvailable: true,
            });
        }
    }, [itemToEdit, categories]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.name || formData.name.length < 3) {
            setError('Name must be at least 3 characters');
            return;
        }
        if (formData.price === undefined || formData.price <= 0) {
            setError('Price must be greater than 0');
            return;
        }
        if (!formData.category) {
            setError('Category is required');
            return;
        }

        if (itemToEdit && itemToEdit.id) {
            updateMenuItem(itemToEdit.id, formData);
        } else {
            addMenuItem({
                ...formData,
                id: Date.now().toString(), // Simple ID generation
                isAvailable: true,
            } as MenuItem);
        }

        // Reset form
        setFormData({ name: '', description: '', price: 0, category: categories[0] || '', imageUrl: '', isAvailable: true });
        setError('');
        if (onClose) onClose();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h6">{itemToEdit ? 'Edit Dish' : 'Add New Dish'}</Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
                label="Dish Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
            />

            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={2}
                fullWidth
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    label="Price ($)"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    fullWidth
                    inputProps={{ min: 0.01, step: 0.01 }}
                />

                <TextField
                    select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    fullWidth
                >
                    {categories.map((cat) => (
                        <MuiMenuItem key={cat} value={cat}>{cat}</MuiMenuItem>
                    ))}
                    <MuiMenuItem value="New">+ Add New Category (Simulated)</MuiMenuItem>
                </TextField>
            </Box>

            <TextField
                label="Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                fullWidth
                placeholder="https://example.com/image.jpg"
            />

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 1 }}>
                {onClose && <Button onClick={onClose} color="inherit">Cancel</Button>}
                <Button type="submit" variant="contained" color="primary">
                    {itemToEdit ? 'Update Dish' : 'Add Dish'}
                </Button>
            </Box>
        </Box>
    );
};

export default AdminForm;
