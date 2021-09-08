import { useAppSelector, useAppDispatch } from '../../app/hooks'

import {
  addBottle,
  selectBottleFormStatus,
  setBottleFormClosed,
  selectBottleToUpdate,
  updateBottle,
} from '../../features/bottles/slice'

import Form from '../../components/BottleForm'

import { transformBottleToFormData } from '../../helpers/bottle'

import { BottleFormState } from '../../types/Bottle'

type Props = {
  size: 'small' | string
}

const BottleForm = ({ size }: Props): JSX.Element => {
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
  const bottleState = transformBottleToFormData(bottleToUpdate)
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
    <Form
      initialState={bottleToUpdate ? bottleState : initialState}
      isOpen={bottleFormStatus === 'open'}
      onClose={handleClose}
      onSubmit={handleSubmit}
      size={size}
      title={title}
    />
  )
}

export default BottleForm
