import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor, act } from 'test-utils'
import useRigths from '../../components/hooks/useRigths'
import useRoles from '../../components/hooks/useRoles'
import PrivateAdminScreen from '../PrivateAdminScreen'

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

describe('PrivateAdminScreen', () => {
  beforeEach(() => {
    cleanup()
    useRigths.mockReturnValue({
      moderatorLevel: true,
    })
    useRoles.mockReturnValue({
      apelMembre: true,
    })

    render(<PrivateAdminScreen />)
  })

  it('should render without bug', () => {
    expect(screen.getByTestId('administration-screen')).toBeInTheDocument()
  })

  it('should have been called with correct props', () => {
    const pageName = 'administration'
    const alias = `administration`
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
