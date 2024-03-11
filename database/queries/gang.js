const { executeQuery } = require('../database')
async function getGangByName(name) {
  try {
    const query = await executeQuery(
      `SELECT c.identifier, c.name AS criminal_name, c.organization, p.name AS player_name, o.color
      FROM criminals AS c
      JOIN players AS p ON c.identifier = p.citizenid
      JOIN organizations AS o ON c.organization = o.name
      WHERE c.organization = ?`,
      [name],
    )
    return query
  } catch (error) {
    console.error('Error fetching gang by name', error)
    throw error
  }
}

module.exports = {
  getGangByName,
}

// FIX: the db connection
