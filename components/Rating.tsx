import React from 'react'

type Props = {
  score: number
  count: number
}

const stars = [1, 2, 3, 4, 5]

const _Rating = ({ score, count }: Props) => {
  const roundScore = Math.round(score)
  return (
    <div className='flex items-center'>
      <div className='rating'>
        {stars.map((_, i) => (
          <input
            key={i}
            type='radio'
            name={`${score}`}
            defaultChecked={roundScore === i + 1}
            disabled
            className='mask mask-star-2 bg-orange-400'
          />
        ))}
      </div>
      <div className='stat-desc ml-2'>({count})</div>
    </div>
  )
}

export const Rating = React.memo(_Rating)
