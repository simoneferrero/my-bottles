import React from 'react'
import { fireEvent, render, screen, waitFor } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'

import { successHandlers, errorHandlers } from '../mocks/handlers'

import Home from '../pages/'

describe('Given <Home />', () => {
  const server = setupServer(successHandlers.getBottlesEmpty)

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

  const consoleErrorMock = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {})

  beforeAll(() => {
    server.listen()
  })

  beforeEach(() => {
    consoleErrorMock.mockReset()

    render(<Home size="large" />)
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    consoleErrorMock.mockRestore()
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
      fireEvent.change(getNameInput(), { target: { value: 'Barbera' } })
      fireEvent.change(getYearInput(), { target: { value: '1990' } })
      fireEvent.change(getVolumeInput(), { target: { value: '14' } })
      fireEvent.change(getQuantityInput(), { target: { value: '5' } })
    })

    it('should submit the data on success', async () => {
      server.use(successHandlers.postBottle)

      const addNewBottleTitle = getAddNewBottleTitle()
      expect(addNewBottleTitle).toBeInTheDocument()

      fireEvent.click(getSubmitButton())

      await waitFor(() => {
        expect(addNewBottleTitle).not.toBeInTheDocument()
      })
    })

    it('should NOT submit the data on failure', async () => {
      server.use(errorHandlers.postBottle)

      const addNewBottleTitle = getAddNewBottleTitle()
      expect(addNewBottleTitle).toBeInTheDocument()

      fireEvent.click(getSubmitButton())

      await waitFor(() => {
        expect(addNewBottleTitle).toBeInTheDocument()
        expect(consoleErrorMock).toHaveBeenCalled()
      })
    })
  })
})
