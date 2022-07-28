import { Filters } from 'features/filters/Filters'
import React from 'react'
import { ChildrenOnlyProps } from 'types/propType'
import { Navbar } from './Navbar'

export const Sidebar = ({ children }: ChildrenOnlyProps) => {
  return (
    <div className='drawer drawer-mobile'>
      <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col justify-center overflow-y-auto'>
        <Navbar />
        {children}
      </div>
      <div className='drawer-side'>
        <label htmlFor='my-drawer-3' className='drawer-overlay'></label>
        <div className='w-48 px-4 flex py-10 overflow-hidden bg-base-100'>
          <Filters />
        </div>
      </div>
    </div>
  )
}
