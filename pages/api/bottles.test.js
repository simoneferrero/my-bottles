import { createMocks } from 'node-mocks-http'
import { MongoClient } from 'mongodb'

import handler from './bottles'

describe('Given `/api/bottles`', () => {
  const mockBeerBottle = {
    _id: 'beer123',
    category: 'BEER',
    type: 'LAGER',
    name: 'Hop House 13',
    quantity: '6',
    volume: '4.6',
  }
  let connection
  let db

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    db = await connection.db(process.env.MONGODB_DB)
  })

  beforeEach(async () => {
    const bottles = db.collection('bottles')

    await bottles.deleteMany()

    await bottles.insertOne(mockBeerBottle)
  })

  afterAll(async () => {
    await connection.close()
  })

  describe('When GET /bottles is hit', () => {
    it('should return all bottles', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toEqual([mockBeerBottle])
    })
  })

  describe('When POST /bottles is hit', () => {
    it('should return the inserted bottle', async () => {
      const newBottle = {
        _id: 'wine123',
        category: 'WINE',
        type: 'RED',
        name: 'Barbera',
        quantity: '5',
        volume: '14',
      }
      const { req, res } = createMocks({
        method: 'POST',
        body: newBottle,
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toEqual(newBottle)
    })
  })

  describe('When PUT /bottles is hit', () => {
    it('should return an error', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        body: {},
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(405)
    })
  })
})
