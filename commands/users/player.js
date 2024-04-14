const { SlashCommandBuilder } = require('discord.js')
const { getPlayerByCID } = require('../../models/queries/player')
const { playerEmbed } = require('../../utility/embeds/player')

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName('player')
    .setDescription('Retreive Players information')
    .addUserOption(option =>
      option.setName('target').setDescription('Get information on a player via discord id').setRequired(true)),
  async execute(interaction) {


    try {
      const target = interaction.options.getUser('target')
      const fullInfo = await getPlayerByCID(target)
      const embed = playerEmbed(fullInfo, target)
  
      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      await interaction.reply(error.message)
    }
  },
}
