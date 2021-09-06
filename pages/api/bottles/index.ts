import { NextApiRequest, NextApiResponse } from 'next'

import { getBottles, getBottle, insertBottle } from '../../../models/Bottle'

export default async (
  { body, method }: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (method) {
    case 'GET': {
      const bottles = await getBottles()

      res.json(bottles)

      break
    }

    case 'POST': {
      const result = await insertBottle(body)
      const insertedBottle = await getBottle(result.insertedId)

      res.status(200).json(insertedBottle)

      break
    }

    default: {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
}
