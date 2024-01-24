import { useAppDispatch, useAppSelector } from 'app/store'
import { Paginator } from 'components/Paginator'
import { Product, ProductSkeleton } from 'components/Product'
import { addToCart } from 'features/Cart/cartSlice'
import { selectFilteredProducts } from 'features/filters/filterSlice'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Product as ProductType } from 'types/product'
import { Props } from 'types/propType'
import { genListFromNum } from 'utils'
import {
  MAX_ITEMS_PER_PAGE,
  fetchProducts,
  populateProducts,
  selectProductCount,
  selectProductSlice,
} from './productSlice'

type ProductsProps = Props<{ products: ProductType[] }>

const itemsPlaceholder = genListFromNum(6, (i) => ({ id: i }))

export const Products = ({ products }: ProductsProps) => {
  const productsSlice = useAppSelector(selectProductSlice)
  const productItems = useSelector(selectFilteredProducts)
  const productCount = useAppSelector(selectProductCount)
  const dispatch = useAppDispatch()
  const { loading } = productsSlice

  useEffect(() => {
    dispatch(populateProducts(products))
  }, [dispatch, products])

  const handlePageChange = useCallback(
    (page: number) => {
      const limit = page * MAX_ITEMS_PER_PAGE

      dispatch(fetchProducts(limit))
    },
    [dispatch]
  )

  const isLoading = loading === 'pending'
  const listToRender = isLoading ? itemsPlaceholder : productItems

  //NOTE: Demo purposes only. Work when fetching all products
  const totalPages =
    productCount > MAX_ITEMS_PER_PAGE
      ? Math.ceil(productCount) / MAX_ITEMS_PER_PAGE
      : 0

  return (
    <div className='flex flex-col overflow-y-auto justify-between w-full'>
      {listToRender.length === 0 ? (
        <h1 className='text-4xl m-auto'>No product found</h1>
      ) : null}
      <div className='flex flex-wrap justify-center'>
        {listToRender.map((props) => (
          <div className='p-6' key={props.id}>
            {loading === 'pending' ? (
              <ProductSkeleton key={props.id} />
            ) : (
              <Product
                {...(props as ProductType)}
                onAddToCart={() => dispatch(addToCart(props as ProductType))}
              />
            )}
          </div>
        ))}
      </div>
      <div className='mx-auto'>
        <Paginator
          totalPages={4 ?? totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
