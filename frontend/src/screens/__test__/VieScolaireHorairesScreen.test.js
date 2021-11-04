import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor, act } from 'test-utils'
import useRigths from '../../components/hooks/useRigths'
import VieScolaireHorairesScreen from '../VieScolaireHorairesScreen'

jest.mock('../../components/hooks/useRigths', () =>
  jest.fn(() => ({
    useRigths: jest.fn(),
  }))
)

const MockPage = jest.fn()

jest.mock('../../components/page/Page', () => (props) => {
  MockPage(props)
  return null
})

describe('VieScolaireHorairesScreen', () => {
  beforeEach(() => {
    cleanup()
    useRigths.mockReturnValue({
      moderatorLevel: true,
    })

    render(<VieScolaireHorairesScreen />)
  })

  it('should render without bug', () => {
    expect(
      screen.getByTestId('viescolaire-horaires-screen')
    ).toBeInTheDocument()
  })

  it('should have been called with correct props', () => {
    const pageName = 'La garderie'
    const alias = `viescolaire-horaires`
    const queryKey = [pageName, `page-${alias}`]
    const queryParams = `alias=${alias}`
    const { managerLevel, adminLevel } = useRigths()
    const isAllowedToChange = managerLevel || adminLevel

    const pageParams = {
      alias,
      queryKey,
      queryParams,
      pageName,
      isAllowedToChange,
      type: 'page',
      initialFormState: false,
    }
    expect(MockPage).toHaveBeenCalledWith(
      expect.objectContaining({
        pageParams: expect.objectContaining({ ...pageParams }),
      })
    )
  })
})
