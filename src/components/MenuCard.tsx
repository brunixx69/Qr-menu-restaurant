import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, IconButton, Tooltip, alpha } from '@mui/material';
import { AddShoppingCart as AddIcon } from '@mui/icons-material';
import { Product } from '../types';
import { useMenu } from '../context/MenuContext';
import { handleImageError } from '../utils/imageUtils';
import { formatCurrency } from '../utils/urlUtils';

const goldColor = '#D4AF37';

interface MenuCardProps {
    item: Product;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
    const { addToCart } = useMenu();
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAdd = () => {
        if (!item.isAvailable) return;
        setIsAnimating(true);
        addToCart(item);
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            animation: isAnimating ? 'scaleUp 0.3s ease-out' : 'none',
        }}>
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    height="240"
                    image={item.imageUrl}
                    alt={item.name}
                    onError={handleImageError}
                    sx={{
                        filter: item.isAvailable ? 'none' : 'grayscale(100%) brightness(0.5)',
                        transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
                        '&:hover': {
                            transform: item.isAvailable ? 'scale(1.15)' : 'none',
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
                            bgcolor: 'rgba(0,0,0,0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1
                        }}
                    >
                        <Chip
                            label="AGOTADO"
                            color="error"
                            sx={{
                                fontWeight: 900,
                                borderRadius: 2,
                                px: 1,
                                bgcolor: 'secondary.main',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                            }}
                        />
                    </Box>
                )}

                {/* Price Badge */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        bgcolor: item.isAvailable ? 'primary.main' : 'text.disabled',
                        color: 'primary.contrastText',
                        px: 2.5,
                        py: 0.8,
                        borderRadius: '30px',
                        fontWeight: 900,
                        boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                        zIndex: 2,
                        fontSize: '1rem',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    {formatCurrency(item.price)}
                </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, pt: 4, px: 3, pb: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main', lineHeight: 1.2, flexGrow: 1, mr: 1 }}>
                        {item.name}
                    </Typography>

                    <Tooltip title={item.isAvailable ? "Añadir al carrito" : "Agotado"}>
                        <span>
                            <IconButton
                                onClick={handleAdd}
                                color="primary"
                                disabled={!item.isAvailable}
                                sx={{
                                    bgcolor: alpha(goldColor, 0.1),
                                    '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.05)', color: 'text.disabled' },
                                    '&:hover': { bgcolor: 'primary.main', color: 'black' }
                                }}
                            >
                                <AddIcon fontSize="medium" />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 44, fontSize: '0.9rem', opacity: 0.8 }}>
                    {item.description}
                </Typography>

                <Box display="flex" gap={1} flexWrap="wrap">
                    {item.tags?.map(tag => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                                height: 20,
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                bgcolor: alpha('#ffffff', 0.05),
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
