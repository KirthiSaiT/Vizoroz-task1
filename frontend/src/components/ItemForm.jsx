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
  Avatar,
  InputAdornment,
  styled,
} from '@mui/material'
import { Close, Save, Fastfood, CurrencyRupee } from '@mui/icons-material'

// Styled components for better appearance
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '12px 24px',
  fontWeight: 600,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
  },
}))

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
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <StyledTextField
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
      />
      <StyledTextField
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
      />
      <StyledTextField
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
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        {isEditing && onClose && (
          <StyledButton 
            onClick={handleClose} 
            variant="outlined" 
            color="secondary"
            startIcon={<Close />}
          >
            Cancel
          </StyledButton>
        )}
        <StyledButton 
          type="submit" 
          variant="contained" 
          color="primary"
          startIcon={<Save />}
        >
          {isEditing ? 'Update Item' : 'Add Item'}
        </StyledButton>
      </Box>
    </Box>
  )

  if (isEditing && onClose) {
    return formContent
  }

  return (
    <StyledCard variant="outlined">
      <CardContent sx={{ p: 3 }}>
        {formContent}
      </CardContent>
    </StyledCard>
  )
}

export default ItemForm