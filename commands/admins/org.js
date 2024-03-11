const { SlashCommandBuilder, PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js')
const fs = require('fs')
const gangs = JSON.parse(fs.readFileSync('gangs.json', { encoding: 'utf-8' }))

module.exports = {
  data: new SlashCommandBuilder()
    .setName('org')
    .setDescription('Select an org you want to view/modify')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) =>
      option
        .setName('gangs')
        .setDescription('Choose a gang')
        .setRequired(true)
        .setChoices(...gangs),
    ),

  async execute(interaction) {
    const gang = interaction.options.getString('gangs')

    // buttons
    const transferOwner = new ButtonBuilder()
      .setCustomId('transfer_owner')
      .setLabel(`Transfer ${gang} Owner`)
      .setStyle(ButtonStyle.Primary)

    const row = new ActionRowBuilder().addComponents(transferOwner)

    interaction.reply({
      content: `You choose ${gang}, choose one of the options below`,
      components: [row],
    })
  },
}

//
