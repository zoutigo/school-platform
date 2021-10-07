import React from 'react'
import { render, screen } from '../utils/tests-utils'
import Essai from '../screens/Essai'

// import {render } from '@testing-library/react'

describe('Essai', () => {
  it('should render', () => {
    render(<Essai />)
    const essai = screen.getByTestId('essai')
    expect(essai).toBeInTheDocument()
  })
})
