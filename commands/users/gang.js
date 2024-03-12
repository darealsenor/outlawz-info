const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs')
const { getGangByName } = require('../../database/queries/gang')
const { gangEmbed } = require('../../utility/gangEmbed')

const gangs = JSON.parse(fs.readFileSync('gangs.json', { encoding: 'utf-8' }))

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName('gang')
    .setDescription('Reterive information on a gang')
    .addStringOption((option) =>
      option
        .setName('gangs')
        .setDescription('Choose a gang')
        .setRequired(true)
        .setChoices(...gangs),
    ),

  async execute(interaction) {
    const gang = interaction.options.getString('gangs')
    console.log(gang)
    const gangInfo = await getGangByName(gang)
    const embed = gangEmbed(gangInfo, gang)
    interaction.reply({ embeds: [embed] })
  },
}
