import { rest } from 'msw'

export const successHandlers = {
  postBottle: rest.post('/api/bottles', (req, res, ctx) => {
    return res(
      // ctx.delay(2000),
      ctx.status(200),
      ctx.json(req.body)
    )
  }),
}
export const errorHandlers = {
  postBottle: rest.post('/api/bottles', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: 'Could not add bottle' }))
  }),
}
