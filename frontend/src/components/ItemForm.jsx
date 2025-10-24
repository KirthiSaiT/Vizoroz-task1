import React, { useEffect } from 'react'
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
  Typography,
  IconButton,
  Card,
  CardContent,
} from '@mui/material'
import { Close } from '@mui/icons-material'

const ItemForm = ({ item = null, open = false, onClose = null }) => {
  const dispatch = useDispatch()
  const isEditing = !!item
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
    }
  })

  // Update form values when item prop changes
  useEffect(() => {
    if (isEditing && item) {
      reset({
        name: item.name,
        description: item.description,
        price: item.price.toString(), // Convert to string for form input
      })
    } else {
      reset({
        name: '',
        description: '',
        price: '',
      })
    }
  }, [item, isEditing, reset])

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
        label="Item Name"
        variant="outlined"
        margin="normal"
        {...register('name', { required: 'Name is required' })}
        error={!!errors.name}
        helperText={errors.name?.message}
        placeholder="Enter item name"
      />
      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        margin="normal"
        multiline
        rows={3}
        {...register('description', { required: 'Description is required' })}
        error={!!errors.description}
        helperText={errors.description?.message}
        placeholder="Enter item description"
      />
      <TextField
        fullWidth
        label="Price ($)"
        type="number"
        variant="outlined"
        margin="normal"
        {...register('price', { 
          required: 'Price is required',
          min: { value: 0, message: 'Price must be positive' }
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
        placeholder="Enter price"
        InputProps={{
          inputProps: { min: 0, step: 0.01 }
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        {isEditing && onClose && (
          <Button 
            onClick={handleClose} 
            variant="outlined" 
            color="secondary"
            startIcon={<Close />}
          >
            Cancel
          </Button>
        )}
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          size="large"
        >
          {isEditing ? 'Update Item' : 'Add Item'}
        </Button>
      </Box>
    </Box>
  )

  if (isEditing && onClose) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Edit Menu Item</Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText sx={{ mb: 2 }}>
            Update the details for this menu item.
          </DialogContentText>
          {formContent}
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        {formContent}
      </CardContent>
    </Card>
  )
}

export default ItemForm