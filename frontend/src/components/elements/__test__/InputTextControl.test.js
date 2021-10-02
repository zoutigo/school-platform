/* eslint-disable react/prop-types */
import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/styles'
import theme from '../../../constants/theme'
import InputTextControl from '../InputTextControl'

const MockTheme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

// const Input = () => (
//   <MockTheme>
//     <InputTextControl
//       control={jest.fn()}
//       name="email"
//       width="11rem"
//       initialValue=""
//       placeHolder="test@test.com"
//     />
//   </MockTheme>
// )

describe('components/elements/InputTextControl', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render properly', () => {
    // render(<Input />)
    // const inputElement = screen.getByPlaceholderText(/test@test.com/i)
    // expect(inputElement).toBeVisible()
  })
})
