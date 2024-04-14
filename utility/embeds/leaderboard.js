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


    let msg = '';
    // embed.addFields({
    //   name: `${member.organization}`,
    //   value: `**${i + 1}#** - ${member.name} - ${member.kills} Kills ${
    //     type !== 'gang' ? `(${member.headshots} HS)` : ''
    //   }`,
    //   inline: true,
    // })

    returnedLeaderboardData.forEach((member, index) => {
      msg = msg + `${index + 1} - <@${member.discord.replace('discord:', '').replace(/['"]+/g, '')}> - ${member.identifier} - ${type === 'gang' ? `${member.kills} Kills` : `${member.kills} (${(member.headshots / member.kills).toFixed(2)} HS Rate)`}\n`
    })


    embed.addFields({name:'Gangs Leaderboard',value: msg})

  return embed
}

module.exports = {
  leaderboardEmbed,
}
