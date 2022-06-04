import { Product } from 'types/product'

import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '../../app/store'
import { client } from 'app/api'

interface ProductsState {
  items: Product[]
  loading: 'idle' | 'pending'
  error: SerializedError | null
  currentRequestId: string | null
}

const initialState: ProductsState = {
  items: [],
  loading: 'idle',
  error: null,
  currentRequestId: '',
}

export const fetchProducts = createAsyncThunk<
  Product[],
  number,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('products/fetchProducts', async (limit: number, { getState, requestId }) => {
  getState().products.items
  const { currentRequestId, loading } = getState().products
  if (loading !== 'pending' || requestId !== currentRequestId) {
    return getState().products.items
  }

  const params = limit ? { limit: `${limit}` } : null
  const { data } = await client<Product[]>(`/products`, { params })
  return data
})

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
      state.items = action.payload
      //Only unique items can be added
      const uniqueItems = new Map(
        [...state.items, ...action.payload].map((item) => [item.id, item])
      )
      state.items = [...uniqueItems.values()]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle'
          state.items.push(...action.payload)
          state.currentRequestId = null
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle'
          state.error = action.error
          state.currentRequestId = null
        }
      })
  },
})

export const { addProducts, populateProducts } = productsSlice.actions

export const selectProductSlice = (state: RootState) => state.products
export const selectProductCount = (state: RootState) =>
  state.products.items.length

export default productsSlice.reducer
