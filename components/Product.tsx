import { Product as ProductType } from 'types/product'
import Image from 'next/image'
import React from 'react'
import { Rating } from './Rating'

type Props = ProductType & {}

//Shared style
const containerStyle = 'md:h-[680px]'
const imgStyle = 'pt-[80%]'

export const ProductSkeleton = () => (
  <div
    className={`card p-4 bg-white rounded-lg overflow-hidden shadow  w-96 hover:shadow-md rounded-lg ${containerStyle}`}>
    <div className='animate-pulse flex flex-col'>
      <div className={`rounded w-full bg-gray-200 ${imgStyle} `}></div>

      <div className='flex flex-col mt-5'>
        <div className='w-full h-12 bg-gray-200 rounded'></div>
      </div>

      <div className='flex flex-col mt-5'>
        <div className='mt-2 w-10/12 h-3 bg-gray-200 rounded'></div>
        <div className='mt-2 w-8/12 h-3 bg-gray-200 rounded'></div>
        <div className='mt-2 w-8/12 h-3 bg-gray-200 rounded'></div>
      </div>
      <div className='grid grid-cols-2 mt-5 gap-x-2 gap-y-1'>
        <div className='mt-2 w-full h-3 bg-gray-200 rounded'></div>
        <div className='mt-2 w-full h-3 bg-gray-200 rounded'></div>
        <div className='mt-2 w-full h-3 bg-gray-200 rounded'></div>
        <div className='mt-2 w-full h-3 bg-gray-200 rounded'></div>
      </div>

      <div className='flex items-center mt-6  justify-end'>
        <div className='btn border-0 bg-gray-400 w-20'></div>
      </div>
    </div>
  </div>
)

export const Product = ({
  title,
  description,
  image,
  price,
  rating,
}: Props) => {
  return (
    <div className={`card w-96 bg-base-100 shadow-xl ${containerStyle}`}>
      <figure className={`relative m-auto w-[70%] ${imgStyle}`}>
        <Image src={image} alt={title} layout='fill' priority />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p className='h-24 my-2 text-sm overflow-auto'>{description}</p>
        <div className='my-3'>
          <Rating score={rating.rate} count={rating.count} />
        </div>
        <div className='card-actions items-end'>
          <div className='stat-value text-2xl'>${price}</div>

          <button className='btn btn-primary ml-auto'>Add</button>
        </div>
      </div>
    </div>
  )
}
