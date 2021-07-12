const { MongoClient, Logger } = require('mongodb')
const url = require('url')
require('dotenv').config()

let cachedDb

async function getDatabase(uri = process.env.DATABASE_URL) {
  Logger.setLevel('info')

  if (cachedDb) {
    return cachedDb
  }

  if (!uri) {
    throw new Error('Unable to connect to database, no URI  provided')
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const dbName = url.parse(uri).pathname.substr(1)

  if (!dbName) {
    throw new Error('Unable to derive a dbName to connect to')
  }

  const db = await client.db(dbName)

  cachedDb = db
  return db
}

module.exports = {
  getDatabase,
}
