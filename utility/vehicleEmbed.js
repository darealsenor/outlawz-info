const { EmbedBuilder } = require('discord.js')

function vehicleByPlateEmbed(returnedPlateData, plate) {
  const embedData = {
    vehicle: returnedPlateData[0].vehicle,
    garage: returnedPlateData[0].garage_id,
    nickname: returnedPlateData[0].nickname,
    glovebox: JSON.parse(returnedPlateData[0].glovebox) || null,
  }

  const embed = new EmbedBuilder()
    .setColor([255, 0, 0])
    .setTitle(`${embedData.vehicle}`)
    .setDescription(
      `
        ${plate}
      **Vehicle Information**
  ----------------------`,
    )
    .addFields({ name: 'Garage', value: `${embedData.garage}` || 'Could not find', inline: true })
    .addFields({ name: 'Nickname', value: `${embedData.nickname}` || 'No nick name', inline: true })

  if (embedData.glovebox.length > 0) {
    embed.addFields({
      name: `
          **Glovebox**`,
      value: '----------------------',
    })
    embedData.glovebox.forEach((item) => {
      embed.addFields({ name: `${item.count}x`, value: `${item.name}`, inline: true })
    })
  }

  return embed
}

function vehicleByCIDEmbed(returnedPlateData, cid) {
  // console.log(returnedPlateData)
  const embed = new EmbedBuilder()
    .setColor([255, 0, 0])
    .setTitle(`${cid}`)
    .setDescription(
      `      **Vehicle Information**
    ----------------------`,
    )

  returnedPlateData.forEach((vehicle) => {
    console.log(vehicle)
    embed.addFields({ name: 'Vehicle', value: vehicle.vehicle, inline: true }),
      embed.addFields({ name: 'Plate', value: vehicle.plate, inline: true }),
      embed.addFields({ name: 'Garage', value: vehicle.garage_id, inline: true })
  })

  return embed
}

module.exports = {
  vehicleByPlateEmbed,
  vehicleByCIDEmbed,
}
