import React, { useRef } from 'react'

type Props = {
  defaultValue?: string
  onChange: (value: string) => void
}

export const Searchbox = ({ defaultValue, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  const debounceOnChange = () => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current)
    }
    timeoutId.current = setTimeout(
      () => inputRef.current && onChange(inputRef.current.value),
      300
    )
  }

  return (
    <div className=' w-full max-w-sm lg:flex m-auto border rounded-lg border-gray-300'>
      <label className='searchbox mx-3' htmlFor='q'>
        <svg
          className='text-base-content pointer-events-none z-10 stroke-current opacity-60 '
          width='18'
          height='18'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
        </svg>
      </label>
      <input
        id='q'
        ref={inputRef}
        type='search'
        name='q'
        placeholder='Search…'
        autoComplete='off'
        spellCheck='false'
        aria-autocomplete='list'
        onChange={debounceOnChange}
        defaultValue={defaultValue}
        className='input w-full max-w-xs focus:outline-none'
      />
    </div>
  )
}
