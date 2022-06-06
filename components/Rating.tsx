import React, { useRef } from 'react'

type Props = {
  score: number
  count?: number
  size?: 'sm' | 'md' | 'lg'
  onClick?: (score: number) => void
}

const stars = [1, 2, 3, 4, 5]

const _Rating = ({ score, count, size = 'md', onClick }: Props) => {
  const nameRef = useRef(`${score}-${Math.random().toFixed(5) + score}`).current
  const roundScore = Math.round(score)
  return (
    <div className='flex items-center relative'>
      {onClick ? (
        <div
          className='absolute w-full h-full z-10 cursor-pointer'
          onClick={() => {
            onClick(score)
          }}
        />
      ) : null}
      <div className={`rating rating-${size}`}>
        {stars.map((val) => (
          <input
            key={val}
            type='radio'
            name={`${nameRef}`}
            defaultChecked={roundScore === val}
            disabled
            className='mask mask-star-2 bg-orange-400'
          />
        ))}
      </div>
      {count ? <div className='stat-desc ml-2'>({count})</div> : null}
    </div>
  )
}

export const Rating = React.memo(_Rating)
