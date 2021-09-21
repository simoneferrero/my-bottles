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
  const getModifyBottleTitle = () => screen.queryByText('Edit Barbera (1990)')
  const getCategoryInput = () => screen.getByLabelText('Category')
  const getTypeInput = () => screen.getByLabelText('Type')
  const getNameInput = () => screen.getByLabelText('Name')
  const getYearInput = () => screen.getByLabelText('Year')
  const getVolumeInput = () => screen.getByLabelText('Volume in %')
  const getQuantityInput = () => screen.getByLabelText('Quantity')
  const getSubmitButton = () => screen.getByText('Add')
  const getWineOption = () => screen.getByText('Wine')
  const getRedOption = () => screen.getByText('Red')
  const getEditWineButton = () => screen.getByLabelText('Edit Barbera (1990)')

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

  describe('When the user modifies an existing bottle', () => {
    // TODO: test AWS upload
    beforeEach(async () => {
      await waitFor(() => {
        const editWineButton = getEditWineButton()

        userEvent.click(editWineButton)
      })
    })

    it('should update the bottle on success', async () => {
      server.use(successHandlers.putBottle)

      const modifyBottleTitle = getModifyBottleTitle()
      expect(modifyBottleTitle).toBeInTheDocument()

      fireEvent.change(getNameInput(), { target: { value: 'Nebbiolo' } })
      fireEvent.change(getYearInput(), { target: { value: '1989' } })

      fireEvent.click(getSubmitButton())

      await waitFor(() => {
        expect(modifyBottleTitle).not.toBeInTheDocument()
        expect(screen.getByText('Nebbiolo (1989)')).toBeInTheDocument()
      })
    })

    it('should NOT submit the data on failure', async () => {
      server.use(errorHandlers.putBottle)

      const modifyBottleTitle = getModifyBottleTitle()
      expect(modifyBottleTitle).toBeInTheDocument()

      fireEvent.click(getSubmitButton())

      await waitFor(() => {
        expect(modifyBottleTitle).toBeInTheDocument()
        expect(screen.queryByText('Nebbiolo (1989)')).not.toBeInTheDocument()
      })
    })
  })

  describe('When the user adds a new bottle', () => {
    // TODO: test AWS upload
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
