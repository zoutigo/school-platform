import React from 'react'
// import { act } from 'react-dom/test-utils'
import selectEvent from 'react-select-event'
import { render, screen, cleanup, fireEvent, waitFor, act } from 'test-utils'
import useFetch from '../../../../../hooks/useFetch'
import MembreForm from '../MembreForm'

const mockedError = jest.fn((err) => err.message)
jest.mock('../../../../../../utils/error', () => jest.fn(() => mockedError()))

const mockEnqueue = jest.fn()
const mockClose = jest.fn()

jest.mock('../../../../../hooks/useFetch', () =>
  jest.fn(() => ({
    useFetch: jest.fn(),
  }))
)

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => ({
    enqueueSnackbar: mockEnqueue,
    closeSnackbar: mockClose,
  }),
}))

const user = {
  id: 1,
  roles: [],
}
const queryKey = ['test']
const setShowMembreForm = jest.fn()

const props = {
  user,
  setShowMembreForm,
  queryKey,
}
describe('MembreForm', () => {
  afterEach(() => {
    cleanup()
  })
  it('should render without bug', async () => {
    render(<MembreForm {...props} />)

    await waitFor(() => {
      expect(screen.getByTestId('membre-form')).toBeInTheDocument()
    })
  })

  it('should show error message if server error on fetching role list', async () => {
    useFetch.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      data: null,
      errorMessage: 'une erreur est survenue',
    }))
    render(<MembreForm {...props} />)
    await waitFor(() => {
      expect(screen.getByText(/une erreur est survenue/i)).toBeInTheDocument()
    })
  })
  it('should show circular progress when loading', async () => {
    useFetch.mockImplementation(() => ({
      isLoading: true,
      isError: false,
      data: null,
      errorMessage: null,
    }))
    render(<MembreForm {...props} />)

    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })

  it('should show the select if fetching roles is success', async () => {
    useFetch.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: [
        {
          id: 123,
          name: 'moyenne section',
          entity: { name: 'ms' },
        },
      ],
      errorMessage: null,
    }))
    render(<MembreForm {...props} />)
    await waitFor(() => {
      expect(screen.getByTestId('membre-form')).toHaveFormValues({
        roles: '',
      })
      expect(
        screen.getByText(/Choisir un ou plusieurs roles/i)
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Je valide la modification' })
      ).toBeInTheDocument()
    })
  })
  it('should eat mangoes', async () => {
    useFetch.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: [
        {
          id: 123,
          name: 'moyenne',
          entity: { name: 'ms' },
        },
        {
          id: 124,
          name: 'petite',
          entity: { name: 'ps' },
        },
      ],
      errorMessage: null,
    }))
    render(<MembreForm {...props} />)

    await selectEvent.select(
      screen.getByText(/Choisir un ou plusieurs roles/i),
      ['moyenne-ms', 'petite-ps']
    )

    await waitFor(() => {
      expect(screen.getByRole('form')).not.toHaveFormValues({
        roles: ['123', '124'],
      })
    })
  })

  it.skip('should show selected options e', async () => {
    useFetch.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: [
        {
          id: 123,
          name: 'moyenne section',
          entity: { name: 'ms' },
        },
      ],
      errorMessage: null,
    }))
    render(<MembreForm {...props} />)
    // const { getByText, getByTestId } = render(<MembreForm {...props} />)
    // await selectEvent.select(getByText(/Choisir un ou plusieurs roles/i), [
    //   'enseignant-ms',
    //   'enseignant-ps',
    // ])

    // expect(getByTestId('membre-form')).not.toHaveFormValues({
    //   food: ['roles', 'mango', 'chocolate'],
    // })
  })

  it.todo('should close snackbar after submit')
  it.todo('should call snackbar with success message if server success')
  it.todo('should close the form if server success')
  it.todo('should call snackbar with error message if server error')
})
