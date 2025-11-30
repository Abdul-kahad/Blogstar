const mongoose = require('mongoose')

const mongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Connected to database: ${conn.connection.host}`)
  } catch (error) {
    console.log('Error connecting to database', error)
    process.exit(1)
  }
}

module.exports = mongoDB