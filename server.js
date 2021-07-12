const fastify = require('fastify')({ logger: false })

fastify.register(require('fastify-cors'), {
  origin: '*',
})

fastify.register(require('./routes/engineers'))

const start = async () => {
  try {
    await fastify.listen(3001)
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()
