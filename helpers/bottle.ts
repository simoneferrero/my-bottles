import BOTTLE_CATEGORIES from '../constants/bottleCategories'

import { Bottle, BottleFormState } from '../types/Bottle'

export const transformBottleToFormData = (bottle: Bottle): BottleFormState => {
  const selectedCategory = BOTTLE_CATEGORIES.find(
    (category) => bottle?.category === category.value
  )
  const selectedType = selectedCategory?.types?.find(
    (bottleType) => bottle?.type === bottleType.value
  )
  return {
    ...bottle,
    category: selectedCategory,
    type: selectedType,
    quantity: String(bottle?.quantity),
  }
}

export const transformFormDataToBottle = (
  formData: BottleFormState
): Bottle => {
  const selectedCategory = BOTTLE_CATEGORIES.find(
    (bottleCategory) => bottleCategory.value === formData.category.value
  )

  return {
    ...formData,
    category: formData.category.value,
    type: formData?.type?.value,
    quantity: Number(formData.quantity),
    year: selectedCategory.showYear ? formData.year : undefined,
  }
}
