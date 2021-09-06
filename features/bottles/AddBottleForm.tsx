import { useAppSelector, useAppDispatch } from '../../app/hooks'

import {
  addBottle,
  selectShowAddBottle,
  setShowAddBottle,
} from '../../features/bottles/slice'

import BottleForm from '../../components/BottleForm'

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
    (formValues: BottleFormState, setFormValues) => (): void => {
      dispatch(
        addBottle({
          formValues,
          resetFormValues: () => setFormValues(initialState),
        })
      )
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
