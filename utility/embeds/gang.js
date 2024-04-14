const { EmbedBuilder } = require('discord.js')

function gangEmbed(returnedGangData, gang) {
  // const embeds = []
  // const pageSize = 10 // Number of members per page
  // let currentPage = 1

 

  // // Create individual embeds for each page
  // for (let i = 0; i < returnedGangData.length; i += pageSize) {
  //   const membersSlice = returnedGangData.slice(i, i + pageSize)

  //   const embed = new EmbedBuilder()
  //     .setColor(returnedGangData[0].color)
  //     .setTitle(`${gang} Gang (Page ${currentPage}) - total ${returnedGangData.length} members`)
  //     .setDescription('**In-Game Members**\n----------------------')
  //     .setTimestamp()
  //     .setThumbnail(returnedGangData[0].picture || null)

  //   membersSlice.forEach((member, index) => {
  //     embed.addFields({
  //       name: `${index + 1}`,
  //       value: `${member.player_name} - ${member.criminal_name} - ${member.identifier}`,
  //     })
  //   })

  //   embeds.push(embed)
  //   currentPage++
  // }

  const embed = new EmbedBuilder()
      .setColor(returnedGangData[0].color)
      .setTitle(`${gang} Gang - total ${returnedGangData.length} members`)
      .setDescription('**In-Game Members**\n----------------------')
      .setTimestamp()
      .setThumbnail(returnedGangData[0].picture || null)

      let msg = '';

      returnedGangData.forEach((member, index) => {
        // fields.push({name: String(index + 1), value: `<@${member.discord.replace('discord:', '').replace(/['"]+/g, '')}>`})
        msg = msg + `${index + 1} - <@${member.discord.replace('discord:', '').replace(/['"]+/g, '')}> - ${member.identifier}\n`

      })


      embed.addFields({name:'Gang Members',value: msg})


  return embed
}

module.exports = {
  gangEmbed,
}
