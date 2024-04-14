const mysql = require('mysql2/promise')
const { logger } = require('../utility/logger')

let pool

function dbConnect(cb) {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })
    logger.info('Connected to database.')

    cb?.()
    return pool
  } catch (error) {
   logger.warn('Error connecting to database: %s', error)
    throw new Error(error) // Re-throw the error for handling in the main program
  }
}

async function executeQuery(query, params = []) {
  try {
    const [results] = await pool.execute(query, params)
    return results
  } catch (error) {
   logger.warn('Error executing query: %s', error)
    throw error // Re-throw the error for handling
  }
}

module.exports = {
  dbConnect,
  executeQuery, // Expose the pool for other files
}
