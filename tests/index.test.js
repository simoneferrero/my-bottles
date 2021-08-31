import React from 'react'
import { render, screen } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'

import { successHandlers } from '../mocks/handlers'

import Home from '../pages/'

describe('Given <Home />', () => {
  const server = setupServer(successHandlers.getBottlesEmpty)

  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

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
