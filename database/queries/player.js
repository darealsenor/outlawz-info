const { executeQuery } = require('../database')
async function getPlayerByCID(CID) {
  try {
    const query = await executeQuery(
      `SELECT players.name, players.charinfo, players.money, criminals.organization, players.job, criminals.stats
      FROM players
      INNER JOIN criminals ON players.citizenid = criminals.identifier
      WHERE players.citizenid = ?;`,
      [CID],
    )
    return query
  } catch (error) {
    console.error('Error fetching player by CID:', error)
    throw error
  }
}

module.exports = {
  getPlayerByCID,
}

// FIX: the db connection
