import { ObjectId } from 'mongodb'

export type Bottle = {
  _id?: ObjectId
  category: 'WINE' | 'BEER' | 'SPIRIT'
  type?: string
  year?: string
  name: string
  volume: string
  quantity: number
}

export interface BottleType {
  label: string
  value: string
}

export interface BottleCategory {
  label: 'Wine' | 'Beer' | 'Spirit'
  value: 'WINE' | 'BEER' | 'SPIRIT'
  showYear?: boolean
  types?: {
    label: string
    value: string
  }[]
}

export type BottleFormState = {
  _id?: string
  category?: BottleCategory
  type?: BottleType
  year?: string
  name: string
  volume: string
  quantity: string
}
