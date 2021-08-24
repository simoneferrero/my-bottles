import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Home from '../pages/'

describe('Given <Home />', () => {
  it('should render the title', () => {
    render(<Home size="small" />)

    expect(screen.getByText('My Bottles')).toBeInTheDocument()
  })

  // TODO: Enable when grommet release fix
  xit('should render the overlay if size is small', () => {
    render(<Home size="small" />)
    userEvent.click(screen.getByLabelText('Add new bottle button'))

    expect(screen.getByText('Add New Bottle')).toBeInTheDocument()
  })

  it('should render the overlay if size is small', () => {
    render(<Home size="large" />)
    userEvent.click(screen.getByLabelText('Add new bottle button'))

    expect(screen.getByText('Add New Bottle')).toBeInTheDocument()
  })
})
