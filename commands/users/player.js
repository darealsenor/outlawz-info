const { SlashCommandBuilder } = require('discord.js')
const { getPlayerByCID } = require('../../database/queries/player')
const { playerEmbed } = require('../../utility/playerEmbed')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('player')
    .setDescription('Retreive Players information')
    .addStringOption((option) => option.setName('cid').setDescription('Player cid').setRequired(true)),
  async execute(interaction) {
    const CID = interaction.options.getString('cid')
    const fullInfo = await getPlayerByCID(CID)
    const embed = playerEmbed(fullInfo, CID)

    // console.log(embedData)
    await interaction.reply({ embeds: [embed] })
    return
  },
}
