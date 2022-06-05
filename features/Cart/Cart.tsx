import { useAppDispatch, useAppSelector } from 'app/store'
import Image from 'next/image'
import React from 'react'
import { Product } from 'types/product'
import { ChildrenOnlyProps } from 'types/propType'
import { removeItem, selectCartItems } from './cartSlice'

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

export const Cart = (props: Props) => {
  const dispatch = useAppDispatch()
  const cartSlice = useAppSelector(selectCartItems)
  return (
    <div className='card h-full w-1/3 max-w-md min-w-[480px] bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>Cart</h2>
        <div>
          <CartItems>
            {cartSlice.map(({ quantity, ...product }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantity}
                onRemove={(id) => dispatch(removeItem({ id }))}
              />
            ))}
          </CartItems>
        </div>
        <p>Total</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Checkout</button>
        </div>
      </div>
    </div>
  )
}
