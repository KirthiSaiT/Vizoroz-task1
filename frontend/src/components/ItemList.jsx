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
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

const ItemList = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.items)
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

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="outlined" onClick={handleRefresh}>
          Refresh
        </Button>
      </Box>
      
      {items.length === 0 ? (
        <Typography align="center" sx={{ my: 3 }}>
          No items found. Add a new item to get started.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell align="right">
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEdit(item)}
                      size="small"
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
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ItemList