import { createTheme, alpha } from '@mui/material/styles';

const goldColor = '#D4AF37';
const blackColor = '#0a0a0a';
const glassBlur = 'blur(12px)';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: goldColor,
            contrastText: blackColor,
        },
        secondary: {
            main: '#FF3B30', // Strict Apple-style Red for notifications
        },
        background: {
            default: blackColor,
            paper: '#1a1a1a',
        },
        text: {
            primary: '#ffffff',
            secondary: alpha('#ffffff', 0.7),
        },
    },
    typography: {
        fontFamily: "'Outfit', 'Inter', sans-serif",
        h1: { fontWeight: 900, letterSpacing: '-0.02em' },
        h2: { fontWeight: 900, letterSpacing: '-0.02em' },
        h3: { fontWeight: 800 },
        h4: { fontWeight: 800 },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 700 },
        button: { textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' },
    },
    shape: {
        borderRadius: 20,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@keyframes pop': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2)' },
                    '100%': { transform: 'scale(1)' },
                },
                '@keyframes scaleUp': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.15)' },
                    '100%': { transform: 'scale(1)' },
                },
                body: {
                    backgroundColor: blackColor,
                    backgroundImage: `radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%)`,
                    backgroundAttachment: 'fixed',
                    scrollBehavior: 'smooth',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    padding: '12px 28px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: `0 10px 25px ${alpha(goldColor, 0.4)}`,
                    },
                    '&:active': {
                        transform: 'translateY(-1px)',
                    },
                },
                containedPrimary: {
                    background: `linear-gradient(45deg, ${goldColor} 30%, #F4D03F 90%)`,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: alpha('#1a1a1a', 0.6),
                    backdropFilter: glassBlur,
                    WebkitBackdropFilter: glassBlur,
                    border: `1px solid ${alpha(goldColor, 0.1)}`,
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
                    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    overflow: 'visible',
                    '&:hover': {
                        transform: 'translateY(-10px)',
                        borderColor: alpha(goldColor, 0.5),
                        boxShadow: `0 20px 40px ${alpha(goldColor, 0.2)}`,
                    },
                },
            },
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    boxShadow: `0 8px 32px ${alpha(goldColor, 0.3)}`,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'scale(1.15) rotate(5deg)',
                        boxShadow: `0 12px 40px ${alpha(goldColor, 0.5)}`,
                    },
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    fontWeight: 900,
                    fontSize: '0.75rem',
                    minWidth: 20,
                    height: 20,
                    border: `2px solid ${blackColor}`,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                elevation1: {
                    background: alpha('#1a1a1a', 0.8),
                    backdropFilter: glassBlur,
                    WebkitBackdropFilter: glassBlur,
                    border: `1px solid ${alpha(goldColor, 0.15)}`,
                },
            },
        },
    },
});

export default theme;
