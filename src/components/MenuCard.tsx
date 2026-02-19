import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { MenuItem } from '../interfaces/MenuItem';

interface MenuCardProps {
    item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
    return (
        <Card sx={{
            height: '100%',
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
        }}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={item.imageUrl || 'https://via.placeholder.com/500x300?text=No+Image'}
                    alt={item.name}
                    sx={{
                        filter: item.isAvailable ? 'none' : 'grayscale(100%)',
                        transition: 'filter 0.3s ease',
                    }}
                />

                {/* Out of Stock Overlay */}
                {!item.isAvailable && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            bgcolor: 'rgba(255, 255, 255, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1
                        }}
                    >
                        <Chip
                            label="AGOTADO"
                            color="error"
                            size="medium"
                            sx={{ fontWeight: 'bold' }}
                        />
                    </Box>
                )}

                {/* Price Badge */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        bgcolor: 'background.paper',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 3,
                        fontWeight: 'bold',
                        boxShadow: 2,
                        zIndex: 2,
                        fontSize: '0.95rem'
                    }}
                >
                    ${item.price.toFixed(2)}
                </Box>
            </Box>

            <CardContent sx={{ pt: 2.5, pb: 2 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ lineHeight: 1.3, fontWeight: 700 }}>
                    {item.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40, lineHeight: 1.6 }}>
                    {item.description}
                </Typography>

                <Box display="flex" gap={0.8} flexWrap="wrap">
                    {item.tags?.map(tag => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{
                                fontSize: '0.7rem',
                                borderColor: 'divider',
                                bgcolor: 'background.default'
                            }}
                        />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default MenuCard;
