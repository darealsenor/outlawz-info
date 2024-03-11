const { EmbedBuilder } = require('discord.js')

function gangEmbed(returnedGangData, gang) {
  const embed = new EmbedBuilder()
    .setColor(returnedGangData[0].color)
    .setTitle(`${gang} Gang`)
    .setDescription(
      `
            **In-Game Members**
            ----------------------`,
    )

  returnedGangData.forEach((member, i) => {
    embed.addFields({
      name: `${i + 1}`,
      value: `${member.player_name} - ${member.criminal_name} - ${member.identifier}`,
      inline: false,
    })
  })
  return embed
}

module.exports = {
  gangEmbed,
}
