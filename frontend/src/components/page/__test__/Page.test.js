import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor } from 'test-utils'
import Page from '../Page'

jest.mock('../PageList', () => ({
  __esModule: true,
  default: () => <div>page list</div>,
}))
jest.mock('../PageListEntity', () => ({
  __esModule: true,
  default: () => <div>page list entity</div>,
}))
jest.mock('../PageForm', () => ({
  __esModule: true,
  default: () => <div>page form</div>,
}))
jest.mock('../PageFormEntity', () => ({
  __esModule: true,
  default: () => <form>page form entity</form>,
}))
jest.mock('../../elements/ToggleToolTip', () => ({
  __esModule: true,
  default: () => <button type="button">Editer la page</button>,
}))

describe('Page', () => {
  it('should render without crashing', () => {
    render(<Page />)
    expect(screen.getByTestId('page')).toBeInTheDocument()
  })
  it('should render PageList component', () => {
    const pageParams = {
      alias: 'fake',
      pageName: 'fake',
      queryKey: ['fake'],
      queryParams: 'fake',
      isAllowedToChange: false,
      type: 'page',
      initialFormState: false,
    }
    render(<Page pageParams={pageParams} />)
    expect(screen.getByText('page list')).toBeInTheDocument()
  })
  it('should render PageListEntity component', () => {
    const pageParams = {
      alias: 'fake',
      pageName: 'fake',
      queryKey: ['fake'],
      queryParams: 'fake',
      isAllowedToChange: false,
      type: 'entity',
      initialFormState: false,
    }
    render(<Page pageParams={pageParams} />)
    expect(screen.getByText('page list entity')).toBeInTheDocument()
  })

  it('should render PageForm component', () => {
    const pageParams = {
      alias: 'fake',
      pageName: 'fake',
      queryKey: ['fake'],
      queryParams: 'fake',
      isAllowedToChange: true,
      type: 'page',
      initialFormState: true,
    }
    render(<Page pageParams={pageParams} />)
    expect(screen.getByText('page form')).toBeInTheDocument()
  })
  it('should render PageFormEntity component', () => {
    const pageParams = {
      alias: 'fake',
      pageName: 'fake',
      queryKey: ['fake'],
      queryParams: 'fake',
      isAllowedToChange: true,
      type: 'entity',
      initialFormState: true,
    }
    render(<Page pageParams={pageParams} />)
    expect(screen.getByText('page form entity')).toBeInTheDocument()
  })
  it('should render Tooltip component', () => {
    const pageParams = {
      alias: 'fake',
      pageName: 'fake',
      queryKey: ['fake'],
      queryParams: 'fake',
      isAllowedToChange: true,
      type: 'page',
      initialFormState: false,
    }
    render(<Page pageParams={pageParams} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
