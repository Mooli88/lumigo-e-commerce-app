import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { FilterByPrice } from 'types/filter'
import { Product } from 'types/product'

interface FilterState {
  byName: string
  byPrice: FilterByPrice
  byRating: number
}

const initialState: FilterState = {
  byName: '',
  byPrice: {
    id: 'all',
    value: [],
  },
  byRating: 1,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterByPrice: (
      state: FilterState,
      action: PayloadAction<FilterByPrice>
    ) => {
      state.byPrice = action.payload
    },
    setFilterByName: (state: FilterState, action: PayloadAction<string>) => {
      state.byName = action.payload.toLocaleLowerCase()
      state.byPrice = initialState.byPrice
      state.byRating = initialState.byRating
    },
    setFilterByRating: (state: FilterState, action: PayloadAction<number>) => {
      state.byRating = action.payload
    },
  },
})

const filterByPrice = (price: number, { value: filter }: FilterByPrice) => {
  switch (filter.length) {
    case 0:
      return true
    case 1:
      return price >= filter[0]!
    default:
      return price >= filter[0]! && price <= filter[1]!
  }
}

export const { setFilterByPrice, setFilterByName, setFilterByRating } =
  filterSlice.actions

export const selectFilterSlice = (state: RootState) => state.filter

const filterProducts = (filter: FilterState, products: Product[]) => {
  return products.filter(
    ({ title, price, rating }) =>
      title.toLocaleLowerCase().includes(filter.byName) &&
      filterByPrice(price, filter.byPrice) &&
      Math.round(rating.rate) >= filter.byRating
  )
}

export const selectFilteredProducts = createDraftSafeSelector(
  [selectFilterSlice, (state: RootState) => state.products.items],
  filterProducts
)


export default filterSlice.reducer
