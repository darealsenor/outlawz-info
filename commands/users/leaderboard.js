const { SlashCommandBuilder } = require('discord.js')
const { getGangLeaderboard, getTopTenLeaderBoard } = require('../../database/queries/gang')
const { leaderboardEmbed } = require('../../utility/leaderboardEmbed')

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
    const type = interaction.options.getString('type')

    let embed

    if (type === 'gang') {
      const res = await getGangLeaderboard()
      embed = leaderboardEmbed(res)
      //   console.log(res)
    }

    if (type === 'everyone') {
      const res = await getTopTenLeaderBoard()
      embed = leaderboardEmbed(res)
    }
    await interaction.reply({ embeds: [embed] })
  },
}
