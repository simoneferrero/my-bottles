export type Bottle = {
  _id: string
  category: 'WINE' | 'BEER' | 'SPIRIT'
  type: string
  year?: string
  name: string
  volume: string
  quantity: number
}
