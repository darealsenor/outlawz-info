const { executeQuery } = require('../database')
async function getPlayerByCID(CID) {
  try {
    const query = await executeQuery(
      `SELECT players.name, players.charinfo, players.money, criminals.organization, players.job, criminals.stats, players.citizenid
      FROM players
      INNER JOIN criminals ON players.citizenid = criminals.identifier
      WHERE JSON_EXTRACT(players.metadata, '$.discord') = 'discord:${CID.id}';
      ;`
    )

    if (query.length === 0) {
      throw new Error('That player does not exist or does not have criminal profile, sorry.')
    }

    return query
  } catch (error) {
    logger.warn('Error fetching player by CID:', error)
    throw error
  }
}

async function getPlayerByDiscord(DISCORD) {
  try {
    const query = await executeQuery(`
      SELECT citizenid, name
      FROM players 
      WHERE JSON_EXTRACT(metadata, '$.discord') LIKE '%discord:${DISCORD}%';
    `);

    if (query.length === 0) {
      throw new Error('No player found for the specified Discord ID.');
    }

    return query;
  } catch (error) {
    logger.warn('Error fetching', error);
    throw error;
  }
}


module.exports = {
  getPlayerByCID,
  getPlayerByDiscord
}

// FIX: the db connection
