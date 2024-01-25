import { RootState, useAppDispatch, useAppSelector } from 'app/store'
import { RadioBtn } from 'components/RadioBtn'
import { Rating } from 'components/Rating'
import React, { useCallback, useEffect } from 'react'
import { FilterByPrice } from 'types/filter'
import {
  selectFilterSlice,
  setFilter,
  setFilterByPrice,
  setFilterByRating,
} from './filterSlice'
import { getFromLocalStorage } from 'utils'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { localStorageStateKey } = publicRuntimeConfig

interface IFilterByPrice extends FilterByPrice {
  label: string
}

export const FILTERS_BY_PRICE: IFilterByPrice[] = [
  { id: 'all', label: 'All', value: [] },
  { id: '0-99', label: 'Under 100$', value: [0, 99] },
  { id: '100-200', label: '100$ - 200$', value: [100, 200] },
  { id: '>200', label: 'Above 200$', value: [201] },
]

const FILTERS_BY_PRICE_INDEXED = FILTERS_BY_PRICE.reduce((acc, curr) => {
  acc[curr.id] = curr
  return acc
}, {} as Record<string, FilterByPrice>)

export const Filters = () => {
  const filterSlice = useAppSelector(selectFilterSlice)
  const dispatch = useAppDispatch()
  const { byPrice, byRating } = filterSlice

  useEffect(() => {
    const cachedFilters =
      getFromLocalStorage<RootState>(
        localStorageStateKey,
        ({ filter }) => filter
      ) ?? {}

    if (cachedFilters) {
      dispatch(setFilter(cachedFilters))
    }
  }, [dispatch])

  const onFilterByPrice = ({
    target: { id },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = FILTERS_BY_PRICE_INDEXED[id]
    dispatch(setFilterByPrice({ id, value }))
  }

  const onFilterByRating = useCallback(
    (score: number) => {
      dispatch(setFilterByRating(score))
    },
    [dispatch]
  )

  return (
    <div className='w-48'>
      <div>
        <h3 className='font-bold'>Price</h3>
        {FILTERS_BY_PRICE.map(({ id, label }) => (
          <RadioBtn
            key={id}
            id={id}
            label={label}
            name='product-filter'
            checked={byPrice.id === id}
            onChange={onFilterByPrice}
          />
        ))}
      </div>
      <div className='divider' />
      <h3 className='font-bold'>Customer Reviews</h3>
      {[4, 3, 2, 1].map((rating) => (
        <div className='flex' key={rating}>
          <Rating
            score={rating}
            size={byRating === rating ? 'md' : 'sm'}
            onClick={onFilterByRating}
          />
          <span>& Up</span>
        </div>
      ))}
    </div>
  )
}
