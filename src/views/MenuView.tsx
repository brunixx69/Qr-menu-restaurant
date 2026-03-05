import React, { useState } from 'react';
import {
    Box, Typography, Tabs, Tab, Grid, Container, useTheme,
    Fab, Badge, Drawer, IconButton, Button, Divider, List, ListItem, ListItemText, ListItemSecondaryAction
} from '@mui/material';
import {
    ShoppingCart as CartIcon,
    Close as CloseIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    WhatsApp as WhatsAppIcon
} from '@mui/icons-material';
import { useMenu } from '../context/MenuContext';
import MenuCard from '../components/MenuCard';

const MenuView: React.FC = () => {
    const {
        menuItems, categories, cart, cartTotal,
        updateQuantity, removeFromCart, generateWhatsAppLink, table
    } = useMenu();
    const [selectedTab, setSelectedTab] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const theme = useTheme();

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
        const category = categories[newValue];
        const element = document.getElementById(`category-${category}`);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 120,
                behavior: 'smooth'
            });
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', pb: 10 }}>
            {/* Elegant Header */}
            <Box sx={{
                py: { xs: 6, md: 10 },
                textAlign: 'center',
                background: 'linear-gradient(to bottom, rgba(212, 175, 55, 0.15) 0%, transparent 100%)',
            }}>
                <Container maxWidth="md">
                    <Typography variant="h2" component="h1" gutterBottom
                        sx={{
                            color: 'primary.main',
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            textShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
                        }}
                    >
                        PREMIUM MENU
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ opacity: 0.8, letterSpacing: '0.1em' }}>
                        BIENVENIDO A LA {table.toUpperCase()}
                    </Typography>
                </Container>
            </Box>

            {/* Sticky Category Tabs */}
            <Box sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                bgcolor: 'rgba(10, 10, 10, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
            }}>
                <Container maxWidth="lg">
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTabs-indicator': { backgroundColor: 'primary.main' },
                            '& .MuiTab-root': { color: 'text.secondary', '&.Mui-selected': { color: 'primary.main' } }
                        }}
                    >
                        {categories.map((category) => (
                            <Tab key={category} label={category} />
                        ))}
                    </Tabs>
                </Container>
            </Box>

            {/* Menu Items Grid */}
            <Container maxWidth="lg" sx={{ mt: 6 }}>
                {categories.map((category) => (
                    <Box key={category} id={`category-${category}`} sx={{ mb: 8 }}>
                        <Typography variant="h4" sx={{ mb: 4, color: 'primary.main', fontWeight: 800 }}>
                            {category}
                        </Typography>
                        <Grid container spacing={3}>
                            {menuItems
                                .filter(item => item.category === category)
                                .map(item => (
                                    <Grid item key={item.id} xs={12} sm={6} md={4}>
                                        <MenuCard item={item} />
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>
                ))}
            </Container>

            {/* Reactive Cart Fab */}
            <Fab
                color="primary"
                aria-label="cart"
                onClick={() => setIsCartOpen(true)}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.1)' }
                }}
            >
                <Badge badgeContent={cart.reduce((a, b) => a + b.quantity, 0)} color="secondary">
                    <CartIcon />
                </Badge>
            </Fab>

            {/* Shopping Cart Drawer */}
            <Drawer
                anchor="right"
                open={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                PaperProps={{
                    sx: { width: { xs: '100%', sm: 400 }, bgcolor: 'background.default' }
                }}
            >
                <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h5" fontWeight={800} color="primary">TU PEDIDO</Typography>
                        <IconButton onClick={() => setIsCartOpen(false)} color="inherit">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ borderColor: 'rgba(212,175,55,0.2)' }} />

                    <List sx={{ flexGrow: 1, overflowY: 'auto', py: 2 }}>
                        {cart.length === 0 ? (
                            <Typography align="center" sx={{ mt: 10, opacity: 0.5 }}>Tu carrito está vacío</Typography>
                        ) : (
                            cart.map(item => (
                                <ListItem key={item.id} sx={{ mb: 2, alignItems: 'flex-start' }}>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                                        primaryTypographyProps={{ fontWeight: 700 }}
                                    />
                                    <ListItemSecondaryAction sx={{ top: '30%' }}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)} sx={{ border: '1px solid gray' }}>
                                                <RemoveIcon fontSize="inherit" />
                                            </IconButton>
                                            <Typography fontWeight={700}>{item.quantity}</Typography>
                                            <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)} sx={{ border: '1px solid gray' }}>
                                                <AddIcon fontSize="inherit" />
                                            </IconButton>
                                        </Box>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        )}
                    </List>

                    {cart.length > 0 && (
                        <Box sx={{ pt: 2 }}>
                            <Divider sx={{ mb: 2, borderColor: 'rgba(212,175,55,0.4)' }} />
                            <Box display="flex" justifyContent="space-between" mb={3}>
                                <Typography variant="h6">Total</Typography>
                                <Typography variant="h6" fontWeight={800} color="primary">${cartTotal.toFixed(2)}</Typography>
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                startIcon={<WhatsAppIcon />}
                                href={generateWhatsAppLink()}
                                target="_blank"
                                sx={{ height: 56 }}
                            >
                                Enviar Pedido a WhatsApp
                            </Button>
                        </Box>
                    )}
                </Box>
            </Drawer>
        </Box>
    );
};

export default MenuView;
