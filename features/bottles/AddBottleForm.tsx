import axios from 'axios'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import {
  selectShowAddBottle,
  setShowAddBottle,
} from '../../features/bottles/slice'

import BottleForm from '../../components/BottleForm'

import BOTTLE_CATEGORIES from '../../constants/bottleCategories'

import { BottleFormState } from '../../types/Bottle'

type Props = {
  size: 'small' | string
}

const AddBottleForm = ({ size }: Props): JSX.Element => {
  const currentYear = String(new Date().getFullYear())
  const initialState = {
    category: undefined,
    type: undefined,
    name: '',
    year: currentYear,
    quantity: '0',
    volume: '0',
  }

  const isOpen = useAppSelector(selectShowAddBottle)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(setShowAddBottle(false))

  const handleSubmit =
    (formValues: BottleFormState, setFormValues) => async (): Promise<void> => {
      const selectedCategory = BOTTLE_CATEGORIES.find(
        (bottleCategory) => bottleCategory === formValues.category
      )
      const parsedFormValues = {
        ...formValues,
        category: formValues.category.value,
        type: formValues?.type?.value,
        quantity: Number(formValues.quantity),
        year: selectedCategory.showYear ? formValues.year : undefined,
      }
      try {
        const { data } = await axios.post('/api/bottles', parsedFormValues)

        // TODO: Add new bottle to store and display
        console.log(data)

        handleClose()
        setFormValues(initialState)
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <BottleForm
      initialState={initialState}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      size={size}
      title="Add New Bottle"
    />
  )
}

export default AddBottleForm
