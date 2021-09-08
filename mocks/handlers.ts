import { rest } from 'msw'

import { wineBottle, beerBottle } from './bottles'

export const successHandlers = {
  putBottle: rest.put('/api/bottles/:id', ({ body, params }, res, ctx) => {
    return res(ctx.status(200), ctx.json({ ...body, _id: params.id }))
  }),
  postBottle: rest.post('/api/bottles', ({ body }, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ ...body, _id: 'someidforthebottle' })
    )
  }),
  getBottles: rest.get('/api/bottles', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([wineBottle, beerBottle]))
  }),
  getBottlesEmpty: rest.get('/api/bottles', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),
}
export const errorHandlers = {
  postBottle: rest.post('/api/bottles/:id', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'Could not modify bottle' })
    )
  }),
  postBottle: rest.post('/api/bottles', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: 'Could not add bottle' }))
  }),
  getBottles: rest.get('/api/bottles', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: 'Could not get bottles' }))
  }),
}
