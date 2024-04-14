const { EmbedBuilder } = require('discord.js')

function pedEmbed(data) {
  const color = colorToHexRGB(data.color)
    const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(`${data.id} - ${data.name}`)
    .setDescription(`.`)
    .setTimestamp()
    .addFields({name: 'Ped Owner:', value: `<@${data.pedOwner}>`})
    .setImage(data.imageURL)

    if (data.secondFace){
      embed.addFields({name: 'Second Ped Owner:', value: `<@${data.secondFaceOwner}>` })
    }

    return embed
}

function pedMessage(){
  const embed = new EmbedBuilder()
  .setColor([255,255,255])
  .setTitle('Outlawz Peds')
  .setDescription(`
  הפד חסר? תמונה לא עובדת? תפתחו טיקט או לפנות ל <@440221458774622218>

  קישור לטבלת פדים התפוסים: https://sprout-marjoram-d85.notion.site/2ad900d152694b4eb9fb0facd1188fbf?v=93b796443f584490b80a0c1e2679ba2a&pvs=74

  רוצים גם פד? https://outlawz.tebex.io/category/peds
  `)

  return embed
}

function colorToHexRGB(color) {
  const colorMap = {
    pink: [255, 192, 203],
    gold: [255, 215, 0],
    purple: [128, 0, 128],
    orange: [255, 165, 0],
    white: [255, 255, 255],
    black: [0, 0, 0],
    default: [0, 0, 0],
    yellow: [255, 255, 0],
    green: [0, 128, 0],
    blue: [0, 0, 255],
    red: [255, 0, 0],
  };

  return colorMap[color.toLowerCase()];
}



module.exports = {
  pedEmbed,
  pedMessage
}