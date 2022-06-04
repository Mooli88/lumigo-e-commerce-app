import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useState } from 'react'
import { genListFromNum } from 'utils'

type Props = {
  totalPages: number
  onPageChange: (page: number) => void
}

const _Paginator = ({ totalPages, onPageChange }: Props) => {
  const { pathname, query } = useRouter()
  const { page: currentPage } = query as { page: string }

  const renderPage = (index: number) => {
    const page = index + 1
    const isCurrentPage = `${page}` === currentPage ? 'btn-active' : ''
    return (
      <Link shallow href={`${pathname}?page=${page}`}>
        <a
          className={`btn ${isCurrentPage}`}
          onClick={() => onPageChange(page)}>
          {page}
        </a>
      </Link>
    )
  }

  const pages = genListFromNum(totalPages, renderPage)

  if (totalPages === 0) return null

  return <div className='btn-group'>{pages}</div>
}

export const Paginator = React.memo(_Paginator)
