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
    images: undefined,
  }
}

export const parseFormValues = (
  formValues: BottleFormState,
  imageUrl: string
): Bottle => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { category, _id, images, type, quantity, year, ...data } = formValues
  const { showYear } = BOTTLE_CATEGORIES.find(
    (bottleCategory) => bottleCategory.value === category.value
  )

  return {
    ...data,
    category: category.value,
    type: type?.value,
    quantity: Number(quantity),
    year: showYear ? year : undefined,
    imageUrl,
  }
}
