import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor } from 'test-utils'

import useFetch from '../../../../../hooks/useFetch'
import MembresList from '../MembresList'

jest.mock('../../../../../hooks/useFetch', () =>
  jest.fn(() => ({
    useFetch: jest.fn(),
  }))
)

jest.mock('../../../../../elements/AlertMessage', () => ({
  __esModule: true,
  default: ({ message, severity }) => <div>{message}</div>,
}))

jest.mock('../Membre', () => ({
  __esModule: true,
  default: ({ membre }) => <div>{membre.lastname}</div>,
}))

jest.mock('@material-ui/core/CircularProgress', () => {
  const CircularProgress = jest.requireActual(
    '@material-ui/core/CircularProgress'
  )
  return CircularProgress
})

describe('MembresList', () => {
  it('should show AlertMessage when error', () => {
    useFetch.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      data: null,
      errorMessage: 'une erreur est survenue',
    }))
    render(<MembresList />)

    expect(screen.getByText(/une erreur est survenue/i)).toBeInTheDocument()
  })
  it('should show CircularProgress when is Loading', () => {
    useFetch.mockImplementation(() => ({
      isLoading: true,
      isError: false,
      data: null,
      errorMessage: null,
    }))
    render(<MembresList />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
  it('should show Member when success', () => {
    useFetch.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: [
        {
          id: 123,
          lastname: 'geremy',
          email: 'test@gmail.com',
        },
      ],
      errorMessage: null,
    }))
    render(<MembresList />)
    expect(screen.getByText(/geremy/i)).toBeInTheDocument()
  })
})
