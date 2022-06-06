import getConfig from 'next/config'
import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
  TypedStartListening,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import productReducer from '../features/products/productSlice'
import cartReducer, {
  addToCart,
  removeFromCart,
} from '../features/Cart/cartSlice'
import filterReducer, {
  setFilterByPrice,
} from '../features/filters/filterSlice'
const { publicRuntimeConfig } = getConfig()
const { localStorageStateKey } = publicRuntimeConfig

export const listenerMiddleware = createListenerMiddleware()
export const startAppListening =
  listenerMiddleware.startListening as AppStartListening
export const LOCAL_STORAGE_STATE_KEY = 'lumigo-state'
startAppListening({
  matcher: isAnyOf(addToCart, removeFromCart, setFilterByPrice),
  effect: async (_, listenerApi) => {
    const { cart, filter } = listenerApi.getState()

    localStorage.setItem(
      localStorageStateKey,
      JSON.stringify({
        cart,
        filter,
      })
    )
  },
})

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
