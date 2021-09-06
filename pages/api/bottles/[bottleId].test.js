import { createMocks } from 'node-mocks-http'
import { MongoClient } from 'mongodb'

import handler from './[bottleId]'

describe('Given `/api/bottles/[bottleId]`', () => {
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

  describe('When PUT /bottles is hit', () => {
    it('should return the modified bottle', async () => {
      const modifiedBeerBottle = {
        ...mockBeerBottle,
        name: 'Heineken',
        volume: '3',
      }
      const { req, res } = createMocks({
        method: 'PUT',
        body: modifiedBeerBottle,
        query: {
          bottleId: mockBeerBottle._id,
        },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toEqual(modifiedBeerBottle)
    })
  })

  describe('When a NOT ALLOWED method is hit', () => {
    it('should return an error', async () => {
      const { req, res } = createMocks({
        method: 'PATCH',
        body: {},
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(405)
    })
  })
})
