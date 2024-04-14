const { EmbedBuilder } = require('discord.js')

function playerEmbed(returnedCidData, CID) {
  const embedData = {
    name: returnedCidData[0].name,
    assets: JSON.parse(returnedCidData[0].money),
    org: returnedCidData[0].organization,
    charinfo: JSON.parse(returnedCidData[0].charinfo),
    job: JSON.parse(returnedCidData[0].job),
    stats: JSON.parse(returnedCidData[0].stats),
    cid: returnedCidData[0].citizenid
  }

  const embed = new EmbedBuilder()
    .setColor([255, 0, 0])
    .setTitle(`${embedData.name}`)
    .setDescription(
      `
      ${CID} - ${embedData.cid}
          **General Information**
          ----------------------`,
    )
    .addFields({
      name: 'Name',
      value: `${embedData.charinfo.firstname} ${embedData.charinfo.lastname}`,
      inline: true,
    })
    .addFields({ name: 'Job:', value: `${embedData.job.name} - ${embedData.job.label}`, inline: true })

  if (embedData.org) {
    embed.addFields({
      name: 'Gang:',
      value: `${embedData.org}`,
      inline: false,
    })
  }

  if (embedData.stats) {
    embed.addFields({
      name: `
            **Turf Stats**`,
      value: '----------------------',
    })

    embed.addFields({ name: 'Kills', value: `${embedData.stats.kills ?? 0}`, inline: true })
    embed.addFields({ name: 'Headshots', value: `${embedData.stats.headshots ?? 0}`, inline: true })
    embed.addFields({ name: 'Captured', value: `${embedData.stats.captured ?? 0}`, inline: true })
    embed.addFields({ name: 'HS/Kill Ratio', value: `${(embedData.stats.headshots / embedData.stats.kills).toFixed(2)} Headshots per kill average`, inline: true })
  }

  return embed
}

module.exports = {
  playerEmbed,
}
