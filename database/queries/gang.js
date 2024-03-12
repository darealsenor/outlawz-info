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

async function getGangBoss(name) {
  try {
    const query = await executeQuery(`SELECT OWNER, name FROM organizations WHERE name = ?`, [name])
    return query
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function updateBossGang(cid, name) {
  try {
    const query = await executeQuery(`UPDATE organizations SET OWNER = ?  WHERE NAME = ? `, [cid, name])
    console.log(query)
    return query
  } catch (error) {
    console.error(error)
    return error
  }
}

async function getGangLeaderboard() {
  try {
    const query = await executeQuery(`SELECT c.organization,
    c.name,
    CAST(SUBSTR(c.stats, INSTR(c.stats, 'kills":') + LENGTH('kills":'), INSTR(c.stats, ',') - INSTR(c.stats, 'kills":') - LENGTH('kills":')) AS INT) AS kills
FROM criminals c
JOIN (
 SELECT organization,
        MAX(CAST(SUBSTR(stats, INSTR(stats, 'kills":') + LENGTH('kills":'), INSTR(stats, ',') - INSTR(stats, 'kills":') - LENGTH('kills":')) AS INT)) AS max_kills
 FROM criminals
 WHERE CAST(SUBSTR(stats, INSTR(stats, 'kills":') + LENGTH('kills":'), INSTR(stats, ',') - INSTR(stats, 'kills":') - LENGTH('kills":')) AS INT) > 0
 GROUP BY organization
) AS max_kills_per_org
ON c.organization = max_kills_per_org.organization
AND CAST(SUBSTR(c.stats, INSTR(c.stats, 'kills":') + LENGTH('kills":'), INSTR(c.stats, ',') - INSTR(c.stats, 'kills":') - LENGTH('kills":')) AS INT) = max_kills_per_org.max_kills;`)

    return query
  } catch (error) {
    console.error(error)
    return error
  }
}

async function getTopTenLeaderBoard() {
  try {
    const query = await executeQuery(`SELECT organization,
    name,
    CAST(SUBSTR(stats, INSTR(stats, 'kills":') + LENGTH('kills":'), INSTR(stats, ',') - INSTR(stats, 'kills":') - LENGTH('kills":')) AS INT) AS kills
FROM criminals
ORDER BY kills DESC
LIMIT 10;`)

    return query
  } catch (error) {
    console.error(error)
    console.log(error)
  }
}

module.exports = {
  getGangByName,
  getGangBoss,
  updateBossGang,
  getGangLeaderboard,
  getTopTenLeaderBoard,
}

// FIX: the db connection
