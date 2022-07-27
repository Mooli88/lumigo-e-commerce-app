import { Search } from 'features/filters/Search'
import React from 'react'

export const Navbar = () => {
  return (
    <div className='w-full navbar bg-transparent p-5'>
      <div className='flex-none lg:hidden'>
        <label htmlFor='my-drawer-3' className='btn btn-square btn-ghost'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-6 h-6 stroke-current'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'></path>
          </svg>
        </label>
      </div>
      <Search />
    </div>
  )
}
