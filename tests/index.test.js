import React from 'react'
import { fireEvent, render, screen, waitFor } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'

import { successHandlers, errorHandlers } from '../mocks/handlers'

import Home from '../pages/'

describe('Given <Home />', () => {
  const server = setupServer(successHandlers.getBottles)

  const getAddNewBottleButton = () => screen.getByLabelText('Add')
  const getAddNewBottleTitle = () => screen.queryByText('Add New Bottle')
  const getCategoryInput = () => screen.getByLabelText('Category')
  const getTypeInput = () => screen.getByLabelText('Type')
  const getNameInput = () => screen.getByLabelText('Name')
  const getYearInput = () => screen.getByLabelText('Year')
  const getVolumeInput = () => screen.getByLabelText('Volume in %')
  const getQuantityInput = () => screen.getByLabelText('Quantity')
  const getSubmitButton = () => screen.getByText('Add')
  const getWineOption = () => screen.getByText('Wine')
  const getRedOption = () => screen.getByText('Red')

  beforeAll(() => {
    server.listen()
  })

  beforeEach(() => {
    render(<Home size="large" />)
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('should render the title', () => {
    expect(screen.getByText('My Bottles')).toBeInTheDocument()
  })

  describe('When the user adds a new bottle', () => {
    beforeEach(() => {
      userEvent.click(getAddNewBottleButton())
      userEvent.click(getCategoryInput())
      userEvent.click(getWineOption())
      userEvent.click(getTypeInput())
      userEvent.click(getRedOption())
      fireEvent.change(getNameInput(), { target: { value: 'Barolo' } })
      fireEvent.change(getYearInput(), { target: { value: '1955' } })
      fireEvent.change(getVolumeInput(), { target: { value: '12' } })
      fireEvent.change(getQuantityInput(), { target: { value: '1' } })
    })

    it('should add the new bottle on success', async () => {
      server.use(successHandlers.postBottle)

      const addNewBottleTitle = getAddNewBottleTitle()
      expect(addNewBottleTitle).toBeInTheDocument()

      fireEvent.click(getSubmitButton())

      await waitFor(() => {
        expect(addNewBottleTitle).not.toBeInTheDocument()
        expect(screen.getByText('Barolo (1955)')).toBeInTheDocument()
      })
    })

    it('should NOT submit the data on failure', async () => {
      server.use(errorHandlers.postBottle)

      const addNewBottleTitle = getAddNewBottleTitle()
      expect(addNewBottleTitle).toBeInTheDocument()

      fireEvent.click(getSubmitButton())

      await waitFor(() => {
        expect(addNewBottleTitle).toBeInTheDocument()
        expect(screen.queryByText('Barolo (1955)')).not.toBeInTheDocument()
      })
    })
  })
})
