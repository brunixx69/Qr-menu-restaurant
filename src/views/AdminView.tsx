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
    Fab,
    Tooltip,
    Dialog,
    DialogContent,
    Avatar
} from '@mui/material';
import { Edit2, Trash2, Plus, QrCode } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { MenuItem } from '../interfaces/MenuItem';
import AdminForm from '../components/AdminForm';
import QRGenerator from '../components/QRGenerator';

const AdminView: React.FC = () => {
    const { menuItems, toggleAvailability, deleteMenuItem } = useMenu();
    const [openForm, setOpenForm] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [showQR, setShowQR] = useState(false);

    const handleEdit = (item: MenuItem) => {
        setEditingItem(item);
        setOpenForm(true);
    };

    const handleAdd = () => {
        setEditingItem(null);
        setOpenForm(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteMenuItem(id);
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingItem(null);
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Menu Management
                </Typography>
                <Box display="flex" gap={2}>
                    <Button
                        variant="outlined"
                        startIcon={<QrCode size={18} />}
                        onClick={() => setShowQR(true)}
                    >
                        QR Code
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Plus size={18} />}
                        onClick={handleAdd}
                    >
                        Add New Dish
                    </Button>
                </Box>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 4, boxShadow: 3 }}>
                <TableContainer sx={{ maxHeight: '70vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'background.default' }}>Image</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'background.default' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'background.default' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'background.default' }}>Price</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: 'background.default' }}>Available</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', bgcolor: 'background.default' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menuItems.map((item) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                    <TableCell>
                                        <Avatar
                                            variant="rounded"
                                            src={item.imageUrl}
                                            alt={item.name}
                                            sx={{ width: 56, height: 56, borderRadius: 2 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle1" fontWeight={600}>{item.name}</Typography>
                                        <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 200, display: 'block' }}>
                                            {item.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                        <Switch
                                            checked={item.isAvailable}
                                            onChange={() => toggleAvailability(item.id)}
                                            color="success"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => handleEdit(item)} color="primary">
                                                <Edit2 size={18} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(item.id)} color="error">
                                                <Trash2 size={18} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Form Dialog */}
            <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
                <DialogContent>
                    <AdminForm itemToEdit={editingItem} onClose={handleCloseForm} />
                </DialogContent>
            </Dialog>

            {/* QR Code Dialog */}
            <Dialog open={showQR} onClose={() => setShowQR(false)} maxWidth="xs" fullWidth>
                <DialogContent>
                    <QRGenerator defaultUrl={window.location.origin} />
                    <Box mt={2} textAlign="center">
                        <Button onClick={() => setShowQR(false)}>Close</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default AdminView;
