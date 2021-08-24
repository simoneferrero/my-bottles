import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AddBottleForm from './'

describe('Given <AddBottleForm />', () => {
  const renderForm = () => render(<AddBottleForm />)
  const getCategoryInput = () => screen.queryByLabelText('Category')
  const getTypeInput = () => screen.queryByLabelText('Type')
  const getNameInput = () => screen.queryByLabelText('Name')
  const getYearInput = () => screen.queryByLabelText('Year')
  const getVolumeInput = () => screen.queryByLabelText('Volume in %')
  const getQuantityInput = () => screen.queryByLabelText('Quantity')
  const getWineOption = () => screen.getByText('Wine')
  const getRedOption = () => screen.getByText('Red')

  beforeEach(() => {
    renderForm()
  })

  it('should ONLY display the category', () => {
    expect(getCategoryInput()).toHaveValue('')
    expect(getTypeInput()).not.toBeInTheDocument()
    expect(getNameInput()).not.toBeInTheDocument()
    expect(getYearInput()).not.toBeInTheDocument()
    expect(getVolumeInput()).not.toBeInTheDocument()
    expect(getQuantityInput()).not.toBeInTheDocument()
  })

  // TODO: test when category does not have type or year
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
    })

    // TODO: test validation rules
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
    })
  })
})
