import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor, act } from 'test-utils'
import useRigths from '../../components/hooks/useRigths'
import EcoleHistoireScreen from '../EcoleHistoireScreen'

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

describe('EcoleHistoireScreen', () => {
  beforeEach(() => {
    cleanup()
    useRigths.mockReturnValue({
      moderatorLevel: true,
    })

    render(<EcoleHistoireScreen />)
  })

  it('should render without bug', () => {
    expect(screen.getByTestId('ecole-histoire-screen')).toBeInTheDocument()
  })

  it('should have been called with correct props', () => {
    const pageName = 'histoire'
    const alias = `ecole-histoire`
    const queryKey = [pageName, `page-${alias}`]
    const queryParams = `alias=${alias}`

    const { moderatorLevel } = useRigths()
    const isAllowedToChange = moderatorLevel

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
