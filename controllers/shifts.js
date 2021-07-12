const { getDatabase } = require('../db/database')
const { ObjectId } = require('mongodb')

const getAllShifts = async (req, reply) => {
  const db = await getDatabase()

  const shifts = await db
    .collection('shifts')
    .find({
      _id: {
        $not: { $eq: new ObjectId('60e8e49c114b1b7ea9a2d2ee') },
      },
    })
    .toArray()

  reply.send({ shifts })
}

const getShiftsTimeline = async (req, reply) => {
  const db = await getDatabase()

  const shiftsTimeline = await db
    .collection('shifts')
    .findOne({ _id: new ObjectId('60e8e49c114b1b7ea9a2d2ee') })

  reply.send({ shiftsTimeline })
}

const getLastShift = async (req, reply) => {
  const db = await getDatabase()

  const lastShift = await db
    .collection('shifts')
    .find()
    .limit(1)
    .sort({ $natural: -1 })
    .toArray()

  reply.send({ lastShift: lastShift[0] })
}

module.exports = {
  getAllShifts,
  getShiftsTimeline,
  getLastShift,
}
