import { useAppSelector, useAppDispatch } from '../../app/hooks'

import {
  addBottle,
  selectBottleFormStatus,
  setBottleFormClosed,
  selectBottleToUpdate,
  updateBottle,
} from '../../features/bottles/slice'

import BottleForm from '../../components/BottleForm'

import { BottleFormState } from '../../types/Bottle'
import BOTTLE_CATEGORIES from '../../constants/bottleCategories'

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
  const bottleToUpdate = useAppSelector(selectBottleToUpdate)
  const selectedCategory = BOTTLE_CATEGORIES.find(
    (category) => bottleToUpdate?.category === category.value
  )
  const selectedType = selectedCategory?.types?.find(
    (bottleType) => bottleToUpdate?.type === bottleType.value
  )
  const bottleState = {
    ...bottleToUpdate,
    category: selectedCategory,
    type: selectedType,
    quantity: String(bottleToUpdate?.quantity),
  }
  const title = bottleToUpdate
    ? `Edit ${bottleToUpdate.name}${
        bottleToUpdate.year ? ` (${bottleToUpdate.year})` : ''
      }`
    : 'Add New Bottle'

  const bottleFormStatus = useAppSelector(selectBottleFormStatus)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(setBottleFormClosed())

  const handleSubmit =
    (formValues: BottleFormState, setFormValues) => (): void => {
      dispatch(
        bottleToUpdate
          ? updateBottle({
              formValues,
              resetFormValues: () => setFormValues(initialState),
            })
          : addBottle({
              formValues,
              resetFormValues: () => setFormValues(initialState),
            })
      )
    }

  return (
    <BottleForm
      initialState={bottleToUpdate ? bottleState : initialState}
      isOpen={bottleFormStatus === 'open'}
      onClose={handleClose}
      onSubmit={handleSubmit}
      size={size}
      title={title}
    />
  )
}

export default AddBottleForm
