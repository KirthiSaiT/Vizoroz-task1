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
} from '@mui/material'
import { Edit, Delete, Refresh } from '@mui/icons-material'

const ItemList = () => {
  const dispatch = useDispatch()
  const { items, loading } = useSelector((state) => state.items)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [deletingItemId, setDeletingItemId] = useState(null)

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
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      {items.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No menu items found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Add a new item to get started
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><Typography variant="subtitle2" fontWeight="bold">ID</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight="bold">Name</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight="bold">Description</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" fontWeight="bold">Price</Typography></TableCell>
                <TableCell align="right">
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<Refresh />}
                    onClick={handleRefresh}
                  >
                    Refresh
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow 
                  key={item.id} 
                  hover
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#f9f9f9' }
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Chip label={item.id} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="medium">
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={item.description} placement="top-start">
                      <Typography 
                        variant="body2" 
                        color="textSecondary" 
                        sx={{ 
                          maxWidth: 200, 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap' 
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="primary">
                      ${item.price.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEdit(item)}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      color="secondary" 
                      onClick={() => handleDeleteClick(item.id)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Dialog */}
      <ItemForm 
        item={editingItem} 
        open={openEditDialog} 
        onClose={handleCloseEditDialog} 
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Confirm Delete</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this menu item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="secondary" 
            variant="contained"
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ItemList