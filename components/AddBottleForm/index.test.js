import React from 'react'
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'

import { successHandlers, errorHandlers } from '../../mocks/handlers'

import AddBottleForm from './'

const consoleErrorMock = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {})

describe('Given <AddBottleForm />', () => {
  const renderForm = () => render(<AddBottleForm />)
  const getCategoryInput = () => screen.queryByLabelText('Category')
  const getTypeInput = () => screen.queryByLabelText('Type')
  const getNameInput = () => screen.queryByLabelText('Name')
  const getYearInput = () => screen.queryByLabelText('Year')
  const getVolumeInput = () => screen.queryByLabelText('Volume in %')
  const getQuantityInput = () => screen.queryByLabelText('Quantity')
  const getSubmitButton = () => screen.queryByText('Add')
  const getWineOption = () => screen.getByText('Wine')
  const getBeerOption = () => screen.getByText('Beer')
  const getSpiritOption = () => screen.getByText('Spirit')
  const getRedOption = () => screen.getByText('Red')
  const getLagerOption = () => screen.getByText('Lager')

  beforeEach(() => {
    renderForm()
    consoleErrorMock.mockReset()
  })

  afterAll(() => {
    consoleErrorMock.mockRestore()
  })

  it('should ONLY display the category', () => {
    expect(getCategoryInput()).toHaveValue('')
    expect(getTypeInput()).not.toBeInTheDocument()
    expect(getNameInput()).not.toBeInTheDocument()
    expect(getYearInput()).not.toBeInTheDocument()
    expect(getVolumeInput()).not.toBeInTheDocument()
    expect(getQuantityInput()).not.toBeInTheDocument()
    expect(getSubmitButton()).not.toBeInTheDocument()
  })

  describe('When a category with a type and a year is selected', () => {
    beforeEach(() => {
      userEvent.click(getCategoryInput())
      userEvent.click(getWineOption())
    })

    it('should display the type', () => {
      expect(screen.getByDisplayValue('Wine')).toBeInTheDocument()
      expect(getTypeInput()).toBeInTheDocument()
      expect(getNameInput()).not.toBeInTheDocument()
      expect(getYearInput()).not.toBeInTheDocument()
      expect(getVolumeInput()).not.toBeInTheDocument()
      expect(getQuantityInput()).not.toBeInTheDocument()
      expect(getSubmitButton()).not.toBeInTheDocument()
    })

    describe('And when a type is selected', () => {
      beforeEach(() => {
        userEvent.click(getTypeInput())
        userEvent.click(getRedOption())

        expect(screen.getByDisplayValue('Red')).toBeInTheDocument()
      })

      const testCases = [
        {
          getFormElement: () => getNameInput(),
          initialValue: '',
          description: 'Type in the name of the bottle',
          formElementName: 'name',
          newValue: 'Barbera',
        },
        {
          getFormElement: () => getYearInput(),
          initialValue: String(new Date().getFullYear()),
          description: 'Type in the year in which it was bottled',
          formElementName: 'year',
          newValue: '1990',
        },
        {
          getFormElement: () => getVolumeInput(),
          initialValue: '0',
          description: 'Type in the alcoholic volume of the bottle',
          formElementName: 'volume',
          newValue: '14',
        },
        {
          getFormElement: () => getQuantityInput(),
          initialValue: '0',
          description: 'How many bottles of this type you have',
          formElementName: 'quantity',
          newValue: '5',
        },
      ]
      testCases.forEach(
        ({
          getFormElement,
          initialValue,
          description,
          formElementName,
          newValue,
        }) => {
          it(`should display and change the ${formElementName}`, () => {
            const formElement = getFormElement()
            expect(formElement.value).toEqual(initialValue)
            expect(formElement).toHaveAccessibleDescription(description)

            fireEvent.change(formElement, { target: { value: newValue } })

            expect(formElement.value).toEqual(newValue)
          })
        }
      )

      it('should display the submit button', () => {
        expect(getSubmitButton()).toBeInTheDocument()
      })

      describe('And when the form is submitted', () => {
        beforeEach(() => {
          fireEvent.change(getNameInput(), { target: { value: 'Barbera' } })
          fireEvent.change(getYearInput(), { target: { value: '1990' } })
          fireEvent.change(getVolumeInput(), { target: { value: '14' } })
          fireEvent.change(getQuantityInput(), { target: { value: '5' } })
        })

        it('should display the submit button and clear the form on success', async () => {
          const server = setupServer(successHandlers.postBottle)
          server.listen()

          userEvent.click(getSubmitButton())

          await waitFor(() => {
            expect(getCategoryInput()).toHaveValue('')
            expect(getTypeInput()).not.toBeInTheDocument()
            expect(getNameInput()).not.toBeInTheDocument()
            expect(getYearInput()).not.toBeInTheDocument()
            expect(getVolumeInput()).not.toBeInTheDocument()
            expect(getQuantityInput()).not.toBeInTheDocument()
            expect(getSubmitButton()).not.toBeInTheDocument()

            server.close()
          })
        })

        it('should NOT clear the form on error', async () => {
          const server = setupServer(errorHandlers.postBottle)
          server.listen()

          userEvent.click(getSubmitButton())

          await waitFor(() => {
            expect(screen.getByDisplayValue('Wine')).toBeInTheDocument()
            expect(screen.getByDisplayValue('Red')).toBeInTheDocument()
            expect(getNameInput().value).toEqual('Barbera')
            expect(getYearInput().value).toEqual('1990')
            expect(getVolumeInput().value).toEqual('14')
            expect(getQuantityInput().value).toEqual('5')
            expect(getSubmitButton()).toBeInTheDocument()
            expect(consoleErrorMock).toHaveBeenCalled()

            server.close()
          })
        })
      })

      describe('And the fields only accept valid input', () => {
        it('should ONLY allow valid years', () => {
          const yearInput = getYearInput()
          const currentYear = String(new Date().getFullYear())

          fireEvent.change(yearInput, { target: { value: '-1' } })
          expect(yearInput.value).toEqual(currentYear)

          fireEvent.change(yearInput, { target: { value: '100000' } })
          expect(yearInput.value).toEqual(currentYear)
        })

        it('should ONLY allow valid volumes', () => {
          const volumeInput = getVolumeInput()
          const currentVolume = '0'

          fireEvent.change(volumeInput, { target: { value: '-1' } })
          expect(volumeInput.value).toEqual(currentVolume)

          fireEvent.change(volumeInput, { target: { value: '101' } })
          expect(volumeInput.value).toEqual(currentVolume)
        })

        it('should ONLY allow valid quantities', () => {
          const quantityInput = getQuantityInput()
          const currentQuantity = '0'

          fireEvent.change(quantityInput, { target: { value: '-1' } })
          expect(quantityInput.value).toEqual(currentQuantity)
        })
      })
    })
  })

  describe('When a category with a type and NO year is selected', () => {
    beforeEach(() => {
      userEvent.click(getCategoryInput())
      userEvent.click(getBeerOption())
    })

    it('should display the type', () => {
      expect(screen.getByDisplayValue('Beer')).toBeInTheDocument()
      expect(getTypeInput()).toBeInTheDocument()
      expect(getNameInput()).not.toBeInTheDocument()
      expect(getYearInput()).not.toBeInTheDocument()
      expect(getVolumeInput()).not.toBeInTheDocument()
      expect(getQuantityInput()).not.toBeInTheDocument()
      expect(getSubmitButton()).not.toBeInTheDocument()
    })

    describe('And when a type is selected', () => {
      it('should display all fields', () => {
        userEvent.click(getTypeInput())
        userEvent.click(getLagerOption())

        expect(screen.getByDisplayValue('Lager')).toBeInTheDocument()
        expect(getNameInput()).toBeInTheDocument()
        expect(getYearInput()).not.toBeInTheDocument()
        expect(getVolumeInput()).toBeInTheDocument()
        expect(getQuantityInput()).toBeInTheDocument()
        expect(getSubmitButton()).toBeInTheDocument()
      })
    })
  })

  describe('When a category with NO type and NO year is selected', () => {
    it('should display all fields', () => {
      userEvent.click(getCategoryInput())
      userEvent.click(getSpiritOption())

      expect(screen.getByDisplayValue('Spirit')).toBeInTheDocument()
      expect(getTypeInput()).not.toBeInTheDocument()
      expect(getNameInput()).toBeInTheDocument()
      expect(getYearInput()).not.toBeInTheDocument()
      expect(getVolumeInput()).toBeInTheDocument()
      expect(getQuantityInput()).toBeInTheDocument()
      expect(getSubmitButton()).toBeInTheDocument()
    })
  })
})
