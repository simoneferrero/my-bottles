import { transformBottleToFormData, parseFormValues } from './bottle'

import {
  wineBottle,
  wineFormData,
  beerBottle,
  beerFormData,
} from '../mocks/bottles'

describe('Given bottle helpers', () => {
  describe('And `transformBottleToFormData', () => {
    it('should correctly transform a wine bottle to form data', () => {
      const transformedFormData = transformBottleToFormData(wineBottle)

      expect(transformedFormData).toEqual(wineFormData)
    })

    it('should correctly transform a beer bottle to form data', () => {
      const transformedFormData = transformBottleToFormData(beerBottle)

      expect(transformedFormData).toEqual(beerFormData)
    })
  })

  describe('And `parseFormValues', () => {
    it('should correctly transform form data to a bottle when the year is present', () => {
      const transformedBottle = parseFormValues(wineFormData)
      const expectedResult = {
        ...wineBottle,
      }
      delete expectedResult._id

      expect(transformedBottle).toEqual(expectedResult)
    })

    it('should correctly transform form data to a bottle when the year is NOT present', () => {
      const transformedBottle = parseFormValues(beerFormData)
      const expectedResult = {
        ...beerBottle,
      }
      delete expectedResult._id

      expect(transformedBottle).toEqual(expectedResult)
    })
  })
})
