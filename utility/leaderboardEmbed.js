const { EmbedBuilder } = require('discord.js')

function leaderboardEmbed(returnedLeaderboardData) {
  const embed = new EmbedBuilder()
    .setColor([255, 0, 0])
    .setTitle(`Each Gang Top Player`)
    .setDescription(
      `
            **Leaderboard Data**
            ----------------------`,
    )
    .setTimestamp()

  returnedLeaderboardData
    .sort((a, b) => a.kills - b.kills)
    .forEach((member) => {
      if (member.organization == '' || !member.organization) {
        return
      }
      console.log(member)
      embed.addFields({ name: `${member.organization}`, value: `${member.name} - ${member.kills} Kills`, inline: true })
    })
  return embed
}

module.exports = {
  leaderboardEmbed,
}
