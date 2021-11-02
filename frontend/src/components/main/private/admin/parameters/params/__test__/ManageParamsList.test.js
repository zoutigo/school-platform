import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor, act } from 'test-utils'
import ManageParamsList from '../ManageParamsList'
import * as api from '../../../../../../../utils/api'
import useFetch from '../../../../../../hooks/useFetch'

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

describe('ManageParamsList', () => {
  it('should render without crashing', () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      errorMessage: '',
    })
    render(<ManageParamsList {...props} />)
    expect(screen.getByTestId('parametres-list-screen')).toBeInTheDocument()
  })
  it('should show error message if fetch fails', () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      errorMessage: 'une erreur est survenue',
    })
    render(<ManageParamsList {...props} />)
    expect(screen.getByText(/une erreur est survenue/i)).toBeInTheDocument()
  })
  it('should show circular progress when loading', () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      errorMessage: '',
    })
    render(<ManageParamsList {...props} />)
    expect(screen.getByText(/circular progress/i)).toBeInTheDocument()
  })
  it('should show parametres-list-container', () => {
    useFetch.mockReturnValue({
      data: data,
      isLoading: false,
      isError: false,
      errorMessage: '',
    })
    render(<ManageParamsList {...props} />)
    expect(screen.getByTestId('parametres-list-container')).toBeInTheDocument()
  })
  it('should show each data', () => {
    useFetch.mockReturnValue({
      data: data,
      isLoading: false,
      isError: false,
      errorMessage: '',
    })
    render(<ManageParamsList {...props} />)
    expect(
      screen.getByRole('heading', { name: /Indicateurs/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Adresse de l'école/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Partenaires/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Definitions/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Mot du directeur/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Rue')).toBeInTheDocument()
    expect(screen.getByText(/route de Cremieu/i)).toBeInTheDocument()
    expect(screen.getByText(/Numéro/i)).toBeInTheDocument()
    expect(screen.getByText(/144B/i)).toBeInTheDocument()
    expect(screen.getByText(/Code Postal/i)).toBeInTheDocument()
    expect(screen.getByText(/38230/i)).toBeInTheDocument()
  })
})
