import { NextApiRequest, NextApiResponse } from 'next'

import { getBottle, updateBottle } from '../../../models/Bottle'

export default async (
  { body, method, query }: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (method) {
    case 'PUT': {
      await updateBottle(query.bottleId, body)
      const insertedBottle = await getBottle(query.bottleId)

      res.status(200).json(insertedBottle)

      break
    }

    default: {
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
}
