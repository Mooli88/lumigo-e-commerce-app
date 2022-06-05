import { useAppDispatch, useAppSelector } from 'app/store'
import { RadioBtn } from 'components/RadioBtn'
import React from 'react'
import { Filter } from 'types/filter'
import { selectFilterSlice, setFilterByPrice } from './filterSlice'

interface FilterByPrice extends Filter {
  label: string
}

export const FILTERS_BY_PRICE: FilterByPrice[] = [
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
  const { byPrice } = filterSlice

  const onFilterChange = ({
    target: { id },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = FILTERS_BY_PRICE_INDEXED[id]
    dispatch(setFilterByPrice({ id, value }))
  }

  return (
    <div>
      {FILTERS_BY_PRICE.map(({ id, label }) => (
        <RadioBtn
          key={id}
          id={id}
          label={label}
          name='product-filter'
          checked={byPrice.id === id}
          onChange={onFilterChange}
        />
      ))}
    </div>
  )
}
