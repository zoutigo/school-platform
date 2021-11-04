import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor, act } from 'test-utils'
import useRigths from '../../components/hooks/useRigths'
import useRoles from '../../components/hooks/useRoles'
import ApelOgecOgecScreen from '../ApelOgecOgecScreen'

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

describe('ApelOgecOgecScreen', () => {
  beforeEach(() => {
    cleanup()
    useRigths.mockReturnValue({
      moderatorLevel: true,
    })
    useRoles.mockReturnValue({
      ogecMembre: true,
    })

    render(<ApelOgecOgecScreen />)
  })

  it('should render without bug', () => {
    expect(screen.getByTestId('apelogec-ogec-screen')).toBeInTheDocument()
  })

  it('should have been called with correct props', () => {
    const pageName = 'OGEC'
    const alias = `ogec`
    const queryKey = [pageName, `page-${alias}`]
    const queryParams = `alias=${alias}`

    const { moderatorLevel } = useRigths()
    const { ogecMembre } = useRoles()
    const isAllowedToChange = moderatorLevel || ogecMembre

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
