import { Bottle, BottleFormState } from '../types/Bottle'

export const wineBottle: Bottle = {
  _id: '6127b44de29fea073d0109fb',
  category: 'WINE',
  type: 'RED',
  year: '1990',
  name: 'Barbera',
  volume: '14',
  quantity: 5,
  imageUrl: undefined,
}

export const beerBottle: Bottle = {
  _id: '612e027ed49ec3ae7c8f933a',
  category: 'BEER',
  type: 'LAGER',
  name: 'Hop House 13',
  volume: '4.3',
  quantity: 10,
  imageUrl: undefined,
  year: undefined,
}

export const spiritBottle: Bottle = {
  _id: '512e02ded49eg5ae7c8f9583',
  category: 'SPIRIT',
  name: 'Russian Standard Platinum Vodka',
  volume: '43',
  quantity: 1,
  imageUrl: undefined,
  year: undefined,
}

export const wineFormData: BottleFormState = {
  _id: '6127b44de29fea073d0109fb',
  category: {
    label: 'Wine',
    value: 'WINE',
    showYear: true,
    types: [
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
    ],
  },
  type: {
    label: 'Red',
    value: 'RED',
  },
  year: '1990',
  name: 'Barbera',
  volume: '14',
  quantity: '5',
}

export const beerFormData: BottleFormState = {
  _id: '612e027ed49ec3ae7c8f933a',
  category: {
    label: 'Beer',
    value: 'BEER',
    types: [
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
    ],
  },
  type: {
    label: 'Lager',
    value: 'LAGER',
  },
  name: 'Hop House 13',
  volume: '4.3',
  quantity: '10',
}
