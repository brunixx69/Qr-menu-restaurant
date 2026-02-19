import { createTheme, alpha } from '@mui/material/styles';

const primaryColor = '#1a1a1a'; // Elegant Matte Black
const secondaryColor = '#d35400'; // Burnt Orange "Sabor" accent
const backgroundColor = '#f5f5f5'; // Light Grey for contrast

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
        background: {
            default: backgroundColor,
            paper: '#ffffff',
        },
        text: {
            primary: '#2d3436',
            secondary: '#636e72',
        },
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Softer corners
                    padding: '8px 16px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)', // Subtle lift on hover
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: alpha(primaryColor, 0.9),
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16, // Modern rounded card
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', // Soft, premium shadow
                    border: '1px solid rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0px 12px 24px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius: 16,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontSize: '1rem',
                },
            },
        },
    },
});

export default theme;
