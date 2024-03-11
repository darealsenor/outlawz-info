const mysql = require('mysql2/promise')

let pool

async function dbConnect() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })

    console.log('Connected to database')
  } catch (error) {
    console.error('Error connecting to database:', error)
    throw error // Re-throw the error for handling in the main program
  }
}

async function executeQuery(query, params = []) {
  try {
    const [results] = await pool.execute(query, params)
    return results
  } catch (error) {
    console.error('Error executing query:', error)
    throw error // Re-throw the error for handling
  }
}

module.exports = {
  dbConnect,
  executeQuery, // Expose the pool for other files
}
