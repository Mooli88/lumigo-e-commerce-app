import { Product as ProductType } from 'types/product'
import { Props } from 'types/propType'
import { Product, ProductSkeleton } from 'components/Product'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from 'app/store'
import {
  fetchProducts,
  populateProducts,
  selectProductCount,
  selectProducts,
  selectProductSlice,
} from './productSlice'
import { genListFromNum } from 'utils'
import { Paginator } from 'components/Paginator'

type ProductsProps = Props<{ products: ProductType[] }>

const itemsPlaceholder = genListFromNum(10, (i) => ({ id: i }))
const MAX_ITEMS_PER_PAGE = 5

export const Products = ({ products }: ProductsProps) => {
  const productsStore = useAppSelector(selectProductSlice)
  const productCount = useAppSelector(selectProductCount)
  const dispatch = useAppDispatch()
  const [productOfPage, setProductOfPage] = useState<any>(products)
  const { items, loading, error } = productsStore
  const currPage = useRef(0)

  useEffect(() => {
    if (productCount === 0) {
      dispatch(populateProducts(products))
    }
  }, [])

  const handlePageChange = useCallback(
    async (page: number) => {
      const limit = page * MAX_ITEMS_PER_PAGE
      const { payload } = await dispatch(fetchProducts(limit))
      setProductOfPage(payload)
    },
    [dispatch]
  )

  const listToRender = productCount > 0 ? productOfPage : itemsPlaceholder
  const totalPages =
    productCount > MAX_ITEMS_PER_PAGE
      ? Math.ceil(productCount) / MAX_ITEMS_PER_PAGE
      : 0

  return (
    <div>
      <div className='flex flex-wrap'>
        {listToRender.map((props) => (
          <div className='p-6' key={props.id}>
            {productCount === 0 || loading === 'pending' ? (
              <ProductSkeleton />
            ) : (
              <Product {...(props as ProductType)} />
            )}
          </div>
        ))}
      </div>
      <Paginator totalPages={5 ?? totalPages} onPageChange={handlePageChange} />
    </div>
  )
}
