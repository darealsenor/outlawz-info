const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getPlayerByDiscord } = require('../../models/queries/player');

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName('cid')
    .setDescription('cid')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
	.addUserOption(option =>
		option.setName('target').setDescription('Get information on a player via discord id').setRequired(true)),
        
  async execute(interaction) {
    try {
          const target = interaction.options.getUser('target')
          const res = await getPlayerByDiscord(target.id)
          interaction.reply(`${target} CID is: ${res[0].citizenid} | Steam Name: ${res[0].name}`)
        
    } catch (error) {
      // Reply with the error message
      interaction.reply('Error occurred: ' + error.message)
    }
  },
}
