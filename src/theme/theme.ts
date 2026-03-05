import { createTheme, alpha } from '@mui/material/styles';

const goldColor = '#D4AF37'; // Classic Gold
const blackColor = '#0a0a0a'; // Deep Black
const glassBg = 'rgba(255, 255, 255, 0.05)';
const glassBlur = 'blur(12px)';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: goldColor,
            contrastText: blackColor,
        },
        secondary: {
            main: '#ffffff',
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
        h1: { fontWeight: 800, letterSpacing: '-0.02em' },
        h2: { fontWeight: 800, letterSpacing: '-0.02em' },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: blackColor,
                    backgroundImage: `radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%)`,
                    backgroundAttachment: 'fixed',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '10px 24px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 20px ${alpha(goldColor, 0.3)}`,
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
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        borderColor: alpha(goldColor, 0.4),
                        boxShadow: `0 12px 40px ${alpha(goldColor, 0.15)}`,
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                elevation1: {
                    background: alpha('#1a1a1a', 0.7),
                    backdropFilter: glassBlur,
                    WebkitBackdropFilter: glassBlur,
                    border: `1px solid ${alpha('#ffffff', 0.1)}`,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: alpha(blackColor, 0.8),
                    backdropFilter: glassBlur,
                    borderBottom: `1px solid ${alpha(goldColor, 0.2)}`,
                },
            },
        },
    },
});

export default theme;
