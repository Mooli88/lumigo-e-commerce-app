import { Product as ProductType } from 'types/product'
import { Props } from 'types/propType'
import { Product } from 'components/Product'
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from 'app/store'
import { addProducts, selectProductCount, selectProducts } from './productSlice'

type ProductsProps = Props<{ products: ProductType[] }>

export const Products = ({ products }: ProductsProps) => {
  const productCount = useAppSelector(selectProductCount)
  const productsState = useAppSelector(selectProducts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (productCount === 0) {
      dispatch(addProducts(products))
    }
  }, [])

  return (
    <>
      {productsState.map((props) => (
        <Product key={props.id} {...props} />
      ))}
    </>
  )
}
