import { configureStore } from '@reduxjs/toolkit'
import itemsSlice from './features/itemsSlice'

export const store = configureStore({
  reducer: {
    items: itemsSlice,
  },
})