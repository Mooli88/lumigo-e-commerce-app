import {
  createDraftSafeSelector,
  createSlice,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit'
import { RootState, useAppSelector } from 'app/store'
import { Filter } from 'types/filter'
import { Product } from 'types/product'

interface FilterState {
  byPrice: Filter
  byName: string
}

const initialState: FilterState = {
  byPrice: {
    id: 'all',
    value: [],
  },
  byName: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterByPrice: (state: FilterState, action: PayloadAction<Filter>) => {
      state.byPrice = action.payload
    },
    setFilterByName: (state: FilterState, action: PayloadAction<string>) => {
      state.byName = action.payload
      state.byPrice = initialState.byPrice
    },
  },
})

const filterByPrice = (price: number, { value: filter }: Filter) => {
  switch (filter.length) {
    case 0:
      return true
    case 1:
      return price >= filter[0]!
    default:
      return price >= filter[0]! && price <= filter[1]!
  }
}

export const { setFilterByPrice } = filterSlice.actions

export const selectFilterSlice = (state: RootState) => state.filter

const selectFilteredProductsByName = (state: RootState) =>
  state.products.items.filter(({ title }) =>
    title.includes(state.filter.byName)
  )

const selectSlice = createDraftSafeSelector(
  (state: RootState) => ({ products: state.products, filter: state.filter }),
  (state) => state
)

export const selectFilteredProductsByPrice = (
  state: RootState,
  products: Product[]
) => {
  let items: Product[] = products ?? state.products.items

  if (state.filter.byPrice.value.length > 0) {
    items = items.filter(({ price }) =>
      filterByPrice(price, state.filter.byPrice)
    )
  }
  return items
}

export const selectFilteredProducts = createDraftSafeSelector(
  selectSlice,
  selectFilteredProductsByName,
  selectFilteredProductsByPrice
)

export default filterSlice.reducer
