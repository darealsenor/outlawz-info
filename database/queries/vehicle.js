const { executeQuery } = require('../database')

async function getVehicleByPlate(plate) {
  try {
    const query = await executeQuery(
      'SELECT vehicle, garage_id, nickname, glovebox FROM player_vehicles WHERE PLATE = ?',
      [plate],
    )
    return query
  } catch (error) {
    return error
  }
}

//TODO: Get vehicle owner by CID aswell.

async function getVehiclesByCID(CID) {
  try {
    const query = await executeQuery(
      `SELECT vehicle, garage_id, nickname, plate FROM player_vehicles WHERE citizenid = ?`,
      [CID],
    )

    return query
  } catch (error) {
    return error
  }
}

module.exports = {
  getVehicleByPlate,
  getVehiclesByCID,
}
