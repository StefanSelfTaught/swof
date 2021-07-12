const { getDatabase } = require('../db/database')
const { ObjectId } = require('mongodb')

const pickNextEngineers = async (req, reply) => {
  const db = await getDatabase()

  const shiftsData = await db.collection('shifts').findOne({
    _id: new ObjectId('60e8e49c114b1b7ea9a2d2ee'),
  })

  if (shiftsData.days === 5) {
    const lastDayOfWeekE = await db
      .collection('shifts')
      .findOne({ day: 5, week: shiftsData.weeks + 1 })

    const shiftsDataUpdatedWeeks = await db
      .collection('shifts')
      .findOneAndUpdate(
        {
          _id: new ObjectId('60e8e49c114b1b7ea9a2d2ee'),
        },
        {
          $inc: { weeks: 1 },
          $set: { days: 1 },
        },
        { returnDocument: 'after' }
      )

    const collection = await db.collection('engineers').find({
      $and: [
        { shift: shiftsDataUpdatedWeeks.value.weeks },
        {
          name: {
            $ne: lastDayOfWeekE.firstEngineer,
          },
        },
        {
          name: {
            $ne: lastDayOfWeekE.secondEngineer,
          },
        },
      ],
    })

    collection.toArray().then(async (engineers) => {
      const shuffled = engineers.sort(() => {
        return 0.5 - Math.random()
      })
      const selectedEngineers = shuffled.slice(0, 2)

      await db.collection('shifts').insertOne({
        firstEngineer: selectedEngineers[0].name,
        secondEngineer: selectedEngineers[1].name,
        week: shiftsDataUpdatedWeeks.value.weeks + 1,
        day: shiftsDataUpdatedWeeks.value.days,
        date: new Date(Date.now()).toISOString(),
      })

      selectedEngineers.forEach(async (engineer) => {
        const emp = await db
          .collection('engineers')
          .updateOne(
            { _id: new ObjectId(engineer._id) },
            { $inc: { shift: 1 } }
          )
      })

      reply.send({ engineers: selectedEngineers })
    })
  } else {
    const collection = await db
      .collection('engineers')
      .aggregate([{ $match: { shift: shiftsData.weeks } }])

    collection.toArray().then(async (engineers) => {
      const shuffled = engineers.sort(() => {
        return 0.5 - Math.random()
      })

      const selectedEngineers = shuffled.slice(0, 2)

      await db.collection('shifts').insertOne({
        firstEngineer: selectedEngineers[0].name,
        secondEngineer: selectedEngineers[1].name,
        week: shiftsData.weeks + 1,
        day: shiftsData.days + 1,
        date: new Date(Date.now()).toISOString(),
      })

      await db.collection('shifts').updateOne(
        {
          _id: new ObjectId('60e8e49c114b1b7ea9a2d2ee'),
        },
        {
          $inc: { days: 1 },
        }
      )

      selectedEngineers.forEach(async (engineer) => {
        await db
          .collection('engineers')
          .updateOne(
            { _id: new ObjectId(engineer._id) },
            { $inc: { shift: 1 } }
          )
      })

      reply.send({ engineers: selectedEngineers })
    })
  }
}

const getAllEngineers = async (req, reply) => {
  const db = await getDatabase()

  const engineers = await db.collection('engineers').find().toArray()

  reply.send({ engineers })
}

module.exports = {
  pickNextEngineers,
  getAllEngineers,
}
