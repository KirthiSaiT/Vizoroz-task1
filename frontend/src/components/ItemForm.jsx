import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem, updateItem } from '../features/itemsSlice'
import { useForm } from 'react-hook-form'
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const ItemForm = ({ item = null, open = false, onClose = null }) => {
  const dispatch = useDispatch()
  const isEditing = !!item
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: isEditing ? {
      name: item.name,
      description: item.description,
      price: item.price,
    } : {
      name: '',
      description: '',
      price: '',
    }
  })

  const onSubmit = (data) => {
    const itemData = {
      name: data.name,
      description: data.description,
      price: parseInt(data.price),
    }

    if (isEditing) {
      dispatch(updateItem({ id: item.id, ...itemData }))
      onClose()
    } else {
      dispatch(addItem(itemData))
      reset()
    }
  }

  const handleClose = () => {
    if (onClose) {
      reset()
      onClose()
    }
  }

  const formContent = (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <TextField
        fullWidth
        label="Name"
        margin="normal"
        {...register('name', { required: 'Name is required' })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        fullWidth
        label="Description"
        margin="normal"
        multiline
        rows={4}
        {...register('description', { required: 'Description is required' })}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TextField
        fullWidth
        label="Price"
        type="number"
        margin="normal"
        {...register('price', { 
          required: 'Price is required',
          min: { value: 0, message: 'Price must be positive' }
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        {isEditing && onClose && (
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        )}
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? 'Update Item' : 'Add Item'}
        </Button>
      </Box>
    </Box>
  )

  if (isEditing && onClose) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEditing ? 'Edit the item details below.' : 'Enter the details for the new item.'}
          </DialogContentText>
          {formContent}
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    )
  }

  return formContent
}

export default ItemForm