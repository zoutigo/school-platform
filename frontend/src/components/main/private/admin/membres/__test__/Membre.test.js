import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor } from 'test-utils'

import useFetch from '../../../../../hooks/useFetch'
import Membre from '../Membre'
import * as api from '../../../../../../utils/api'

jest.mock('../../../../../hooks/useFetch', () =>
  jest.fn(() => ({
    useFetch: jest.fn(),
  }))
)

jest.mock('../../../../../elements/AlertMessage', () => ({
  __esModule: true,
  default: ({ message, severity }) => <div>{message}</div>,
}))

jest.mock('../MembreForm', () => ({
  __esModule: true,
  default: (setShowMembreForm, user, queryKey) => (
    <>Formulaire de modification</>
  ),
}))

const membre = {
  id: 1,
}
const user = {
  id: 1,
  email: 'coco@test.com',
  gender: 'monsieur',
  lastname: 'ekambi',
  firstname: 'brian',
  isVerified: true,
  isAdmin: false,
  isManager: false,
  isModerator: true,
  entities: [{ id: 1, name: 'petite section' }],
  roles: [
    {
      id: 4,
      name: 'enseignant',
      entity: { alias: 'cm2' },
    },
  ],
}

const mockApiFetchUserDatas = jest.spyOn(api, 'apiFecthUserDatas')
mockApiFetchUserDatas.mockReturnValue(user)

describe('Membre', () => {
  afterEach(() => {
    cleanup()
  })
  it('should render error if no member prop', () => {
    render(<Membre />)
    expect(
      screen.getByText(/vous devez saisir une adressse mail/i)
    ).toBeInTheDocument()
  })
  it('should show progressbar when loading', () => {
    useFetch.mockReturnValue({
      isError: false,
      errorMessage: '',
      isLoading: true,
      data: null,
    })

    render(<Membre membre={membre} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should show error message when server error', () => {
    useFetch.mockReturnValue({
      isError: true,
      errorMessage: 'une erreur est survenue',
      isLoading: false,
      data: null,
    })
    render(<Membre membre={membre} />)
    expect(screen.getByText(/une erreur est survenue/i)).toBeInTheDocument()
  })
  it('should show user email  when server success', async () => {
    useFetch.mockReturnValue({
      isError: false,
      errorMessage: '',
      isLoading: false,
      data: await mockApiFetchUserDatas(),
    })

    render(<Membre membre={membre} />)
    expect(useFetch).toHaveBeenCalled()
    expect(screen.getByText(/coco@test.com/i)).toBeInTheDocument()
  })
  it('should show user gender  when server success', async () => {
    useFetch.mockReturnValue({
      isError: false,
      errorMessage: '',
      isLoading: false,
      data: await mockApiFetchUserDatas(),
    })
    render(<Membre membre={membre} />)
    expect(screen.getByText(/monsieur/i)).toBeInTheDocument()
    expect(screen.getByText(/Civilité/i)).toBeInTheDocument()
  })
  it('should show user firstname  when server success', async () => {
    useFetch.mockReturnValue({
      isError: false,
      errorMessage: '',
      isLoading: false,
      data: await mockApiFetchUserDatas(),
    })
    render(<Membre membre={membre} />)
    expect(screen.getByText(/brian/i)).toBeInTheDocument()
    expect(screen.getByText(/Prénom/i)).toBeInTheDocument()
  })
  it('should show user lastname  when server success', async () => {
    useFetch.mockReturnValue({
      isError: false,
      errorMessage: '',
      isLoading: false,
      data: await mockApiFetchUserDatas(),
    })
    render(<Membre membre={membre} />)
    expect(screen.getByText(/ekambi/i)).toBeInTheDocument()
  })
  it('should show user isVerified  when server success', async () => {
    useFetch.mockReturnValue({
      isError: false,
      errorMessage: '',
      isLoading: false,
      data: await mockApiFetchUserDatas(),
    })
    render(<Membre membre={membre} />)
    expect(screen.getByText(/Email verifié/i)).toBeInTheDocument()
    expect(screen.getByText(/oui/i)).toBeInTheDocument()
  })
  it('should show user children classrooms  when server success', async () => {
    useFetch.mockReturnValue({
      isError: false,
      errorMessage: '',
      isLoading: false,
      data: await mockApiFetchUserDatas(),
    })
    render(<Membre membre={membre} />)
    expect(screen.getByText(/Classe Enfants/i)).toBeInTheDocument()
    expect(screen.getByText(/petite section/i)).toBeInTheDocument()
  })
  it('should show user grade  when server success', async () => {
    useFetch.mockReturnValue({
      isError: false,
      errorMessage: '',
      isLoading: false,
      data: await mockApiFetchUserDatas(),
    })
    render(<Membre membre={membre} />)
    expect(screen.getByText(/Grades/i)).toBeInTheDocument()
    expect(screen.getByText(/moderateur/i)).toBeInTheDocument()
  })
  it('should show user roles  when server success', async () => {
    useFetch.mockReturnValue({
      isError: false,
      errorMessage: '',
      isLoading: false,
      data: await mockApiFetchUserDatas(),
    })
    render(<Membre membre={membre} />)
    expect(screen.getByText(/Roles/i)).toBeInTheDocument()
    expect(screen.getByText(/enseignant -- cm2/i)).toBeInTheDocument()
  })
  it('should show the button', () => {
    useFetch.mockReturnValue({
      isError: false,
      errorMessage: '',
      isLoading: false,
      data: mockApiFetchUserDatas(),
    })
    render(<Membre membre={membre} />)

    expect(
      screen.getByRole('button', { name: /Modifier le role ou le grade/i })
    ).toBeInTheDocument()
  })
  it('should the form component when clicked', async () => {
    useFetch.mockReturnValue({
      isError: false,
      errorMessage: '',
      isLoading: false,
      data: mockApiFetchUserDatas(),
    })
    render(<Membre membre={membre} />)

    const buttonElement = screen.getByRole('button', {
      name: /Modifier le role ou le grade/i,
    })

    fireEvent.click(buttonElement)

    await waitFor(() => {
      expect(
        screen.getByText(/Formulaire de modification/i)
      ).toBeInTheDocument()
    })
  })
  it('should change the button text when clicked', async () => {
    useFetch.mockReturnValue({
      isError: false,
      errorMessage: '',
      isLoading: false,
      data: mockApiFetchUserDatas(),
    })
    render(<Membre membre={membre} />)

    const buttonElement = screen.getByRole('button', {
      name: /Modifier le role ou le grade/i,
    })

    fireEvent.click(buttonElement)

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: /Modifier le role ou le grade/i })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: /Refermer le panneau/i })
      ).toBeInTheDocument()
    })
  })
  it('should close the form when the button is cliqued', async () => {
    useFetch.mockReturnValue({
      isError: false,
      errorMessage: '',
      isLoading: false,
      data: mockApiFetchUserDatas(),
    })
    render(<Membre membre={membre} />)

    fireEvent.click(
      screen.getByRole('button', { name: /Modifier le role ou le grade/i })
    )
    fireEvent.click(
      screen.getByRole('button', { name: /Refermer le panneau/i })
    )

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: /Refermer le panneau/i })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText(/Formulaire de modification/i)
      ).not.toBeVisible()
    })
  })
})
