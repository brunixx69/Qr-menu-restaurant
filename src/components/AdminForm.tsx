import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Box, Button, TextField, MenuItem as MuiMenuItem, Alert, Typography, alpha } from '@mui/material';
import { useMenu } from '../context/MenuContext';

interface AdminFormProps {
    itemToEdit?: Product | null;
    onClose?: () => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ itemToEdit, onClose }) => {
    const { addMenuItem, updateMenuItem, categories } = useMenu();
    const [formData, setFormData] = useState<Partial<Product>>({
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

        if (!formData.name || formData.name.length < 3) {
            setError('El nombre debe tener al menos 3 caracteres');
            return;
        }
        if (formData.price === undefined || formData.price <= 0) {
            setError('El precio debe ser mayor a 0');
            return;
        }
        if (!formData.category) {
            setError('La categoría es obligatoria');
            return;
        }

        if (itemToEdit && itemToEdit.id) {
            updateMenuItem(itemToEdit.id, formData);
        } else {
            addMenuItem({
                ...formData,
                id: Date.now().toString(),
                isAvailable: true,
            } as Product);
        }

        setError('');
        if (onClose) onClose();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                p: 2,
            }}
        >
            <Typography variant="h5" fontWeight={800} color="primary">
                {itemToEdit ? 'EDITAR PLATO' : 'NUEVO PLATO'}
            </Typography>

            {error && <Alert severity="error" variant="filled">{error}</Alert>}

            <TextField
                label="Nombre del Plato"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
            />

            <TextField
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    label="Precio ($)"
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
                    label="Categoría"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    fullWidth
                >
                    {categories.map((cat) => (
                        <MuiMenuItem key={cat} value={cat}>{cat}</MuiMenuItem>
                    ))}
                </TextField>
            </Box>

            <TextField
                label="URL de Imagen"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                fullWidth
                placeholder="https://images.unsplash.com/..."
            />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                {onClose && (
                    <Button onClick={onClose} variant="outlined" color="secondary">
                        Cancelar
                    </Button>
                )}
                <Button type="submit" variant="contained" color="primary">
                    {itemToEdit ? 'Guardar Cambios' : 'Crear Plato'}
                </Button>
            </Box>
        </Box>
    );
};

export default AdminForm;
