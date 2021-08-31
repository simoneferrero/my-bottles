import { Box, Button, Form, FormField, Select, TextInput } from 'grommet'
import { useState } from 'react'
import axios from 'axios'

import BOTTLE_CATEGORIES from '../../constants/bottleCategories'

const AddBottleForm = (): JSX.Element => {
  const currentYear = String(new Date().getFullYear())
  const initialState = {
    category: undefined,
    type: undefined,
    name: '',
    year: currentYear,
    quantity: '0',
    volume: '0',
  }
  const [formValues, setFormValues] = useState(initialState)

  const handleSubmit = async (): Promise<void> => {
    const parsedFormValues = {
      ...formValues,
      category: formValues.category.value,
      type: formValues?.type?.value,
      quantity: Number(formValues.quantity),
    }
    try {
      await axios.post('/api/bottles', parsedFormValues)

      setFormValues(initialState)
    } catch (error) {
      console.error(error)
    }
  }
  const handleSelect =
    (key: string, forcedValues: { [key: string]: string }) =>
    ({ option }) => {
      setFormValues((previousValues) => ({
        ...previousValues,
        ...forcedValues,
        [key]: option,
      }))
    }

  const handleChange =
    (key: string, isValid: (value: string) => boolean) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target

      setFormValues((previousValues) => ({
        ...previousValues,
        ...(isValid(value) && {
          [key]: value,
        }),
      }))
    }

  const showType = formValues?.category?.types?.length
  const showFields = formValues?.category && (!showType || formValues?.type)
  const showYear = showFields && formValues?.category?.showYear

  const isNameValid = () => true
  const isYearValid = (value: string): boolean => {
    const numberValue = Number(value)
    const numberCurrentYear = Number(currentYear)

    return numberValue <= numberCurrentYear && numberValue >= 0
  }
  const isVolumeValid = (value: string): boolean => {
    const numberValue = Number(value)

    return numberValue >= 0 && numberValue <= 100
  }
  const isQuantityValid = (value: string): boolean => {
    const numberValue = Number(value)

    return numberValue >= 0
  }

  return (
    <Box
      direction="column"
      flex
      overflow={{ horizontal: 'hidden' }}
      pad="medium"
    >
      <Form onSubmit={handleSubmit}>
        <FormField htmlFor="category" label="Category">
          <Select
            id="category"
            onChange={handleSelect('category', { type: undefined })}
            options={BOTTLE_CATEGORIES}
            value={formValues.category}
            labelKey="label"
            valueKey="value"
          />
        </FormField>
        {showType && (
          <FormField htmlFor="type" label="Type">
            <Select
              id="type"
              onChange={handleSelect('type', {})}
              options={formValues.category.types}
              value={formValues.type}
              labelKey="label"
              valueKey="value"
            />
          </FormField>
        )}
        {showYear && (
          <FormField htmlFor="year" label="Year">
            <TextInput
              id="year"
              max={currentYear}
              min="0"
              onChange={handleChange('year', isYearValid)}
              title="Type in the year in which it was bottled"
              type="number"
              value={formValues.year}
            />
          </FormField>
        )}
        {showFields && (
          <>
            <FormField htmlFor="name" label="Name">
              <TextInput
                id="name"
                onChange={handleChange('name', isNameValid)}
                title="Type in the name of the bottle"
                value={formValues.name}
              />
            </FormField>

            <FormField htmlFor="volume" label="Volume in %">
              <TextInput
                id="volume"
                max="100"
                min="0"
                onChange={handleChange('volume', isVolumeValid)}
                step=".1"
                title="Type in the alcoholic volume of the bottle"
                type="number"
                value={formValues.volume}
              />
            </FormField>
            <FormField htmlFor="quantity" label="Quantity">
              <TextInput
                id="quantity"
                min="0"
                onChange={handleChange('quantity', isQuantityValid)}
                title="How many bottles of this type you have"
                type="number"
                value={formValues.quantity}
              />
            </FormField>
            <Button
              type="submit"
              primary
              label="Add"
              margin={{ top: 'medium' }}
            />
          </>
        )}
      </Form>
    </Box>
  )
}

export default AddBottleForm
