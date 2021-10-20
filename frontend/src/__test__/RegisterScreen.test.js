/* eslint-disable react/prop-types */
/* eslint-disable prefer-promise-reject-errors */
import React from 'react'
// eslint-disable-next-line import/no-unresolved
import { render, screen, cleanup, fireEvent, waitFor } from 'test-utils'
import RegisterScreen from '../screens/RegisterScreen'

import useRegister from '../components/hooks/useRegister'

jest.mock('../components/elements/LazyMessage', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}))

const mockedError = jest.fn((err) => err.message)
jest.mock('../utils/error', () => jest.fn(() => mockedError()))

const mockEnqueue = jest.fn()
const mockClose = jest.fn()

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => ({
    enqueueSnackbar: mockEnqueue,
    closeSnackbar: mockClose,
  }),
}))

jest.mock('../components/hooks/useRegister', () =>
  jest.fn(() => ({
    useRegister: jest.fn(),
  }))
)

const mutateAsync = jest.fn()

describe('RegisterScreen', () => {
  describe('rendering whithout bug', () => {
    afterEach(() => cleanup())
    beforeEach(() => {
      useRegister.mockImplementation(() => ({
        mutateAsync,
      }))
      render(<RegisterScreen />)
    })
    it('should render without crashing', () => {
      expect(screen.getByRole('presentation')).toBeInTheDocument()
    })
    it('should show title', () => {
      expect(
        screen.getByText(/Inscription au site de l'école/i)
      ).toBeInTheDocument()
    })
    it('should show email input', () => {
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })
    it('should show password input', () => {
      expect(
        screen.getByPlaceholderText(/Entrez votre mot de pass/i)
      ).toBeInTheDocument()
    })
    it('should show passwordconfirm input', () => {
      expect(
        screen.getByPlaceholderText(/Confirmez le mot de pass/i)
      ).toBeInTheDocument()
    })
    it('should show button', () => {
      expect(
        screen.getByRole('button', { name: /Je m'inscris/i })
      ).toBeInTheDocument()
    })
    it('should show bottom navlink', () => {
      const loginLink = screen.getByRole('link', { name: /Connectez vous/i })

      expect(loginLink).toBeInTheDocument()
      expect(loginLink).toHaveAttribute('href', '/private/identification/login')
    })
  })
  describe('email input fonctionality', () => {
    afterEach(() => cleanup())
    beforeEach(() => {
      useRegister.mockImplementation(() => ({
        mutateAsync,
      }))
      render(<RegisterScreen />)
    })
    it('should be able to type in email input', async () => {
      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, { target: { value: 'abcd' } })

      await waitFor(() => {
        expect(emailInput.value).toBe('abcd')
      })
    })

    it('should show helpertext for bad email format', async () => {
      const emailInput = screen.getByPlaceholderText(/Entrez votre email/i)
      fireEvent.change(emailInput, { target: { value: 'abcd' } })

      await waitFor(async () => {
        expect(
          screen.getByText(/ce format mail n'est pas valide/i)
        ).toBeVisible()
      })
    })
  })

  describe('password input fonctionality', () => {
    afterEach(() => cleanup())
    beforeEach(() => {
      useRegister.mockImplementation(() => ({
        mutateAsync,
      }))
      render(<RegisterScreen />)
    })
    it('should be able to type in password input', async () => {
      const passwordInput = screen.getByPlaceholderText(
        /Entrez votre mot de pass/i
      )
      fireEvent.change(passwordInput, { target: { value: 'abcd' } })

      await waitFor(() => {
        expect(passwordInput.value).toBe('abcd')
      })
    })

    it('should show helper text for invalid password', async () => {
      const passwordInput = screen.getByPlaceholderText(
        /Entrez votre mot de pass/i
      )
      fireEvent.change(passwordInput, { target: { value: 'abcd' } })

      await waitFor(() => {
        expect(
          screen.getByText(/le mot de pass doit avoir au moins 8 caractères/i)
        ).toBeVisible()
      })
    })
    it('should show helper text for password not matching pattern', async () => {
      const passwordInput = screen.getByPlaceholderText(
        /Entrez votre mot de pass/i
      )
      fireEvent.change(passwordInput, { target: { value: '123456789' } })

      await waitFor(() => {
        expect(
          screen.getByText(
            /mot de pass invalide: 8 caractères au minimum dont 1 majuscule, 1 minuscule , 1 chiffre/i
          )
        ).toBeVisible()
      })
    })
  })

  describe('passwordConfirm input fonctionality', () => {
    afterEach(() => cleanup())
    beforeEach(() => {
      useRegister.mockImplementation(() => ({
        mutateAsync,
      }))
      render(<RegisterScreen />)
    })
    it('should be able to type in passwordConfirm input', async () => {
      const passwordConfirmInput = screen.getByPlaceholderText(
        /Confirmez le mot de pass/i
      )
      fireEvent.change(passwordConfirmInput, { target: { value: 'abcd' } })

      await waitFor(() => {
        expect(passwordConfirmInput.value).toBe('abcd')
      })
    })

    it('should show helper text for invalid passwordConfirm', async () => {
      const passwordInput = screen.getByPlaceholderText(
        /Entrez votre mot de pass/i
      )
      const passwordConfirmInput = screen.getByPlaceholderText(
        /Confirmez le mot de pass/i
      )

      await waitFor(() => {
        fireEvent.change(passwordInput, { target: { value: 'Zambrotta23' } })
        fireEvent.change(passwordConfirmInput, {
          target: { value: 'Zambrotta24' },
        })
      })

      await waitFor(() => {
        expect(
          screen.getByText(/les deux mots de pass doivent etre identiques/i)
        ).toBeVisible()
      })
    })
  })
  describe('button behaviour', () => {
    afterEach(() => cleanup())
    beforeEach(() => {
      useRegister.mockImplementation(() => ({
        mutateAsync,
      }))
      render(<RegisterScreen />)
    })
    afterEach(() => {
      cleanup()
    })
    it('should be disabled when form is not filled', () => {
      const submitButton = screen.getByRole('button', { name: /Je m'inscris/i })
      expect(submitButton).toHaveClass('Mui-disabled')
    })
    it('should be disabled when email is not valid', async () => {
      const emailElement = screen.getByPlaceholderText(/Entrez votre email/i)

      fireEvent.change(emailElement, { target: { value: 'hello' } })

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /Je m'inscris/i })
        ).toHaveClass('Mui-disabled')
      })
    })
    it('should be disabled when password is not valid', async () => {
      const passwordInput = screen.getByPlaceholderText(
        /Entrez votre mot de pass/i
      )

      fireEvent.change(passwordInput, { target: { value: 'abcd' } })

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /Je m'inscris/i })
        ).toHaveClass('Mui-disabled')
      })
    })
    it('should be disabled when passwordConfirm is not valid', async () => {
      const passwordInput = screen.getByPlaceholderText(
        /Entrez votre mot de pass/i
      )
      const passwordConfirmInput = screen.getByPlaceholderText(
        /Confirmez le mot de pass/i
      )

      await waitFor(() => {
        fireEvent.change(passwordInput, { target: { value: 'Zambrotta23' } })
        fireEvent.change(passwordConfirmInput, {
          target: { value: 'Zambrotta24' },
        })
      })
      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /Je m'inscris/i })
        ).toHaveClass('Mui-disabled')
      })
    })
    it('should not be disabled when form is valid', async () => {
      const emailInput = screen.getByPlaceholderText(/Entrez votre email/i)

      const passwordInput = screen.getByPlaceholderText(
        /Entrez votre mot de pass/i
      )
      const passwordConfirmInput = screen.getByPlaceholderText(
        /Confirmez le mot de pass/i
      )

      await waitFor(() => {
        fireEvent.change(emailInput, {
          target: { value: 'zambrotta@yahoo.fr' },
        })
        fireEvent.change(passwordInput, { target: { value: 'Zambrotta23' } })
        fireEvent.change(passwordConfirmInput, {
          target: { value: 'Zambrotta23' },
        })
      })

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /Je m'inscris/i })
        ).not.toHaveClass('Mui-disabled')
      })
    })
  })
  describe('onsubmit', () => {
    afterEach(() => cleanup())
    it.skip('should be able to catch server error and notify it', async () => {
      mutateAsync.mockImplementation(() =>
        Promise.reject({ message: 'une erreur est survenue' })
      )
      useRegister.mockImplementation(() => ({
        mutateAsync,
      }))
      mockEnqueue.mockReturnValue(mockedError())

      render(<RegisterScreen />)

      const emailInput = screen.getByPlaceholderText(/Entrez votre email/i)
      const passwordInput = screen.getByPlaceholderText(
        /Entrez votre mot de pass/i
      )
      const passwordConfirmInput = screen.getByPlaceholderText(
        /Confirmez le mot de pass/i
      )

      await waitFor(() => {
        fireEvent.change(emailInput, {
          target: { value: 'zambrotta@yahoo.fr' },
        })
        fireEvent.change(passwordInput, { target: { value: 'Zambrotta23' } })
        fireEvent.change(passwordConfirmInput, {
          target: { value: 'Zambrotta23' },
        })
        fireEvent.submit(screen.getByRole('button', { name: /Je m'inscris/i }))
      })

      await waitFor(() => {
        expect(mockClose).toHaveBeenCalled()
        expect(mutateAsync).toHaveBeenCalledTimes(1)
        expect(mutateAsync).toHaveBeenCalledWith({
          email: 'zambrotta@yahoo.fr',
          password: 'Zambrotta23',
          passwordConfirm: 'Zambrotta23',
        })
        expect(mockedError).toHaveBeenCalled()
        expect(mockEnqueue).toHaveBeenCalledTimes(1)
      })
    })
    it('should be to show lazy message when success', async () => {
      const response = {
        status: 201,
        message: 'creation de compte reussie',
      }

      const mockResponse = jest.fn().mockReturnValue(response)
      mutateAsync.mockImplementation(() => Promise.resolve(mockResponse()))
      useRegister.mockImplementation(() => ({
        mutateAsync,
      }))

      render(<RegisterScreen />)

      const emailInput = screen.getByPlaceholderText(/Entrez votre email/i)
      const passwordInput = screen.getByPlaceholderText(
        /Entrez votre mot de pass/i
      )
      const passwordConfirmInput = screen.getByPlaceholderText(
        /Confirmez le mot de pass/i
      )
      await waitFor(() => {
        fireEvent.change(emailInput, {
          target: { value: 'zambrotta@yahoo.fr' },
        })
        fireEvent.change(passwordInput, { target: { value: 'Zambrotta23' } })
        fireEvent.change(passwordConfirmInput, {
          target: { value: 'Zambrotta23' },
        })
        fireEvent.submit(screen.getByRole('button', { name: /Je m'inscris/i }))
      })

      await waitFor(() => {
        expect(mockResponse).toHaveBeenCalledTimes(1)
        expect(
          screen.getByTestId('register-success-message')
        ).toBeInTheDocument()
      })
    })
  })
  describe('bottom links', () => {
    beforeEach(() => {
      useRegister.mockImplementation(() => ({
        mutateAsync,
      }))
      render(<RegisterScreen />)
    })
    it('should have attribute href /private/identification/login', async () => {
      const loginLink = screen.getByRole('link', { name: /Connectez vous/i })
      expect(loginLink).toHaveAttribute('href', '/private/identification/login')
    })
  })
  describe('route params message with notistack', () => {
    it.todo('should show route params message in lazy message')
  })
})
