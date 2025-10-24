import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Define the base API URL
const API_BASE_URL = 'http://localhost:8000'

// Async thunks for CRUD operations
export const fetchItems = createAsyncThunk('items/fetchItems', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/`)
    if (!response.ok) {
      throw new Error('Failed to fetch items')
    }
    return await response.json()
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch items')
  }
})

export const addItem = createAsyncThunk('items/addItem', async (itemData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    })
    
    if (!response.ok) {
      throw new Error('Failed to add item')
    }
    
    return await response.json()
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to add item')
  }
})

export const updateItem = createAsyncThunk('items/updateItem', async ({ id, ...itemData }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    })
    
    if (!response.ok) {
      throw new Error('Failed to update item')
    }
    
    return await response.json()
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to update item')
  }
})

export const deleteItem = createAsyncThunk('items/deleteItem', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete item')
    }
    
    return id
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to delete item')
  }
})

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch items'
      })
      // Add item
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(addItem.rejected, (state, action) => {
        state.error = action.payload || 'Failed to add item'
      })
      // Update item
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update item'
      })
      // Delete item
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete item'
      })
  },
})

export const { clearError } = itemsSlice.actions
export default itemsSlice.reducer