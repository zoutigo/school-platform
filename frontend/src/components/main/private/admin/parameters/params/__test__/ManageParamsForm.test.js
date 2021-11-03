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
    it('should return error if not a number', async () => {
      fireEvent.change(screen.getByLabelText(/Code Postal/i), {
        target: {
          value: 'Lorem',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le code postal doit etre un nombre entier/i)
        ).toBeInTheDocument()
      })
    })
  })
  describe('AdressCity input', () => {
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
      expect(screen.getByLabelText(/Ville/i)).toBeInTheDocument()
    })
    it('should be able to type in the input', async () => {
      fireEvent.change(screen.getByLabelText(/Ville/i), {
        target: { value: 'village du monde' },
      })
      await waitFor(() => {
        expect(screen.getByLabelText(/Ville/i)).toHaveValue('village du monde')
      })
    })
    it('should return error if empty', async () => {
      fireEvent.change(screen.getByLabelText(/Ville/i), {
        target: { value: '' },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/La ville est obligatoire/i)
        ).toBeInTheDocument()
      })
    })
    it('should return error if less than 5 characters', async () => {
      fireEvent.change(screen.getByLabelText(/Ville/i), {
        target: { value: 'tu' },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/la ville doit avoir au moins cinq caractères/i)
        ).toBeInTheDocument()
      })
    })
    it('should return error if more than 20 characters', async () => {
      fireEvent.change(screen.getByLabelText(/Ville/i), {
        target: {
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin euismod quam ut consequat. Praesent scelerisque erat nisi, quis tincidunt risus mattis vitae. Integer tincidunt maximus lacus nec fringilla. Maecenas tincidunt aliquet tincidunt. Suspendisse convallis odio id tempus mollis. Ut pellentesque tristique arcu, vel sodales lectus. Vivamus dictum, felis vel laoreet fringilla, enim lorem ultricies quam, sit amet bibendum ex dui ac ante. In condimentum ornare enim, sit amet pellentesque magna hendrerit ac. Nullam eget iaculis ipsum.Donec eu nisi sed elit convallis volutpat vitae ac libero. Quisque eu accumsan dolor, sit amet aliquam ante. Maecenas congue enim id dictum fermentum. Nulla condimentum ultricies tempor.',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/la rue doit avoir au plus 20 caractères/i)
        ).toBeInTheDocument()
      })
    })
  })
  describe('Email input', () => {
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
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    })
    it('should be able to type in the input', async () => {
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'village du monde' },
      })
      await waitFor(() => {
        expect(screen.getByLabelText(/Email/i)).toHaveValue('village du monde')
      })
    })
    it('should return error if empty', async () => {
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: '' },
      })
      await waitFor(() => {
        expect(screen.getByText(/La mail est obligatoire/i)).toBeInTheDocument()
      })
    })

    it('should return error if more than 50 characters', async () => {
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: {
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin euismod quam ut consequat. Praesent scelerisque erat nisi, quis tincidunt risus mattis vitae. Integer tincidunt maximus lacus nec fringilla. Maecenas tincidunt aliquet tincidunt. Suspendisse convallis odio id tempus mollis. Ut pellentesque tristique arcu, vel sodales lectus. Vivamus dictum, felis vel laoreet fringilla, enim lorem ultricies quam, sit amet bibendum ex dui ac ante. In condimentum ornare enim, sit amet pellentesque magna hendrerit ac. Nullam eget iaculis ipsum.Donec eu nisi sed elit convallis volutpat vitae ac libero. Quisque eu accumsan dolor, sit amet aliquam ante. Maecenas congue enim id dictum fermentum. Nulla condimentum ultricies tempor.',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le mail doit avoir au plus 50 caractères/i)
        ).toBeInTheDocument()
      })
    })
    it('should return error if wrong email format', async () => {
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: {
          value: 'Lorem ipsum',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le format mail est incorrect/i)
        ).toBeInTheDocument()
      })
    })
  })
  describe('Phone input', () => {
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
      expect(screen.getByLabelText(/Telephone/i)).toBeInTheDocument()
    })
    it('should be able to type in the input', async () => {
      fireEvent.change(screen.getByLabelText(/Telephone/i), {
        target: { value: 'village du monde' },
      })
      await waitFor(() => {
        expect(screen.getByLabelText(/Telephone/i)).toHaveValue(
          'village du monde'
        )
      })
    })
    it('should return error if empty', async () => {
      fireEvent.change(screen.getByLabelText(/Telephone/i), {
        target: { value: '' },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/Le telephone est obligatoire/i)
        ).toBeInTheDocument()
      })
    })

    it('should return error if wrong email format', async () => {
      fireEvent.change(screen.getByLabelText(/Telephone/i), {
        target: {
          value: 'Lorem',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le format de telephone saisi n'est pas valide/i)
        ).toBeInTheDocument()
      })
    })
  })
  describe('Secret input', () => {
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
      expect(
        screen.getByLabelText(/Mot de pass de l'école/i)
      ).toBeInTheDocument()
    })
    it('should be able to type in the input', async () => {
      fireEvent.change(screen.getByLabelText(/Mot de pass de l'école/i), {
        target: { value: 'village du monde' },
      })
      await waitFor(() => {
        expect(screen.getByLabelText(/Mot de pass de l'école/i)).toHaveValue(
          'village du monde'
        )
      })
    })
    it('should return error if empty', async () => {
      fireEvent.change(screen.getByLabelText(/Mot de pass de l'école/i), {
        target: { value: '' },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/Le mot de pass de l'école est obligatoire/i)
        ).toBeInTheDocument()
      })
    })

    it('should return error if more than 20 characters', async () => {
      fireEvent.change(screen.getByLabelText(/Mot de pass de l'école/i), {
        target: {
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin euismod quam ut consequat. Praesent scelerisque erat nisi, quis tincidunt risus mattis vitae. Integer tincidunt maximus lacus nec fringilla. Maecenas tincidunt aliquet tincidunt. Suspendisse convallis odio id tempus mollis. Ut pellentesque tristique arcu, vel sodales lectus. Vivamus dictum, felis vel laoreet fringilla, enim lorem ultricies quam, sit amet bibendum ex dui ac ante. In condimentum ornare enim, sit amet pellentesque magna hendrerit ac. Nullam eget iaculis ipsum.Donec eu nisi sed elit convallis volutpat vitae ac libero. Quisque eu accumsan dolor, sit amet aliquam ante. Maecenas congue enim id dictum fermentum. Nulla condimentum ultricies tempor.',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(
            /Le mot de pass de l'école doit avoir au plus 20 caractères/i
          )
        ).toBeInTheDocument()
      })
    })
  })
  describe('nbrStudents input', () => {
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
      expect(screen.getByLabelText(/Nombre d'élèves/i)).toBeInTheDocument()
    })
    it('should be able to type in the input', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre d'élèves/i), {
        target: { value: '12a' },
      })
      await waitFor(() => {
        expect(screen.getByLabelText(/Nombre d'élèves/i)).toHaveValue('12a')
      })
    })
    it('should return error if empty', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre d'élèves/i), {
        target: { value: '' },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le nombre d'élèves est obligatoire/i)
        ).toBeInTheDocument()
      })
    })

    it('should return error if caracters length is not 5', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre d'élèves/i), {
        target: {
          value: 'Lorema',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(
            /le nombre d'élèves doit avoir au plus 5 caractères/i
          )
        ).toBeInTheDocument()
      })
    })
    it('should return error if not a number', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre d'élèves/i), {
        target: {
          value: 'Lorem',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le nombre d'élèves doit etre un nombre entier/i)
        ).toBeInTheDocument()
      })
    })
    it('should return error greather than 20000', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre d'élèves/i), {
        target: {
          value: '45678',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le nombre d'élèves doit etre inférieur à 20000/i)
        ).toBeInTheDocument()
      })
    })
  })
  describe('nbrTeachers input', () => {
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
      expect(screen.getByLabelText(/Nombre d'enseignants/i)).toBeInTheDocument()
    })
    it('should be able to type in the input', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre d'enseignants/i), {
        target: { value: '12a' },
      })
      await waitFor(() => {
        expect(screen.getByLabelText(/Nombre d'enseignants/i)).toHaveValue(
          '12a'
        )
      })
    })
    it('should return error if empty', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre d'enseignants/i), {
        target: { value: '' },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le nombre d'enseignants est obligatoire/i)
        ).toBeInTheDocument()
      })
    })

    it('should return error if caracters greather than 2', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre d'enseignants/i), {
        target: {
          value: 'Lorema',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(
            /le nombre d'enseignants doit avoir au plus 2 caractères/i
          )
        ).toBeInTheDocument()
      })
    })
    it('should return error if not a number', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre d'enseignants/i), {
        target: {
          value: 'Lo',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(
            /le nombre d'enseignants doit etre un nombre entier/i
          )
        ).toBeInTheDocument()
      })
    })
  })
  describe('nbrFamilies input', () => {
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
      expect(screen.getByLabelText(/Nombre de familles/i)).toBeInTheDocument()
    })
    it('should be able to type in the input', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre de familles/i), {
        target: { value: '12a' },
      })
      await waitFor(() => {
        expect(screen.getByLabelText(/Nombre de familles/i)).toHaveValue('12a')
      })
    })
    it('should return error if empty', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre de familles/i), {
        target: { value: '' },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le nombre de familles est obligatoire/i)
        ).toBeInTheDocument()
      })
    })

    it('should return error if caracters greather than 3', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre de familles/i), {
        target: {
          value: 'Lorema',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(
            /le nombre de familles doit avoir au plus 3 caractères/i
          )
        ).toBeInTheDocument()
      })
    })
    it('should return error if not a number', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre de familles/i), {
        target: {
          value: 'mm',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le nombre de familles doit etre un nombre entier/i)
        ).toBeInTheDocument()
      })
    })
  })
  describe('nbrActivities input', () => {
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
      expect(screen.getByLabelText(/Nombre d'activités/i)).toBeInTheDocument()
    })
    it('should be able to type in the input', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre d'activités/i), {
        target: { value: '12a' },
      })
      await waitFor(() => {
        expect(screen.getByLabelText(/Nombre d'activités/i)).toHaveValue('12a')
      })
    })
    it('should return error if empty', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre d'activités/i), {
        target: { value: '' },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le nombre d'activités est obligatoire/i)
        ).toBeInTheDocument()
      })
    })

    it('should return error if caracters greather than 4', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre d'activités/i), {
        target: {
          value: 'Lorema',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(
            /le nombre d'activités doit avoir au plus 4 caractères/i
          )
        ).toBeInTheDocument()
      })
    })
    it('should return error if not a number', async () => {
      fireEvent.change(screen.getByLabelText(/Nombre d'activités/i), {
        target: {
          value: 'mm',
        },
      })
      await waitFor(() => {
        expect(
          screen.getByText(/le nombre d'activités doit etre un nombre entier/i)
        ).toBeInTheDocument()
      })
    })
  })
})
