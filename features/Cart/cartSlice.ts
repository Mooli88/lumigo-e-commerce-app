import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { CartItem } from 'types/cart'
import { Product } from 'types/product'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: CartState, action: PayloadAction<Product>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      )
      const { id, title, price, image, quantity } =
        state.items[itemIndex] ?? action.payload
      const newItem = {
        id,
        title,
        price,
        image,
        quantity: (quantity ?? 0) + 1,
      }

      if (itemIndex !== -1) {
        state.items[itemIndex] = newItem
      } else state.items.push(newItem)
    },
    removeItem: (
      state: CartState,
      action: PayloadAction<Pick<Product, 'id'>>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      )
      if (itemIndex !== -1) state.items.splice(itemIndex, 1)
    },
  },
})

export const { addItem, removeItem } = cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.items
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)

export default cartSlice.reducer
