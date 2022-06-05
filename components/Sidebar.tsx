import { Filters } from 'features/filters/Filters'
import React from 'react'
import { ChildrenOnlyProps } from 'types/propType'
import { Navbar } from './Navbar'

export const Sidebar = ({ children }: ChildrenOnlyProps) => {
  return (
    <div className='drawer drawer-mobile'>
      <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col overflow-y-auto'>
        <Navbar />
        {children}
      </div>
      <div className='drawer-side'>
        <label htmlFor='my-drawer-3' className='drawer-overlay'></label>
        <Filters />
      </div>
    </div>
  )
}
