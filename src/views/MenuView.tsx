import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Grid, Container, useTheme, useMediaQuery } from '@mui/material';
import { useMenu } from '../context/MenuContext';
import MenuCard from '../components/MenuCard';

const MenuView: React.FC = () => {
    const { menuItems, categories } = useMenu();
    const [selectedTab, setSelectedTab] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
        const category = categories[newValue];
        const element = document.getElementById(`category-${category}`);
        if (element) {
            const headerOffset = 180; // Approximate header height adjustment
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Group items by category for the view
    const groupedItems = categories.reduce((acc, category) => {
        acc[category] = menuItems.filter(item => item.category === category);
        return acc;
    }, {} as Record<string, typeof menuItems>);

    return (
        <Container maxWidth="lg" sx={{ pb: 8 }}>
            <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                    Menu
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                    Discover our culinary delights, from fresh starters to exquisite main courses.
                </Typography>
            </Box>

            <Box
                sx={{
                    position: 'sticky',
                    top: { xs: 56, md: 0 },
                    zIndex: 10,
                    bgcolor: 'background.default',
                    pt: 2,
                    pb: 2,
                    mb: 4,
                    borderBottom: 1,
                    borderColor: 'divider'
                }}
            >
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="menu categories"
                    sx={{
                        '& .MuiTabs-indicator': {
                            height: 3,
                            borderRadius: '3px 3px 0 0'
                        }
                    }}
                >
                    {categories.map((category) => (
                        <Tab
                            key={category}
                            label={category}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                minWidth: 'auto',
                                px: 3
                            }}
                        />
                    ))}
                </Tabs>
            </Box>

            {categories.map((category, index) => (
                <Box key={category} id={`category-${category}`} sx={{ mb: 6, scrollMarginTop: '200px' }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                            pl: 1,
                            borderLeft: `4px solid ${theme.palette.secondary.main}`
                        }}
                    >
                        {category}
                    </Typography>

                    <Grid container spacing={3}>
                        {groupedItems[category]?.map((item) => (
                            <Grid item key={item.id} xs={12} sm={6} md={4}>
                                <MenuCard item={item} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Container>
    );
};

export default MenuView;
