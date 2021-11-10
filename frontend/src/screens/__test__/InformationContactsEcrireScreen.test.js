import React from 'react'
import selectEvent from 'react-select-event'
import { render, screen, cleanup, fireEvent, waitFor, act } from 'test-utils'
import userEvent from '@testing-library/user-event'
import useFetch from '../../components/hooks/useFetch'
import useMutate from '../../components/hooks/useMutate'
import useRigths from '../../components/hooks/useRigths'
import InformationContactsEcrireScreen from '../InformationContactsEcrireScreen'

const mockEnqueue = jest.fn()
const mockClose = jest.fn()
const mockState = jest.fn()

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => ({
    enqueueSnackbar: mockEnqueue,
    closeSnackbar: mockClose,
  }),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: mockState(),
  }),
}))

const mutateAsync = jest.fn()
jest.mock('../../components/hooks/useMutate', () =>
  jest.fn(() => ({
    useMutate: jest.fn(),
  }))
)
jest.mock('../../components/hooks/useFetch', () =>
  jest.fn(() => ({
    useFetch: jest.fn(),
  }))
)
jest.mock('../../components/hooks/useRigths', () =>
  jest.fn(() => ({
    useRigths: jest.fn(),
  }))
)

jest.mock('../../components/elements/MutateCircularProgress', () => ({
  __esModule: true,
  default: () => <div>circular progress</div>,
}))

describe('InformationContactsEcrireScreen', () => {
  describe('render without bug', () => {
    beforeEach(() => {
      useMutate.mockImplementation(() => ({
        mutateAsync,
      }))
    })
    it('should render the container', () => {
      mockState.mockReturnValue({
        topic: null,
      })
      render(<InformationContactsEcrireScreen />)

      expect(
        screen.getByTestId('informations-contacts-ecrire-screen')
      ).toBeInTheDocument()
    })
    it('should show circular progress', () => {
      mockState.mockReturnValue({
        topic: null,
      })
      useFetch.mockReturnValue({
        isLoading: true,
        isError: false,
        data: null,
        errorMessage: '',
      })
      render(<InformationContactsEcrireScreen />)
      expect(screen.getByText(/circular progress/i)).toBeInTheDocument()
    })
    it('should show lazy message', () => {
      mockState.mockReturnValue({
        topic: null,
      })
      useFetch.mockReturnValue({
        isLoading: false,
        isError: false,
        data: null,
        errorMessage: '',
      })
      useRigths.mockReturnValue({
        userLevel: false,
      })
      render(<InformationContactsEcrireScreen />)
      expect(
        screen.getByText(
          /Pour suggérer des des améliorations ou reporter un bug/i
        )
      ).toBeInTheDocument()
    })
    it('should show the form', () => {
      mockState.mockReturnValue({
        topic: null,
      })
      useFetch.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { TINYMCE_KEY: 'hello' },
        errorMessage: '',
      })
      useRigths.mockReturnValue({
        userLevel: true,
      })
      mutateAsync.mockReturnValue({
        mutationIsSuccessfull: false,
      })
      render(<InformationContactsEcrireScreen />)
      expect(screen.getByRole('form', { hidden: true })).toBeInTheDocument()
    })
  })
  describe('topic select fonctionality', () => {
    beforeEach(() => {
      mockState.mockReturnValue({
        topic: null,
      })
      useFetch.mockReturnValue({
        isLoading: false,
        isError: false,
        data: { TINYMCE_KEY: 'hello' },
        errorMessage: '',
      })
      useRigths.mockReturnValue({
        userLevel: true,
      })
      mutateAsync.mockReturnValue({
        mutationIsSuccessfull: false,
      })
      render(<InformationContactsEcrireScreen />)
    })
    it('should show the select', () => {
      expect(screen.getByTestId('select-topic')).toBeInTheDocument()
    })
    it('should allow to select', async () => {
      await waitFor(() => {
        selectEvent.openMenu(screen.getByTestId('select-topic'))
      })

      await waitFor(() => {
        expect(screen.getByText(/Reporter un bug/i)).toBeInTheDocument()
      })
    })
  })
  describe('title input fonctionality', () => {
    it.todo('should the title input')
    it.todo('should allow to type')
    it.todo('should return error if typed empty')
    it.todo('should return error length < 5')
    it.todo('should return error length > 50')
    it.todo('should not return error if clean')
  })
  describe('message input fonctionality', () => {
    it.todo('should the message input')
    it.todo('should allow to type')
    it.todo('should return error if typed empty')
    it.todo('should return error length < 20')
    it.todo('should return error length > 1000')
    it.todo('should not return error if clean')
  })
  describe('button fonctionality', () => {
    it.todo('should show button')
    it.todo('should disable boutton if dirty')
    it.todo('should disable boutton if submitting')
    it.todo('should enable button if clean')
  })
  describe('onSubmit fonctionality', () => {
    it.todo('should call closesnackbar , enqueueSnackbar on mutation failure')
    it.todo('should call closesnackbar , enqueueSnackbar on mutation succes')
  })
})
