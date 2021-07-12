const {
  pickNextEngineers,
  getAllEngineers,
} = require('../controllers/engineers')
const {
  getAllShifts,
  getShiftsTimeline,
  getLastShift,
} = require('../controllers/shifts')

function itemRoutes(fastify, options, done) {
  fastify.get('/pickEngineers', pickNextEngineers)
  fastify.get('/engineers', getAllEngineers)

  fastify.get('/shifts', getAllShifts)
  fastify.get('/shiftsTimeline', getShiftsTimeline)
  fastify.get('/lastShift', getLastShift)

  done()
}

module.exports = itemRoutes
