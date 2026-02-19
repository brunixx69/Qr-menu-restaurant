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
import { Menu as MenuIcon, Utensils, Settings, QrCode } from 'lucide-react';
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
        { text: 'Menu', icon: <Utensils size={20} />, path: '/' },
        { text: 'Admin', icon: <Settings size={20} />, path: '/admin' },
    ];

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <div style={{
                    width: 40,
                    height: 40,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}>
                    <Utensils size={24} />
                </div>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                    GourmetQR
                </Typography>
            </Box>
            <Divider sx={{ borderColor: 'rgba(0,0,0,0.06)' }} />
            <List sx={{ px: 2, pt: 2, flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => {
                                    navigate(item.path);
                                    if (isMobile) setMobileOpen(false);
                                }}
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                    color: isActive ? 'primary.main' : 'text.secondary',
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'primary.main' : 'text.secondary' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ p: 2 }}>
                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<QrCode size={18} />}
                    onClick={() => {
                        navigate('/admin');
                        if (isMobile) setMobileOpen(false);
                    }}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        borderColor: 'rgba(0,0,0,0.12)',
                        color: 'text.secondary',
                        '&:hover': {
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            bgcolor: 'transparent'
                        }
                    }}
                >
                    Download QR
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
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: 'none',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    display: { md: 'none' }
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" fontWeight="bold">
                        GourmetQR
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
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid rgba(0,0,0,0.08)' },
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
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    mt: { xs: 7, md: 0 }
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
