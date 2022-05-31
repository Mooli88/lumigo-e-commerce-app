import { Product } from 'types/product'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface ProductsState {
  items: Product[]
}

const initialState: ProductsState = {
  items: [],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    populateProducts: (
      state: ProductsState,
      action: PayloadAction<Product[]>
    ) => {
      state.items = action.payload
    },
    addProducts: (state: ProductsState, action: PayloadAction<Product[]>) => {
      //Only unique items are added
      const uniqueItems = new Map(
        [...state.items, ...action.payload].map((item) => [item.id, item])
      )
      state.items = [...uniqueItems.values()]
    },
  },
})

export const { addProducts } = productsSlice.actions

export const selectProducts = (state: RootState) => state.products.items
export const selectProductCount = (state: RootState) =>
  state.products.items.length

export default productsSlice.reducer
