import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor, act } from 'test-utils'
import ManageParamsForm from '../ManageParamsForm'
import * as api from '../../../../../../../utils/api'
import useFetch from '../../../../../../hooks/useFetch'
import useMutate from '../../../../../../hooks/useMutate'

const queryKey = ['parametres']
const queryParams = `alias=initial`

const props = { queryKey, queryParams }
const data = {
  id: 1,
  addressNumber: '144B',
  addressStreet: 'route de Cremieu',
  addressZipcode: '38230',
  addressCity: 'Tignieu Jameyzieu',
  nbrStudents: 210,
  nbrTeachers: 10,
  nbrFamilies: 350,
  nbrActivities: 600,
  email: 'test@gmail.com',
  phone: '0434512390',
  secret: 'OGEPI-20890',
  schoolYearStartdate: '01/09/2019',
  schoolYearEnddate: '31/06/2020',
  managerMessage: 'hello',
  partner1Name: 'La paroisse Saint Martin',
  partner1Link: 'www.st-martin.com',
  partner2Name: 'La paroisse Saint Martin',
  partner2Link: 'www.st-martin.com',
  partner3Name: 'La paroisse Saint Martin',
  partner3Link: 'www.st-martin.com',
}

jest.mock('../../../../../../hooks/useFetch', () =>
  jest.fn(() => ({
    useFetch: jest.fn(),
  }))
)
jest.mock('../../../../../../hooks/useMutate', () =>
  jest.fn(() => ({
    useMutate: jest.fn(),
  }))
)

const mockApiFecthParametres = jest.fn()
jest
  .spyOn(api, 'apiFecthParametres')
  .mockImplementation(() => mockApiFecthParametres())

jest.mock('../../../../../../elements/AlertMessage', () => ({
  __esModule: true,
  default: ({ message, severity }) => <div>{message}</div>,
}))
jest.mock('../../../../../../elements/FetchCircularProgress', () => ({
  __esModule: true,
  default: () => <div>circular progress</div>,
}))

describe('ManageParamsForm', () => {
  describe('Form conatiner', () => {
    it('should render without crashing', () => {
      useFetch.mockReturnValue({
        data: null,
        isLoading: false,
        isError: false,
        errorMessage: '',
      })
      render(<ManageParamsForm {...props} />)
      expect(screen.getByTestId('parametres-form-screen')).toBeInTheDocument()
    })
    it('should show error message if fetch fails', () => {
      useFetch.mockReturnValue({
        data: null,
        isLoading: false,
        isError: true,
        errorMessage: 'une erreur est survenue',
      })
      render(<ManageParamsForm {...props} />)
      expect(screen.getByText(/une erreur est survenue/i)).toBeInTheDocument()
    })
    it('should show circular progress when loading', () => {
      useFetch.mockReturnValue({
        data: null,
        isLoading: true,
        isError: false,
        errorMessage: '',
      })
      render(<ManageParamsForm {...props} />)
      expect(screen.getByText(/circular progress/i)).toBeInTheDocument()
    })
    it('should show parametres-list-container', () => {
      useFetch.mockReturnValue({
        data: data,
        isLoading: false,
        isError: false,
        errorMessage: '',
      })
      render(<ManageParamsForm {...props} />)
      expect(screen.getByRole('form')).toBeInTheDocument()
    })
  })
  describe('AdressStreet input', () => {
    beforeEach(() => {
      useFetch.mockReturnValue({
        data: data,
        isLoading: false,
        isError: false,
        errorMessage: '',
      })
      render(<ManageParamsForm {...props} />)
    })

    it('should be in the document', () => {
      expect(screen.getByLabelText(/Nom de la rue/i)).toBeInTheDocument()
    })
    it('should be able to type in the input', async () => {
      fireEvent.change(screen.getByLabelText(/Nom de la rue/i), {
        target: { value: 'village du monde' },
      })
      await waitFor(() => {
        expect(screen.getByLabelText(/Nom de la rue/i)).toHaveValue(
          'village du monde'
        )
      })
    })
    it('should return error if empty', async () => {
      fireEvent.change(screen.getByLabelText(/Nom de la rue/i), {
        target: { value: '' },
      })
      await waitFor(() => {
        expect(screen.getByText(/la rue est obligatoire/i)).toBeInTheDocument()
      })
    })
    it('should return error if less than 5 characters', async () => {
      fireEvent.change(screen.getByLabelText(/Nom de la rue/i), {
        target: { value: 'tu' },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/la rue doit avoir au moins cinq caractères/i)
        ).toBeInTheDocument()
      })
    })
    it('should return error if more than 100 characters', async () => {
      fireEvent.change(screen.getByLabelText(/Nom de la rue/i), {
        target: {
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin euismod quam ut consequat. Praesent scelerisque erat nisi, quis tincidunt risus mattis vitae. Integer tincidunt maximus lacus nec fringilla. Maecenas tincidunt aliquet tincidunt. Suspendisse convallis odio id tempus mollis. Ut pellentesque tristique arcu, vel sodales lectus. Vivamus dictum, felis vel laoreet fringilla, enim lorem ultricies quam, sit amet bibendum ex dui ac ante. In condimentum ornare enim, sit amet pellentesque magna hendrerit ac. Nullam eget iaculis ipsum.Donec eu nisi sed elit convallis volutpat vitae ac libero. Quisque eu accumsan dolor, sit amet aliquam ante. Maecenas congue enim id dictum fermentum. Nulla condimentum ultricies tempor.',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/la rue doit avoir au plus cent caractères/i)
        ).toBeInTheDocument()
      })
    })
  })
  describe('AdressNumber input', () => {
    beforeEach(() => {
      useFetch.mockReturnValue({
        data: data,
        isLoading: false,
        isError: false,
        errorMessage: '',
      })
      render(<ManageParamsForm {...props} />)
    })

    it('should be in the document', () => {
      expect(screen.getByLabelText(/Numéro de la voie/i)).toBeInTheDocument()
    })
    it('should be able to type in the input', async () => {
      fireEvent.change(screen.getByLabelText(/Numéro de la voie/i), {
        target: { value: '12a' },
      })
      await waitFor(() => {
        expect(screen.getByLabelText(/Numéro de la voie/i)).toHaveValue('12a')
      })
    })
    it('should return error if empty', async () => {
      fireEvent.change(screen.getByLabelText(/Numéro de la voie/i), {
        target: { value: '' },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le numéro de la voie est obligatoire/i)
        ).toBeInTheDocument()
      })
    })

    it('should return error if more than 10 characters', async () => {
      fireEvent.change(screen.getByLabelText(/Numéro de la voie/i), {
        target: {
          value: 'Lorem ipsum dolor sit amet',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(
            /le numéro de la voie doit avoir au plus 10 caractères/i
          )
        ).toBeInTheDocument()
      })
    })
  })
  describe('addressZipcode input', () => {
    beforeEach(() => {
      useFetch.mockReturnValue({
        data: data,
        isLoading: false,
        isError: false,
        errorMessage: '',
      })
      render(<ManageParamsForm {...props} />)
    })

    it('should be in the document', () => {
      expect(screen.getByLabelText(/Code Postal/i)).toBeInTheDocument()
    })
    it('should be able to type in the input', async () => {
      fireEvent.change(screen.getByLabelText(/Code Postal/i), {
        target: { value: '12a' },
      })
      await waitFor(() => {
        expect(screen.getByLabelText(/Code Postal/i)).toHaveValue('12a')
      })
    })
    it('should return error if empty', async () => {
      fireEvent.change(screen.getByLabelText(/Code Postal/i), {
        target: { value: '' },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le code postal est obligatoire/i)
        ).toBeInTheDocument()
      })
    })

    it('should return error if caracters length is not 5', async () => {
      fireEvent.change(screen.getByLabelText(/Code Postal/i), {
        target: {
          value: 'Lorema',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le code potal doit avoir 5 chiffres/i)
        ).toBeInTheDocument()
      })
    })
  })
})
