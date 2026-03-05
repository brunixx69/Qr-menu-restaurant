import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    useMediaQuery,
    useTheme,
    Button,
    Divider
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
    Menu as MenuIcon,
    RestaurantMenu as Utensils,
    AdminPanelSettings as Settings,
    QrCode as QrIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: 'Menú Cliente', icon: <Utensils />, path: '/' },
        { text: 'Administración', icon: <Settings />, path: '/admin' },
    ];

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
            <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                    width: 42,
                    height: 42,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, #F4D03F 90%)`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black',
                    boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
                }}>
                    <Utensils />
                </Box>
                <Typography variant="h6" fontWeight={900} color="primary" sx={{ letterSpacing: '0.05em' }}>
                    GOURMET QR
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.1)' }} />

            <List sx={{ px: 2, pt: 3, flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1.5 }}>
                            <ListItemButton
                                onClick={() => {
                                    navigate(item.path);
                                    if (isMobile) setMobileOpen(false);
                                }}
                                sx={{
                                    borderRadius: 3,
                                    bgcolor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                    color: isActive ? 'primary.main' : 'text.secondary',
                                    border: isActive ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}` : '1px solid transparent',
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                                        borderColor: alpha(theme.palette.primary.main, 0.2),
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'primary.main' : 'text.secondary' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 800 : 500,
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ p: 3, mt: 'auto' }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, opacity: 0.5 }}>
                    v2.0 Professional Edition
                </Typography>
                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<QrIcon />}
                    onClick={() => {
                        navigate('/admin');
                        if (isMobile) setMobileOpen(false);
                    }}
                    sx={{
                        borderRadius: 3,
                        borderColor: alpha(theme.palette.primary.main, 0.2),
                        color: 'primary.main',
                    }}
                >
                    Management
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    bgcolor: alpha(theme.palette.background.default, 0.8),
                    backdropFilter: 'blur(10px)',
                    color: 'text.primary',
                    boxShadow: 'none',
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    display: { md: 'none' }
                }}
            >
                <Toolbar>
                    <IconButton
                        color="primary"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" fontWeight={900} color="primary">
                        GOURMET QR
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                        },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, md: 4 },
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    mt: { xs: 8, md: 0 }
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
