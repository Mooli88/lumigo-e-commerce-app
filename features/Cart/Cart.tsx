import { RootState, useAppDispatch, useAppSelector } from 'app/store'
import getConfig from 'next/config'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Product } from 'types/product'
import { ChildrenOnlyProps } from 'types/propType'
import { getFromLocalStorage } from 'utils'
import {
  addToCart,
  populateCart,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from './cartSlice'

const { publicRuntimeConfig } = getConfig()
const { localStorageStateKey } = publicRuntimeConfig

type Props = {}
type CartItemProps = {
  product: Pick<Product, 'id' | 'title' | 'image' | 'price'>
  quantity: number
  onRemove: (id: number) => void
}

const CartItems = ({ children }: ChildrenOnlyProps) => (
  <div className='overflow-x-auto w-full'>
    <table className='table w-full'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Qty</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
)
const CartItem = ({ product, quantity, onRemove }: CartItemProps) => (
  <tr>
    <td>
      <div className='flex items-center space-x-3'>
        <div className='avatar'>
          <div className='mask mask-squircle w-12 h-12'>
            <Image
              src={product.image}
              alt={product.title}
              width={48}
              height={48}
            />
          </div>
        </div>
        <div>
          <div
            className='font-bold truncate max-w-[100px]'
            title={product.title}>
            {product.title}
          </div>
        </div>
      </div>
    </td>
    <td>{quantity}</td>
    <td>${product.price}</td>
    <th>
      <button
        className='btn btn-ghost btn-xs'
        onClick={() => onRemove(product.id)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    </th>
  </tr>
)

export const Cart = () => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(selectCartItems)
  const cartTotal = useAppSelector(selectCartTotal)

  useEffect(() => {
    const { items } =
      getFromLocalStorage<RootState>(
        localStorageStateKey,
        ({ cart }) => cart
      ) ?? []

    dispatch(populateCart(items))
  }, [])

  return (
    <div className='card h-full w-1/3 max-w-md min-w-[480px] bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>Cart</h2>
        <div className='overflow-y-auto max-h-[50vh]'>
          <CartItems>
            {cartItems.map(({ quantity, ...product }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantity}
                onRemove={(id) => dispatch(removeFromCart({ id }))}
              />
            ))}
          </CartItems>
        </div>
        <div className='divider'></div>
        <div className='text-right mb-10'>
          <h3 className='font-bold'>Total</h3>
          <div className='text-xl my-2'>${cartTotal}</div>
        </div>
        <div className='card-actions justify-end align-end mt-auto'>
          <button className='btn btn-primary w-full'>Checkout</button>
        </div>
      </div>
    </div>
  )
}
