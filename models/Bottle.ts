import { connectToDatabase } from '../lib/mongodb'

export const getBottles = async () => {
  const { db } = await connectToDatabase()

  const bottles = await db
    .collection('bottles')
    .find({})
    .sort({ name: 1 })
    .toArray()

  return bottles
}

export const getBottle = async (id) => {
  const { db } = await connectToDatabase()

  const bottles = await db.collection('bottles').findOne({ _id: id })

  return bottles
}

export const insertBottle = async (bottle) => {
  const { db } = await connectToDatabase()

  const insertedBottle = await db.collection('bottles').insertOne(bottle)

  return insertedBottle
}

export const updateBottle = async (id, bottle) => {
  const { db } = await connectToDatabase()

  const modifiedBottle = await db
    .collection('bottles')
    .updateOne({ _id: id }, { $set: bottle }, { upsert: true })

  return modifiedBottle
}
