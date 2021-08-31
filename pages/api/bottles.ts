import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'

export default async (
  { body, method }: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { db } = await connectToDatabase()

  const getBottles = async () => {
    const bottles = await db
      .collection('bottles')
      .find({})
      .sort({ name: 1 })
      .toArray()

    return bottles
  }

  switch (method) {
    case 'GET': {
      const bottles = await getBottles()

      res.json(bottles)

      break
    }

    case 'POST': {
      const result = await db.collection('bottles').insertOne(body)
      const insertedBottle = await db
        .collection('bottles')
        .findOne({ _id: result.insertedId })

      res.status(200).json(insertedBottle)

      break
    }

    default: {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
}
