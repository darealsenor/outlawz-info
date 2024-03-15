const { EmbedBuilder } = require('discord.js')

function leaderboardEmbed(returnedLeaderboardData, type) {
  const embed = new EmbedBuilder()
    .setColor([255, 0, 0])
    .setTitle(type === 'gang' ? 'Each gang top player' : 'Overall Top Players')
    .setDescription(
      `
            **Leaderboard Data**
            ----------------------`,
    )
    .setTimestamp()

  returnedLeaderboardData.forEach((member, i) => {
    if (member.organization == '' || !member.organization) {
      return
    }
    console.log(member)
    embed.addFields({
      name: `${member.organization}`,
      value: `**${i + 1}#** - ${member.name} - ${member.kills} Kills ${
        type !== 'gang' ? `(${member.headshots} HS)` : ''
      }`,
      inline: true,
    })
  })
  return embed
}

module.exports = {
  leaderboardEmbed,
}
