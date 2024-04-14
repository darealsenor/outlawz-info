const { SlashCommandBuilder } = require('discord.js')
const { getGangLeaderboard, getTopTenLeaderBoard } = require('../../models/queries/gang')
const { leaderboardEmbed } = require('../../utility/embeds/leaderboard')
const { errorEmbed } = require('../../utility/embeds/error')
const { logger } = require('../../utility/logger')

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Reterive turfs leaderboard (Kills)')
    .addStringOption((option) =>
      option
        .setName('type')
        .setDescription('Choose weather you want leaderboard of gang or total players')
        .setRequired(true)
        .setChoices({ name: 'gang', value: 'gang' }, { name: 'everyone', value: 'everyone' }),
    ),

  async execute(interaction) {
    let embed
    try {
      const type = interaction.options.getString('type')
      let res

      if (type === 'gang') {
        res = await getGangLeaderboard()
      } else if (type === 'everyone') {
        res = await getTopTenLeaderBoard()
      }

      embed = leaderboardEmbed(res, type)
    } catch (error) {
      logger.warn('Caught Error: %s', error.message)
      embed = errorEmbed(error.message)
    }

    await interaction.reply({ embeds: [embed] })
  },
}
