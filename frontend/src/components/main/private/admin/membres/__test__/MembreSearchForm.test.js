import React from 'react'
// eslint-disable-next-line import/no-unresolved
import { render, screen, cleanup, fireEvent, waitFor } from 'test-utils'
import MembreSearchForm from '../MembreSearchForm'

describe('/components/main/private/admin/membres/MembreSearchForm', () => {
  beforeEach(() => {
    render(<MembreSearchForm />)
  })
  it('should render without bug', () => {
    expect(
      screen.getByPlaceholderText(/Entrez une adresse email/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Rechercher/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Rechercher/i })).toHaveClass(
      'Mui-disabled'
    )
  })
  it('should be able to type in the input', async () => {
    const inputElement = screen.getByPlaceholderText(
      /Entrez une adresse email/i
    )
    fireEvent.change(inputElement, { target: { value: 'hello' } })

    await waitFor(() => {
      expect(inputElement.value).toBe('hello')
    })
  })
  it('should show input email errors messages', async () => {
    const inputElement = screen.getByPlaceholderText(
      /Entrez une adresse email/i
    )
    fireEvent.change(inputElement, { target: { value: 'hello' } })
    await waitFor(() => {
      expect(screen.getByText(/le format mail est incorrect/i)).toBeVisible()
    })
  })
  it('should enabled  submit button if input is valid', async () => {
    const inputElement = screen.getByPlaceholderText(
      /Entrez une adresse email/i
    )
    fireEvent.change(inputElement, { target: { value: 'test@gmail.com' } })

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Rechercher/i })
      ).not.toHaveClass('Mui-disabled')
    })
  })
  it.todo('should call setSearch on submit')
})
