import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor, act } from 'test-utils'
import useRigths from '../../components/hooks/useRigths'
import VieScolaireGarderiePresentationScreen from '../VieScolaireGarderiePresentationScreen'

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

describe('VieScolaireGarderiePresentationScreen', () => {
  beforeEach(() => {
    cleanup()
    useRigths.mockReturnValue({
      moderatorLevel: true,
    })

    render(<VieScolaireGarderiePresentationScreen />)
  })

  it('should render without bug', () => {
    expect(
      screen.getByTestId('viescolaire-garderie-presentation-screen')
    ).toBeInTheDocument()
  })

  it('should have been called with correct props', () => {
    const pageName = 'presentation garderie'
    const alias = `viescolaire-garderie-presentation`
    const queryKey = [pageName, `page-${alias}`]
    const queryParams = `alias=${alias}`
    const { managerLevel, adminLevel } = useRigths()
    const isAllowedToChange = managerLevel || adminLevel

    const pageParams = {
      alias,
      queryKey,
      queryParams,
      pageName,
      type: 'page',
      isAllowedToChange,
      initialFormState: false,
    }
    expect(MockPage).toHaveBeenCalledWith(
      expect.objectContaining({
        pageParams: expect.objectContaining({ ...pageParams }),
      })
    )
  })
})
