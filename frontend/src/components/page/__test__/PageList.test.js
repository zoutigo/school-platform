import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor } from 'test-utils'
import useFetch from '../../hooks/useFetch'
import PageList from '../PageList'

jest.mock('../../elements/reactpage/PageScreen', () => ({
  __esModule: true,
  default: ({ content }) => <div>{content}</div>,
}))
jest.mock('../../elements/AlertMessage', () => ({
  __esModule: true,
  default: ({ message }) => <div>{message}</div>,
}))

jest.mock('../../hooks/useFetch', () =>
  jest.fn(() => ({
    useFetch: jest.fn(),
  }))
)
const setPage = jest.fn()

describe('PageList', () => {
  const pageParams = {
    alias: 'fake',
    pageName: 'fake',
    queryKey: ['fake'],
    queryParams: 'fake',
    isAllowedToChange: false,
    type: 'page',
    initialFormState: false,
  }

  it('should render without crashing for type page', () => {
    useFetch.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: null,
    }))
    render(<PageList pageParams={pageParams} setPage={setPage} />)
    expect(screen.getByTestId('page-list')).toBeInTheDocument()
  })

  it('should render progress circular when loading', () => {
    useFetch.mockImplementation(() => ({
      isLoading: true,
      isError: false,
      data: null,
    }))
    render(<PageList pageParams={pageParams} setPage={setPage} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
  it('should render AlertMessage  when error', () => {
    useFetch.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      data: null,
      errorMessage: 'fetching error',
    }))
    render(<PageList pageParams={pageParams} setPage={setPage} />)
    expect(screen.getByText(/fetching error/i)).toBeInTheDocument()
  })
  it('should render PageScreen  fetch success', () => {
    useFetch.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: [
        { id: 1, content: 'page-1' },
        { id: 2, content: 'page-2' },
      ],
      errorMessage: null,
    }))
    render(<PageList pageParams={pageParams} setPage={setPage} />)
    expect(screen.getByText('page-1')).toBeInTheDocument()
  })
})
