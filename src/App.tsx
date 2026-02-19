import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme/theme';
import { MenuProvider } from './context/MenuContext';
import Layout from './components/Layout';
import MenuView from './views/MenuView';
import AdminView from './views/AdminView';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MenuProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<MenuView />} />
                            <Route path="/admin" element={<AdminView />} />
                        </Routes>
                    </Layout>
                </Router>
            </MenuProvider>
        </ThemeProvider>
    );
}

export default App;
