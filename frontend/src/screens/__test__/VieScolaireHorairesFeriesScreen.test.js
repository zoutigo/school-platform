import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor, act } from 'test-utils'
import useRigths from '../../components/hooks/useRigths'
import VieScolaireHorairesFeriesScreen from '../VieScolaireHorairesFeriesScreen'
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

describe('VieScolaireHorairesFeriesScreen', () => {
  beforeEach(() => {
    cleanup()
    useRigths.mockReturnValue({
      moderatorLevel: true,
    })

    render(<VieScolaireHorairesFeriesScreen />)
  })

  it('should render without bug', () => {
    expect(
      screen.getByTestId('viescolaire-horaires-feries-screen')
    ).toBeInTheDocument()
  })

  it('should have been called with correct props', () => {
    const pageName = 'Les jours Feriés'
    const alias = `viescolaire-horaires-feries`
    const queryKey = [pageName, `page-${alias}`]
    const queryParams = `alias=${alias}`
    const { moderatorLevel } = useRigths()
    const isAllowedToChange = moderatorLevel

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
