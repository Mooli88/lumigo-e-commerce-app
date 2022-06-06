import { useAppDispatch, useAppSelector } from 'app/store'
import { RadioBtn } from 'components/RadioBtn'
import { Rating } from 'components/Rating'
import React, { useCallback } from 'react'
import { FilterByPrice } from 'types/filter'
import {
  selectFilterSlice,
  setFilterByPrice,
  setFilterByRating,
} from './filterSlice'

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
    <div>
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
      <div className='flex'>
        <Rating
          score={4}
          size={byRating === 4 ? 'md' : 'sm'}
          onClick={onFilterByRating}
        />
        <span>& Up</span>
      </div>
      <div className='flex'>
        <Rating
          score={3}
          size={byRating === 3 ? 'md' : 'sm'}
          onClick={onFilterByRating}
        />
        <span>& Up</span>
      </div>
      <div className='flex'>
        <Rating
          score={2}
          size={byRating === 2 ? 'md' : 'sm'}
          onClick={onFilterByRating}
        />
        <span>& Up</span>
      </div>
      <div className='flex'>
        <Rating
          score={1}
          size={byRating === 1 ? 'md' : 'sm'}
          onClick={onFilterByRating}
        />
        <span>& Up</span>
      </div>
    </div>
  )
}
