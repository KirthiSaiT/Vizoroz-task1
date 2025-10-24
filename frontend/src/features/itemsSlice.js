import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Define the base API URL
const API_BASE_URL = 'http://localhost:8000'

// Async thunks for CRUD operations
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await fetch(`${API_BASE_URL}/items/`)
  return response.json()
})

export const addItem = createAsyncThunk('items/addItem', async (itemData) => {
  const response = await fetch(`${API_BASE_URL}/items/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  })
  return response.json()
})

export const updateItem = createAsyncThunk('items/updateItem', async ({ id, ...itemData }) => {
  const response = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  })
  return response.json()
})

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
  await fetch(`${API_BASE_URL}/items/${id}`, {
    method: 'DELETE',
  })
  return id
})

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
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
        state.error = action.error.message
      })
      // Add item
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      // Update item
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      // Delete item
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      })
  },
})

export default itemsSlice.reducer