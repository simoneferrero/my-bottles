import { rest } from 'msw'

import { wineBottle, beerBottle } from './bottles'

export const successHandlers = {
  postBottle: rest.post('/api/bottles', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body))
  }),
  getBottles: rest.get('/api/bottles', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([wineBottle, beerBottle]))
  }),
  getBottlesEmpty: rest.get('/api/bottles', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),
}
export const errorHandlers = {
  postBottle: rest.post('/api/bottles', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: 'Could not add bottle' }))
  }),
  getBottles: rest.get('/api/bottles', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: 'Could not get bottles' }))
  }),
}
