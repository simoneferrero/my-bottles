import { BottleCategory, BottleType } from '../types/Bottle'

export const WINE_TYPES: BottleType[] = [
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
  {
    label: 'Other',
    value: 'OTHER',
  },
]

export const BEER_TYPES: BottleType[] = [
  {
    label: 'Lager',
    value: 'LAGER',
  },
  {
    label: 'Porter',
    value: 'PORTER',
  },
  {
    label: 'Stout',
    value: 'STOUT',
  },
  {
    label: 'Blonde Ale',
    value: 'BLONDE_ALE',
  },
  {
    label: 'Brown Ale',
    value: 'BROWN_ALE',
  },
  {
    label: 'Pale Ale',
    value: 'PALE_ALE',
  },
  {
    label: 'Sour Ale',
    value: 'SOUR_ALE',
  },
  {
    label: 'IPA',
    value: 'IPA',
  },
  {
    label: 'Wheat',
    value: 'WHEAT',
  },
  {
    label: 'Other',
    value: 'OTHER',
  },
]

const BOTTLE_CATEGORIES: BottleCategory[] = [
  {
    label: 'Wine',
    value: 'WINE',
    showYear: true,
    types: WINE_TYPES,
  },
  {
    label: 'Beer',
    value: 'BEER',
    types: BEER_TYPES,
  },
  {
    label: 'Spirit',
    value: 'SPIRIT',
  },
]

export default BOTTLE_CATEGORIES
