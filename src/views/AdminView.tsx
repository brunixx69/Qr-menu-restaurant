import React, { useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Switch,
    IconButton,
    Button,
    Tooltip,
    Dialog,
    DialogContent,
    Avatar,
    Container,
    alpha
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    QrCode as QrIcon
} from '@mui/icons-material';
import { useMenu } from '../context/MenuContext';
import { Product } from '../types';
import AdminForm from '../components/AdminForm';
import QRGenerator from '../components/QRGenerator';

const AdminView: React.FC = () => {
    const { menuItems, toggleAvailability, deleteMenuItem } = useMenu();
    const [openForm, setOpenForm] = useState(false);
    const [editingItem, setEditingItem] = useState<Product | null>(null);
    const [showQR, setShowQR] = useState(false);

    const handleEdit = (item: Product) => {
        setEditingItem(item);
        setOpenForm(true);
    };

    const handleAdd = () => {
        setEditingItem(null);
        setOpenForm(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('¿Estás seguro de eliminar este plato?')) {
            deleteMenuItem(id);
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingItem(null);
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
                    <Box>
                        <Typography variant="h3" fontWeight={800} color="primary">
                            GESTIÓN
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Panel Administrative - Premium Restaurant
                        </Typography>
                    </Box>
                    <Box display="flex" gap={2}>
                        <Button
                            variant="outlined"
                            startIcon={<QrIcon />}
                            onClick={() => setShowQR(true)}
                            color="secondary"
                        >
                            Ver QR
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAdd}
                        >
                            Nuevo Plato
                        </Button>
                    </Box>
                </Box>

                <Paper sx={{ overflow: 'hidden', border: '1px solid rgba(212,175,55,0.2)' }}>
                    <TableContainer sx={{ maxHeight: '70vh' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ bgcolor: alpha('#1a1a1a', 0.95), fontWeight: 800 }}>PLATO</TableCell>
                                    <TableCell sx={{ bgcolor: alpha('#1a1a1a', 0.95), fontWeight: 800 }}>CATEGORÍA</TableCell>
                                    <TableCell sx={{ bgcolor: alpha('#1a1a1a', 0.95), fontWeight: 800 }}>PRECIO</TableCell>
                                    <TableCell align="center" sx={{ bgcolor: alpha('#1a1a1a', 0.95), fontWeight: 800 }}>ESTADO</TableCell>
                                    <TableCell align="right" sx={{ bgcolor: alpha('#1a1a1a', 0.95), fontWeight: 800 }}>ACCIONES</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menuItems.map((item) => (
                                    <TableRow key={item.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={2}>
                                                <Avatar
                                                    variant="rounded"
                                                    src={item.imageUrl}
                                                    sx={{ width: 50, height: 50, border: '1px solid rgba(255,255,255,0.1)' }}
                                                />
                                                <Box>
                                                    <Typography fontWeight={700}>{item.name}</Typography>
                                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {item.description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{item.category}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight={700} color="primary.main">
                                                ${item.price.toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Switch
                                                checked={item.isAvailable}
                                                onChange={() => toggleAvailability(item.id)}
                                                color="primary"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Editar">
                                                <IconButton onClick={() => handleEdit(item)} sx={{ color: 'primary.main' }}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Eliminar">
                                                <IconButton onClick={() => handleDelete(item.id)} color="error">
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>

            {/* Form Dialog */}
            <Dialog
                open={openForm}
                onClose={handleCloseForm}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { border: '1px solid rgba(212,175,55,0.3)' }
                }}
            >
                <DialogContent sx={{ p: 0 }}>
                    <AdminForm itemToEdit={editingItem} onClose={handleCloseForm} />
                </DialogContent>
            </Dialog>

            {/* QR Code Dialog */}
            <Dialog open={showQR} onClose={() => setShowQR(false)} maxWidth="xs" fullWidth>
                <DialogContent>
                    <QRGenerator defaultUrl={window.location.origin} />
                    <Box mt={3} textAlign="center">
                        <Button variant="outlined" fullWidth onClick={() => setShowQR(false)}>Cerrar</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box >
    );
};

export default AdminView;
