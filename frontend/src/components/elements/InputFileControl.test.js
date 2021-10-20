import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor } from 'test-utils'
import InputFileControl from './InputFileControl'

// control,
// name,
// accept,
// multiple,
// initialValue,
// show,
// ...rest

const label = 'Image de couverture'

const type = 'file'

const helperText = 'maximum 10Mo'

const control = jest.fn(() => {})
const name = 'file'
const accept = 'image/jpg,image/jpeg,image/gif,image/png'
const multiple = true
const show = true

const props = { show, multiple, helperText, accept, name, control, label, type }
describe('InputFileControl', () => {
  it.skip('should render without bug', () => {
    render(<InputFileControl {...props} />)
  })
})
