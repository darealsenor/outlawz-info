const { EmbedBuilder } = require('discord.js')

function gangEmbed(returnedGangData, gang) {
  const embeds = []
  const pageSize = 10 // Number of members per page
  let currentPage = 1

  // Create individual embeds for each page
  for (let i = 0; i < returnedGangData.length; i += pageSize) {
    const membersSlice = returnedGangData.slice(i, i + pageSize)

    const embed = new EmbedBuilder()
      .setColor(returnedGangData[0].color)
      .setTitle(`${gang} Gang (Page ${currentPage}) - total ${returnedGangData.length} members`)
      .setDescription('**In-Game Members**\n----------------------')
      .setTimestamp()
      .setThumbnail(returnedGangData[0].picture || null)

    membersSlice.forEach((member, index) => {
      embed.addFields({
        name: `${index + 1}`,
        value: `${member.player_name} - ${member.criminal_name} - ${member.identifier}`,
      })
    })

    embeds.push(embed)
    currentPage++
  }

  return embeds
}

module.exports = {
  gangEmbed,
}
