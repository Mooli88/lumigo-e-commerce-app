import { useAppDispatch, useAppSelector } from 'app/store'
import { Searchbox } from 'components/Searchbox'
import React from 'react'
import { selectFilterSlice, setFilterByName } from './filterSlice'

export const Search = () => {
  const { byName: searchTermValue } = useAppSelector(selectFilterSlice)
  const dispatch = useAppDispatch()
  return (
    <Searchbox
      defaultValue={searchTermValue}
      onChange={(value) => dispatch(setFilterByName(value))}
    />
  )
}
