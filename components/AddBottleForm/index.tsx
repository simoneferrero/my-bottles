import { Box, FormField, Select, TextInput } from 'grommet'
import { useState } from 'react'

const WINE_TYPES = [
  {
    label: 'Red',
    value: 'RED',
  },
  {
    label: 'White',
    value: 'WHITE',
  },
  {
    label: 'Rosé',
    value: 'ROSE',
  },
  {
    label: 'Sparkling',
    value: 'SPARKLING',
  },
  {
    label: 'Dessert',
    value: 'DESSERT',
  },
]
// TODO: Add BEER and SPIRIT types
const BOTTLE_CATEGORIES = [
  {
    label: 'Wine',
    value: 'WINE',
    showYear: true,
    types: WINE_TYPES,
  },
  {
    label: 'Beer',
    value: 'BEER',
  },
  {
    label: 'Spirit',
    value: 'SPIRIT',
  },
]

const AddBottleForm = (): JSX.Element => {
  const currentYear = String(new Date().getFullYear())
  const [formValues, setFormValues] = useState({
    category: undefined,
    type: undefined,
    name: '',
    year: currentYear,
    quantity: '0',
    volume: '0',
  })
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
  const isYearValid = (value) => value <= currentYear && value >= '0'
  const isVolumeValid = (value) => value >= '0' || value <= '100'
  const isQuantityValid = (value) => value >= '0'

  return (
    <Box
      direction="column"
      flex
      overflow={{ horizontal: 'hidden' }}
      pad="medium"
    >
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
            options={formValues?.category?.types || []}
            value={formValues.type}
            labelKey="label"
            valueKey="value"
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
        </>
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
    </Box>
  )
}

export default AddBottleForm
