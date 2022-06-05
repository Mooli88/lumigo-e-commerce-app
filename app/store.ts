import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/Cart/cartSlice'
import filterReducer from '../features/filters/filterSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    products: productReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
