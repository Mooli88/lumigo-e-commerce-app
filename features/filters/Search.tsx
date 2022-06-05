import { useAppDispatch } from 'app/store'
import { Searchbox } from 'components/Searchbox'
import React from 'react'
import { setFilterByName } from './filterSlice'

type Props = {}

export const Search = (props: Props) => {
  const dispatch = useAppDispatch()
  return (
    <Searchbox
      id='products'
      onChange={(value) => dispatch(setFilterByName(value))}
    />
  )
}
