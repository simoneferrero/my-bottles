import React from 'react'
import { render, screen } from '@testing-library/react'

import AppBar from './'

describe('Given <AppBar />', () => {
  it('should render the title', () => {
    const title = 'My Bottles'

    render(<AppBar>{title}</AppBar>)

    expect(screen.getByText(title)).toBeInTheDocument()
  })
})
