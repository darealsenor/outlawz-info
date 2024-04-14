const { executeQuery } = require('../database')
async function getGangByName(name) {
  try {

    const query = await executeQuery(
      `SELECT c.identifier, c.organization, 
      JSON_EXTRACT(p.metadata, '$.discord') AS discord, 
      o.color, o.picture, o.zones
FROM criminals AS c
JOIN players AS p ON c.identifier = p.citizenid
JOIN organizations AS o ON c.organization = o.name
WHERE c.organization = '${name}'
GROUP BY c.organization, JSON_EXTRACT(p.metadata, '$.discord'), o.color, o.picture, o.zones;
`,

    )
    return query
  } catch (error) {
    logger.warn(error)
    throw error
  }
}

async function getGangBoss(name) {
  try {
    const query = await executeQuery(`SELECT OWNER, name FROM organizations WHERE name = ?`, [name])
    return query
  } catch (error) {
    logger.warn(error)
    throw error
  }
}

async function updateBossGang(cid, name) {
  try {
    const query = await executeQuery(`UPDATE organizations SET OWNER = ?  WHERE NAME = ? `, [cid, name])
    return query
  } catch (error) {
    logger.warn(error)
    return error
  }
}

async function getGangLeaderboard() {
  try {
    const query = await executeQuery(`SELECT ranked.organization, ranked.kills, ranked.identifier, JSON_EXTRACT(p.metadata, '$.discord') AS discord
FROM (
    SELECT c.organization,
        c.name,
        c.identifier,
        CAST(JSON_EXTRACT(c.stats, '$.kills') AS UNSIGNED) AS kills,
        ROW_NUMBER() OVER (PARTITION BY c.organization ORDER BY CAST(JSON_EXTRACT(c.stats, '$.kills') AS UNSIGNED) DESC, c.name) AS row_num
    FROM criminals c
    WHERE c.organization != '' -- Exclude individuals with empty organization
    AND JSON_EXTRACT(c.stats, '$.kills') IS NOT NULL  -- Exclude records where kills are null
    AND CAST(JSON_EXTRACT(c.stats, '$.kills') AS UNSIGNED) > 0  -- Exclude records where kills are 0
) AS ranked
INNER JOIN players p ON p.citizenid = ranked.identifier
WHERE row_num = 1
ORDER BY kills DESC;
;
    
    
`)

    return query
  } catch (error) {
    logger.warn(error)
    return error
  }
}

async function getTopTenLeaderBoard() {
  try {
    const query = await executeQuery(`
    SELECT c.NAME,
    c.identifier,
    JSON_EXTRACT(c.stats, '$.kills') AS kills,
    JSON_EXTRACT(c.stats, '$.headshots') AS headshots,
    c.organization,
    JSON_EXTRACT(p.metadata, '$.discord') AS discord
FROM criminals c
LEFT JOIN players p ON c.identifier = p.citizenid
ORDER BY CAST(JSON_EXTRACT(c.stats, '$.kills') AS UNSIGNED) DESC
LIMIT 10;
    `)

    return query
  } catch (error) {
    logger.warn(error) // Log the custom error message
    throw new Error(error) // Throw a new error with the custom message
  }
}

async function getAvailableGangs() {
  try {
    const query = await executeQuery(`SELECT DISTINCT name
FROM organizations
WHERE name IS NOT NULL AND name != '';`)

    // Format the query result as required
    return query.map((gang) => ({
      name: gang.name,
      value: gang.name.toLowerCase(),
    }))
  } catch (error) {
    logger.warn(error)
    throw new Error(error.message)
  }
}

module.exports = {
  getGangByName,
  getGangBoss,
  updateBossGang,
  getGangLeaderboard,
  getTopTenLeaderBoard,
  getAvailableGangs,
}

// FIX: the db connection
