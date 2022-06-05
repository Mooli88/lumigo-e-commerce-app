import React from 'react'

type Props = {
  name: string
  label: string
  value?: string
  id?: string
  checked?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RadioBtn = ({ label, ...props }: Props) => (
  <div className='form-control'>
    <label className='label cursor-pointer'>
      <span className='label-text'>{label}</span>
      <input
        type='radio'
        className='radio checked:bg-secondary-focus'
        {...props}
      />
    </label>
  </div>
)
