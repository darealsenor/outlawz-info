const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs')
const { getGangByName } = require('../../models/queries/gang')
const { gangEmbed } = require('../../utility/embeds/gang')
const { pagination, ButtonTypes, ButtonStyles } = require('@devraelfreeze/discordjs-pagination')

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
    const gangInfo = await getGangByName(gang)
    const embed = gangEmbed(gangInfo, gang)
    // await pagination({
    //   embeds: embed /** Array of embeds objects */,
    //   author: interaction.member.user,
    //   interaction: interaction,
    //   ephemeral: false,
    //   time: 60000 /** 40 seconds */,
    //   disableButtons: false /** Remove buttons after timeout */,
    //   fastSkip: false,
    //   pageTravel: true,
    //   buttons: [
    //     {
    //       type: ButtonTypes.previous,
    //       label: 'Previous Page',
    //       style: ButtonStyles.Primary,
    //     },
    //     {
    //       type: ButtonTypes.next,
    //       label: 'Next Page',
    //       style: ButtonStyles.Success,
    //     },
    //   ],
    // })

    await interaction.reply({ embeds: [embed] })
  },
}
