import React, { useState } from 'react';
import {
    Box, Typography, Tabs, Tab, Grid, Container, useTheme,
    Fab, Badge, Drawer, IconButton, Button, Divider, List, ListItem, ListItemText, ListItemSecondaryAction,
    Snackbar, Alert
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
import { formatCurrency } from '../utils/urlUtils';

const MenuView: React.FC = () => {
    const {
        menuItems, categories, cart, cartTotal,
        updateQuantity, removeFromCart, generateWhatsAppLink, table,
        notification, hideNotification
    } = useMenu();
    const [selectedTab, setSelectedTab] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const theme = useTheme();

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
        const category = categories[newValue];
        const element = document.getElementById(`category-${category.replace(/\s+/g, '-')}`);
        if (element) {
            const headerOffset = 140;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', pb: 12 }}>
            {/* Elegant Header */}
            <Box sx={{
                pt: { xs: 8, md: 12 },
                pb: { xs: 6, md: 8 },
                textAlign: 'center',
                background: 'linear-gradient(to bottom, rgba(212, 175, 55, 0.15) 0%, transparent 100%)',
            }}>
                <Container maxWidth="md">
                    <Typography variant="h1" gutterBottom
                        sx={{
                            color: 'primary.main',
                            fontSize: { xs: '2.8rem', md: '5rem' },
                            textShadow: '0 0 30px rgba(212, 175, 55, 0.4)',
                            mb: 1
                        }}
                    >
                        GOURMET QR
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ opacity: 0.6, letterSpacing: '0.3em', fontWeight: 500 }}>
                        BIENVENIDO A LA {table.toUpperCase()}
                    </Typography>
                </Container>
            </Box>

            {/* Sticky Category Tabs */}
            <Box sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                bgcolor: 'rgba(10, 10, 10, 0.85)',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                py: 1
            }}>
                <Container maxWidth="lg">
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' },
                            '& .MuiTab-root': {
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                minWidth: 100,
                                opacity: 0.7,
                                '&.Mui-selected': { opacity: 1 }
                            }
                        }}
                    >
                        {categories.map((category) => (
                            <Tab key={category} label={category.toUpperCase()} />
                        ))}
                    </Tabs>
                </Container>
            </Box>

            {/* Menu Items Grid */}
            <Container maxWidth="lg" sx={{ mt: 8 }}>
                {categories.map((category) => (
                    <Box key={category} id={`category-${category.replace(/\s+/g, '-')}`} sx={{ mb: 12 }}>
                        <Box display="flex" alignItems="center" gap={2} mb={5}>
                            <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 900 }}>
                                {category}
                            </Typography>
                            <Box sx={{ flexGrow: 1, height: '1px', bgcolor: 'rgba(212, 175, 55, 0.1)' }} />
                        </Box>
                        <Grid container spacing={4}>
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
                    bottom: 32,
                    right: 32,
                    width: 64,
                    height: 64
                }}
            >
                <Badge
                    badgeContent={cart.reduce((a, b) => a + b.quantity, 0)}
                    color="secondary"
                    overlap="circular"
                >
                    <CartIcon sx={{ fontSize: 32 }} />
                </Badge>
            </Fab>

            {/* Shopping Cart Drawer */}
            <Drawer
                anchor="right"
                open={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                PaperProps={{
                    sx: { width: { xs: '100%', sm: 420 }, bgcolor: '#121212' }
                }}
            >
                <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                        <Typography variant="h4" fontWeight={900} color="primary">MI PEDIDO</Typography>
                        <IconButton onClick={() => setIsCartOpen(false)} color="inherit" sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(212,175,55,0.1)' }} />

                    <List sx={{ flexGrow: 1, overflowY: 'auto', py: 3 }}>
                        {cart.length === 0 ? (
                            <Box sx={{ textAlign: 'center', mt: 10, opacity: 0.4 }}>
                                <CartIcon sx={{ fontSize: 64, mb: 2 }} />
                                <Typography variant="h6">Tu carrito está vacío</Typography>
                            </Box>
                        ) : (
                            cart.map(item => (
                                <ListItem key={item.id} sx={{ mb: 3, alignItems: 'flex-start', bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 4, p: 2 }}>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={formatCurrency(item.price * item.quantity)}
                                        primaryTypographyProps={{ fontWeight: 800, fontSize: '1.1rem' }}
                                        secondaryTypographyProps={{ color: 'primary.main', fontWeight: 600 }}
                                    />
                                    <ListItemSecondaryAction sx={{ top: '50%', transform: 'translateY(-50%)' }}>
                                        <Box display="flex" alignItems="center" gap={1.5} sx={{ bgcolor: 'rgba(0,0,0,0.3)', p: 0.5, borderRadius: 10 }}>
                                            <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)} sx={{ color: 'white' }}>
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                            <Typography fontWeight={900} sx={{ minWidth: 20, textAlign: 'center' }}>{item.quantity}</Typography>
                                            <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)} sx={{ color: 'primary.main' }}>
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        )}
                    </List>

                    {cart.length > 0 && (
                        <Box sx={{ pt: 3 }}>
                            <Divider sx={{ mb: 3, borderColor: 'rgba(212,175,55,0.2)' }} />
                            <Box display="flex" justifyContent="space-between" mb={4}>
                                <Typography variant="h5" fontWeight={500}>TOTAL</Typography>
                                <Typography variant="h4" fontWeight={900} color="primary">{formatCurrency(cartTotal)}</Typography>
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                startIcon={<WhatsAppIcon />}
                                href={generateWhatsAppLink()}
                                target="_blank"
                                sx={{ height: 64, fontSize: '1.1rem' }}
                            >
                                CONTINUAR A WHATSAPP
                            </Button>
                        </Box>
                    )}
                </Box>
            </Drawer>

            {/* Global Notifications System */}
            <Snackbar
                open={notification.open}
                autoHideDuration={4000}
                onClose={hideNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={hideNotification}
                    severity={notification.severity}
                    variant="filled"
                    sx={{ width: '100%', fontWeight: 700, borderRadius: 3 }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default MenuView;
