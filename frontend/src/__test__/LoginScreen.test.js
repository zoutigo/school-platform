/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
import React from 'react'
import * as reactRedux from 'react-redux'
import 'jest-styled-components'

import user from '@testing-library/user-event'
import * as actions from '../redux/user/UserActions'
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from '../utils/tests-utils'
import useLogin from '../components/hooks/useLogin'
import LoginScreen from '../screens/LoginScreen'
import tokenDatas from '../utils/tokenDatas'

const mockDispatch = jest.fn()
const mockUseDispatch = jest.spyOn(reactRedux, 'useDispatch')

const mockSetUserInfos = jest.spyOn(actions, 'setUserInfos')
const mockSetUserToken = jest.spyOn(actions, 'setUserToken')

jest.mock('../components/hooks/useLogin', () =>
  jest.fn(() => ({
    useLogin: jest.fn(),
  }))
)

jest.mock('../constants/regex', () => ({
  passwordRegex: new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$'),
}))

const res1 = {
  status: 200,
  newToken: 'xxxxxxxx',
  newDatas: {
    firstName: 'bob',
    lastname: 'martin',
    isAdmin: true,
  },
}

const mockedError = jest.fn((err) => err.message)

const mockedResponse = jest.fn()

const mockedTokenDatas = jest.fn(() => res1)

jest.mock('../utils/error', () => jest.fn(() => mockedError))
jest.mock('../utils/tokenDatas', () =>
  jest.fn(() => ({
    tokenDatas: jest.fn(),
  }))
)

const mockEnqueue = jest.fn()
const mockClose = jest.fn()

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue,
      closeSnackbar: mockClose,
    }
  },
}))

describe('LoginScreen', () => {
  afterEach(() => {
    cleanup()
  })
  describe('rendering without bug', () => {
    const mutateAsync = jest.fn()
    beforeEach(() => {
      useLogin.mockImplementation(() => {
        return jest.fn(() => mutateAsync)
      })
    })
    afterEach(() => {
      cleanup()
    })

    it('should render without crashing', () => {
      render(<LoginScreen />)

      const loginContainer = screen.getByTestId('login-screen')
      expect(loginContainer).toBeInTheDocument()
    })
    it('should show title login', () => {
      render(<LoginScreen />)
      const loginTitleHeading = screen.getByRole('heading', { name: /login/i })
      expect(loginTitleHeading).toBeVisible()
    })
    it('should show input email', () => {
      render(<LoginScreen />)
      const emailInput = screen.getByLabelText(/email/i)
      expect(emailInput).toBeVisible()
    })
    it('should show input password', () => {
      render(<LoginScreen />)
      const passwordInput = screen.getByLabelText(/Mot de Pass/i)
      expect(passwordInput).toBeVisible()
    })
    it('should show button', () => {
      render(<LoginScreen />)
      const button = screen.getByRole('button', { name: /Je me connecte/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('disabled', '')
    })
  })
  describe('email input fonctionality', () => {
    beforeEach(() => {
      useLogin.mockImplementation(() => ({}))
    })
    afterEach(() => {
      cleanup()
    })
    it('should be able to type in email input', async () => {
      render(<LoginScreen />)
      const emailElement = screen.getByPlaceholderText(/Entrez votre email/i)
      fireEvent.change(emailElement, { target: { value: 'test@gmail.com' } })
      await waitFor(() => {
        expect(emailElement.value).toBe('test@gmail.com')
      })
    })
    it('should show helper text for bad email format', async () => {
      render(<LoginScreen />)
      const emailElement = screen.getByPlaceholderText(/Entrez votre email/i)

      await user.type(emailElement, 'hello')

      const helperTextElement = await screen.findByText(
        /ce format mail n'est pas valide/i
      )

      await waitFor(() => {
        expect(helperTextElement).toBeInTheDocument()
      })
    })
  })
  describe('password input fonctionality', () => {
    beforeEach(() => {
      useLogin.mockImplementation(() => ({}))
    })
    afterEach(() => {
      cleanup()
    })
    it('should be able to type in password input', async () => {
      render(<LoginScreen />)
      const passwordElement = screen.getByPlaceholderText(
        /Entrez votre password/i
      )
      fireEvent.change(passwordElement, { target: { value: 'hello' } })
      await waitFor(() => {
        expect(passwordElement.value).toBe('hello')
      })
    })
    it('should show helper text for invalid password', async () => {
      render(<LoginScreen />)
      const passwordElement = screen.getByPlaceholderText(
        /Entrez votre password/i
      )

      fireEvent.change(passwordElement, { target: { value: '123456' } })

      const helperTextElement = await screen.findByText(
        /Mot de pass non valide/i
      )

      await waitFor(() => {
        expect(helperTextElement).toBeInTheDocument()
      })
    })
  })
  describe('button behaviour', () => {
    beforeEach(() => {
      useLogin.mockImplementation(() => ({}))
    })
    beforeEach(() => {
      render(<LoginScreen />)
    })
    afterEach(() => {
      cleanup()
    })
    it('should be disabled when form is not filled not valid', () => {
      const buttonElement = screen.getByRole('button', {
        name: /Je me connecte/i,
      })
      expect(buttonElement).toBeDisabled()
    })
    it('should be disabled when email is not valid', async () => {
      const emailElement = screen.getByPlaceholderText(/Entrez votre email/i)

      await user.type(emailElement, 'hello')

      const buttonElement = screen.getByRole('button', {
        name: /Je me connecte/i,
      })

      await waitFor(() => {
        expect(buttonElement).toBeDisabled()
      })
    })
    it('should be disabled when password is not valid', async () => {
      const passwordElement = screen.getByPlaceholderText(
        /Entrez votre password/i
      )

      fireEvent.change(passwordElement, { target: { value: '123456' } })
      const buttonElement = screen.getByRole('button', {
        name: /Je me connecte/i,
      })
      await waitFor(() => {
        expect(buttonElement).toBeDisabled()
      })
    })
  })

  describe('on submit', () => {
    afterEach(() => {
      cleanup()
    })
    it('should call the mutation', async () => {
      const mutateAsync = jest.fn()
      useLogin.mockImplementation(() => ({ mutateAsync }))

      render(<LoginScreen />)
      const passwordElement = screen.getByPlaceholderText(
        /Entrez votre password/i
      )
      const emailElement = screen.getByPlaceholderText(/Entrez votre email/i)

      const buttonElement = screen.getByRole('button', {
        name: /Je me connecte/i,
      })

      await waitFor(() => {
        fireEvent.change(passwordElement, { target: { value: 'Valery54' } })

        fireEvent.change(emailElement, {
          target: { value: 'test@gmail.com' },
        })

        fireEvent.submit(buttonElement)
      })

      await waitFor(() => {
        expect(mutateAsync).toHaveBeenCalledTimes(1)
        expect(mutateAsync).toHaveBeenCalledWith({
          email: 'test@gmail.com',
          password: 'Valery54',
        })
      })
    })
    it('get the error and notify it', async () => {
      const mutateAsync = jest.fn(() =>
        Promise.reject({ message: 'une erreur est survenue' })
      )
      useLogin.mockImplementation(() => ({
        mutateAsync,
      }))

      render(<LoginScreen />)
      const passwordElement = screen.getByPlaceholderText(
        /Entrez votre password/i
      )
      const emailElement = screen.getByPlaceholderText(/Entrez votre email/i)

      const buttonElement = screen.getByRole('button', {
        name: /Je me connecte/i,
      })

      await waitFor(() => {
        fireEvent.change(passwordElement, { target: { value: 'Valery54' } })

        fireEvent.change(emailElement, {
          target: { value: 'test@gmail.com' },
        })

        fireEvent.submit(buttonElement)
      })

      await waitFor(() => {
        expect(mockEnqueue).toHaveBeenCalledTimes(1)
      })
    })

    it('should call token decode when server response is success', async () => {
      mockedResponse.mockReturnValue(res1)
      const mutateAsync = jest.fn(() => Promise.resolve(mockedResponse()))
      useLogin.mockImplementation(() => ({
        mutateAsync,
      }))

      tokenDatas.mockImplementation(() => mockedTokenDatas())

      render(<LoginScreen />)
      const passwordElement = screen.getByPlaceholderText(
        /Entrez votre password/i
      )
      const emailElement = screen.getByPlaceholderText(/Entrez votre email/i)

      const buttonElement = screen.getByRole('button', {
        name: /Je me connecte/i,
      })

      await waitFor(() => {
        fireEvent.change(passwordElement, { target: { value: 'Valery54' } })

        fireEvent.change(emailElement, {
          target: { value: 'test@gmail.com' },
        })

        fireEvent.submit(buttonElement)
      })
      await waitFor(() => {
        expect(mockedResponse).toHaveBeenCalledTimes(1)
        // console.log(mockedResponse())
        expect(mockedTokenDatas).toHaveBeenCalledTimes(1)
      })
    })
    it('should dispatch user datas in redux store', async () => {
      mockSetUserInfos.mockReturnValue(res1.datas)
      mockSetUserToken.mockReturnValue(res1.token)
      mockDispatch.mockImplementationOnce(() => mockSetUserInfos())
      mockDispatch.mockImplementationOnce(() => mockSetUserToken())
      mockUseDispatch.mockReturnValue(mockDispatch())
      mockedResponse.mockReturnValue(res1)
      const mutateAsync = jest.fn(() => Promise.resolve(mockedResponse()))
      useLogin.mockImplementation(() => ({
        mutateAsync,
      }))

      tokenDatas.mockImplementation(() => mockedTokenDatas())

      render(<LoginScreen />)
      const passwordElement = screen.getByPlaceholderText(
        /Entrez votre password/i
      )
      const emailElement = screen.getByPlaceholderText(/Entrez votre email/i)

      const buttonElement = screen.getByRole('button', {
        name: /Je me connecte/i,
      })

      await waitFor(() => {
        fireEvent.change(passwordElement, { target: { value: 'Valery54' } })

        fireEvent.change(emailElement, {
          target: { value: 'test@gmail.com' },
        })

        fireEvent.submit(buttonElement)
      })
      await waitFor(() => {
        expect(mockedTokenDatas).toHaveBeenCalledTimes(1)
        expect(mockedTokenDatas).toHaveBeenCalledTimes(1)
        expect(mockUseDispatch).toHaveBeenCalledTimes(6)
        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockSetUserInfos).toHaveBeenCalledTimes(1)
        // expect(mockSetUserToken).toHaveBeenCalledTimes(1)
      })
    })
    it.todo('should call history when server response is success')
  })
  describe('links', () => {
    it.todo('should call navlink 1 time when register it is clicked')
    it.todo('should call navlink 1 time when initialisation it is clicked')
  })
})
