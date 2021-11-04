import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor, act } from 'test-utils'
import useRigths from '../../components/hooks/useRigths'
import useRoles from '../../components/hooks/useRoles'
import VieScolairePastoraleScreen from '../VieScolairePastoraleScreen'

jest.mock('../../components/hooks/useRigths', () =>
  jest.fn(() => ({
    useRigths: jest.fn(),
  }))
)
jest.mock('../../components/hooks/useRoles', () =>
  jest.fn(() => ({
    useRoles: jest.fn(),
  }))
)

const MockPage = jest.fn()

jest.mock('../../components/page/Page', () => (props) => {
  MockPage(props)
  return null
})

describe('VieScolairePastoraleScreen', () => {
  beforeEach(() => {
    cleanup()
    useRigths.mockReturnValue({
      moderatorLevel: true,
    })
    useRoles.mockReturnValue({
      catechiste: true,
    })

    render(<VieScolairePastoraleScreen />)
  })

  it('should render without bug', () => {
    expect(
      screen.getByTestId('viescolaire-pastorale-screen')
    ).toBeInTheDocument()
  })

  it('should have been called with correct props', () => {
    const pageName = 'PASTORALE'
    const alias = `pastorale`
    const queryKey = [pageName, `page-${alias}`]
    const queryParams = `alias=${alias}`
    const { moderatorLevel } = useRigths()
    const { catechiste } = useRoles()
    const isAllowedToChange = moderatorLevel || catechiste

    const pageParams = {
      isAllowedToChange,
      alias,
      queryKey,
      queryParams,
      pageName,
      type: 'entity',
      initialFormState: false,
    }
    expect(MockPage).toHaveBeenCalledWith(
      expect.objectContaining({
        pageParams: expect.objectContaining({ ...pageParams }),
      })
    )
  })
})
