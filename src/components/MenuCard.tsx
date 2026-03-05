import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, IconButton, Tooltip } from '@mui/material';
import { AddShoppingCart as AddIcon } from '@mui/icons-material';
import { Product } from '../types';
import { useMenu } from '../context/MenuContext';
import { handleImageError } from '../utils/imageUtils';

interface MenuCardProps {
    item: Product;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
    const { addToCart } = useMenu();

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
        }}>
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    height="220"
                    image={item.imageUrl}
                    alt={item.name}
                    onError={handleImageError}
                    sx={{
                        filter: item.isAvailable ? 'none' : 'grayscale(100%) brightness(0.7)',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                            transform: item.isAvailable ? 'scale(1.1)' : 'none',
                        }
                    }}
                />

                {/* Availability Overlay */}
                {!item.isAvailable && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            bgcolor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1
                        }}
                    >
                        <Chip
                            label="NO DISPONIBLE"
                            color="error"
                            variant="filled"
                            sx={{ fontWeight: 'bold', borderRadius: 1 }}
                        />
                    </Box>
                )}

                {/* Price Badge */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        px: 2,
                        py: 0.5,
                        borderRadius: '20px',
                        fontWeight: 800,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                        zIndex: 2,
                        fontSize: '1rem',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    ${item.price.toFixed(2)}
                </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, pt: 3, px: 2, pb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', lineHeight: 1.2 }}>
                        {item.name}
                    </Typography>

                    {item.isAvailable && (
                        <Tooltip title="Añadir al carrito">
                            <IconButton
                                onClick={() => addToCart(item)}
                                color="primary"
                                sx={{
                                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                                    '&:hover': { bgcolor: 'primary.main', color: 'black' }
                                }}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                    {item.description}
                </Typography>

                <Box display="flex" gap={1} flexWrap="wrap">
                    {item.tags?.map(tag => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                                height: 18,
                                fontSize: '0.65rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                bgcolor: 'rgba(255,255,255,0.05)',
                                color: 'primary.main',
                                border: '1px solid currentColor'
                            }}
                        />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default MenuCard;
