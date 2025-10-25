import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, fetchItems } from '../features/itemsSlice'
import ItemForm from './ItemForm'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
  Avatar,
  styled,
} from '@mui/material'
import { Edit, Delete, Refresh, Fastfood, CurrencyRupee } from '@mui/icons-material'

// Styled components for better appearance
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
  overflow: 'hidden',
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': { border: 0 },
  '&:hover': { 
    backgroundColor: '#f1f8e9',
    transform: 'scale(1.01)',
    transition: 'all 0.2s ease',
  },
}))

const ActionButton = styled(IconButton)(({ theme, bgcolor, hovercolor }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: bgcolor,
  '&:hover': { 
    backgroundColor: hovercolor,
  },
  transition: 'all 0.2s ease',
}))

const ItemList = () => {
  const dispatch = useDispatch()
  const { items, loading } = useSelector((state) => state.items)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [deletingItemId, setDeletingItemId] = useState(null)

  // Convert USD to INR (approximate conversion)
  const convertToINR = (usd) => {
    const exchangeRate = 83 // Approximate USD to INR exchange rate
    return (usd * exchangeRate).toFixed(2)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setOpenEditDialog(true)
  }

  const handleDeleteClick = (id) => {
    setDeletingItemId(id)
    setOpenDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteItem(deletingItemId))
    setOpenDeleteDialog(false)
    setDeletingItemId(null)
  }

  const handleRefresh = () => {
    dispatch(fetchItems())
  }

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false)
    setEditingItem(null)
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
    setDeletingItemId(null)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    )
  }

  return (
    <>
      {items.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Avatar sx={{ width: 72, height: 72, mx: 'auto', mb: 3, bgcolor: 'primary.main' }}>
            <Fastfood sx={{ fontSize: 36 }} />
          </Avatar>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            No inventory items found
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            Add a new item to get started with your inventory
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ mt: 2, borderRadius: 8, px: 4, py: 1.5 }}
          >
            Add Your First Item
          </Button>
        </Box>
      ) : (
        <StyledTableContainer component={Paper} variant="outlined">
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
                  <Button 
                    variant="outlined" 
                    size="medium" 
                    startIcon={<Refresh />}
                    onClick={handleRefresh}
                    sx={{ borderRadius: 8, fontWeight: 'bold' }}
                  >
                    Refresh
                  </Button>
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
                      onClick={() => handleEdit(item)}
                      size="small"
                      bgcolor="#e3f2fd"
                      hovercolor="#bbdefb"
                      sx={{ mr: 1 }}
                    >
                      <Edit />
                    </ActionButton>
                    <ActionButton 
                      color="secondary" 
                      onClick={() => handleDeleteClick(item.id)}
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

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 48, height: 48, mr: 2, bgcolor: 'primary.main' }}>
              <Edit sx={{ fontSize: 24 }} />
            </Avatar>
            <Typography variant="h5">Edit Inventory Item</Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ py: 3 }}>
          {editingItem && (
            <ItemForm 
              item={editingItem} 
              open={openEditDialog} 
              onClose={handleCloseEditDialog} 
            />
          )}
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
          <DialogContentText sx={{ fontSize: 16, mb: 2 }}>
            Are you sure you want to delete this inventory item? This action cannot be undone.
          </DialogContentText>
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
    </>
  )
}

export default ItemList