const { EmbedBuilder } = require('discord.js')

function errorEmbed(data) {
  const embed = new EmbedBuilder().setColor([255, 0, 0]).setTitle('Outlawz - Error').setDescription(data).setTimestamp()

  return embed
}

module.exports = {
  errorEmbed,
}
