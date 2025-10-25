import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, addItem, updateItem, deleteItem } from '../features/itemsSlice';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Tooltip,
  styled,
  InputAdornment,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Fastfood,
  Add,
  Edit,
  Delete,
  Save,
  Close,
  CurrencyRupee,
  Refresh,
  Inventory
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';

// Styled components for better appearance
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
  overflow: 'hidden',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': { border: 0 },
  '&:hover': { 
    backgroundColor: '#f1f8e9',
  },
}));

const ActionButton = styled(IconButton)(({ theme, bgcolor, hovercolor }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: bgcolor,
  '&:hover': { 
    backgroundColor: hovercolor,
  },
  transition: 'all 0.2s ease',
}));

const InventoryManager = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
    }
  });

  // Convert USD to INR (approximate conversion)
  const convertToINR = (usd) => {
    const exchangeRate = 83; // Approximate USD to INR exchange rate
    return (usd * exchangeRate).toFixed(2);
  };

  // Fetch items when component mounts
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleOpenAddForm = () => {
    setEditingItem(null);
    reset({
      name: '',
      description: '',
      price: '',
    });
    setOpenFormDialog(true);
  };

  const handleOpenEditForm = (item) => {
    setEditingItem(item);
    reset({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
    });
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setEditingItem(null);
    reset();
  };

  const handleOpenDeleteDialog = (id) => {
    setDeletingItemId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingItemId(null);
  };

  const onSubmit = (data) => {
    const itemData = {
      name: data.name,
      description: data.description,
      price: parseInt(data.price),
    };

    if (editingItem) {
      dispatch(updateItem({ id: editingItem.id, ...itemData }));
    } else {
      dispatch(addItem(itemData));
    }

    handleCloseFormDialog();
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteItem(deletingItemId));
    handleCloseDeleteDialog();
  };

  const handleRefresh = () => {
    dispatch(fetchItems());
  };

  return (
    <Box>
      {/* Header with Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#2E7D32' }}>
            Inventory Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Add, edit, and delete food items in your inventory
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            sx={{ borderRadius: 8, px: 2 }}
          >
            Refresh
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<Add />}
            onClick={handleOpenAddForm}
            sx={{ borderRadius: 8, px: 3, py: 1.5, boxShadow: 3 }}
          >
            Add New Item
          </Button>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ borderRadius: 3, mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      )}

      {/* Inventory Table */}
      {!loading && (
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <Inventory />
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Inventory Items
              </Typography>
            }
            subheader={`${items.length} items in inventory`}
          />
          <CardContent>
            {items.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Avatar sx={{ width: 72, height: 72, mx: 'auto', mb: 3, bgcolor: 'primary.main' }}>
                  <Fastfood sx={{ fontSize: 36 }} />
                </Avatar>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                  No items in inventory
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                  Get started by adding your first inventory item
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  startIcon={<Add />}
                  onClick={handleOpenAddForm}
                  sx={{ borderRadius: 8, px: 4, py: 1.5 }}
                >
                  Add Your First Item
                </Button>
              </Box>
            ) : (
              <StyledTableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#e8f5e9' }}>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="subtitle2" fontWeight="bold" color="primary" fontSize={16}>
                          ID
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="subtitle2" fontWeight="bold" color="primary" fontSize={16}>
                          Item Name
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="subtitle2" fontWeight="bold" color="primary" fontSize={16}>
                          Description
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="subtitle2" fontWeight="bold" color="primary" fontSize={16}>
                          Price (INR)
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ py: 2 }}>
                        <Typography variant="subtitle2" fontWeight="bold" color="primary" fontSize={16}>
                          Actions
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item) => (
                      <StyledTableRow key={item.id}>
                        <TableCell component="th" scope="row" sx={{ py: 2 }}>
                          <Chip 
                            label={item.id} 
                            size="medium" 
                            color="primary" 
                            variant="filled" 
                            sx={{ 
                              fontWeight: 'bold',
                              fontSize: 14,
                              height: 32,
                              borderRadius: 8,
                            }} 
                          />
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: 'secondary.main' }}>
                              <Fastfood sx={{ fontSize: 20 }} />
                            </Avatar>
                            <Typography variant="body1" fontWeight="medium" fontSize={16}>
                              {item.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Tooltip title={item.description} placement="top-start">
                            <Typography 
                              variant="body2" 
                              color="textSecondary" 
                              sx={{ 
                                maxWidth: 250, 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                whiteSpace: 'nowrap',
                                fontSize: 15,
                              }}
                            >
                              {item.description}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CurrencyRupee sx={{ fontSize: 18, color: 'success.main' }} />
                            <Typography variant="body1" fontWeight="bold" color="success.main" fontSize={16}>
                              {convertToINR(item.price)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 2 }}>
                          <ActionButton 
                            color="primary" 
                            onClick={() => handleOpenEditForm(item)}
                            size="small"
                            bgcolor="#e3f2fd"
                            hovercolor="#bbdefb"
                            sx={{ mr: 1 }}
                          >
                            <Edit />
                          </ActionButton>
                          <ActionButton 
                            color="secondary" 
                            onClick={() => handleOpenDeleteDialog(item.id)}
                            size="small"
                            bgcolor="#ffebee"
                            hovercolor="#ffcdd2"
                          >
                            <Delete />
                          </ActionButton>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Form Dialog */}
      <Dialog
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ width: 48, height: 48, mr: 2, bgcolor: 'primary.main' }}>
                {editingItem ? <Edit sx={{ fontSize: 24 }} /> : <Add sx={{ fontSize: 24 }} />}
              </Avatar>
              <Typography variant="h5">
                {editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
              </Typography>
            </Box>
            <IconButton onClick={handleCloseFormDialog}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ py: 3 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Item Name"
              variant="outlined"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
              placeholder="Enter item name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Fastfood color="primary" />
                  </InputAdornment>
                ),
              }}
              size="medium"
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              {...register('description', { required: 'Description is required' })}
              error={!!errors.description}
              helperText={errors.description?.message}
              placeholder="Enter item description"
              size="medium"
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Price (INR)"
              type="number"
              variant="outlined"
              {...register('price', { 
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' }
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
              placeholder="Enter price in Indian Rupees"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupee color="primary" />
                  </InputAdornment>
                ),
                inputProps: { min: 0, step: 1 }
              }}
              size="medium"
              sx={{ mb: 3 }}
            />
            <DialogActions sx={{ p: 0, pt: 2 }}>
              <Button 
                onClick={handleCloseFormDialog} 
                color="secondary" 
                variant="outlined"
                size="large"
                sx={{ borderRadius: 8, px: 3 }}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                variant="contained" 
                color="primary"
                size="large"
                startIcon={<Save />}
                sx={{ borderRadius: 8, px: 3 }}
              >
                {editingItem ? 'Update Item' : 'Add Item'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 48, height: 48, mr: 2, bgcolor: 'secondary.main' }}>
              <Delete sx={{ fontSize: 24 }} />
            </Avatar>
            <Typography variant="h5">Confirm Delete</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete this inventory item? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleCloseDeleteDialog} 
            color="primary" 
            variant="outlined"
            size="large"
            sx={{ borderRadius: 8, px: 3 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="secondary" 
            variant="contained"
            size="large"
            startIcon={<Delete />}
            sx={{ borderRadius: 8, px: 3 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryManager;