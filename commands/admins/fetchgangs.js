const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const fs = require('fs')
const { getAvailableGangs } = require('../../models/queries/gang')
const { logger } = require('../../utility/logger')

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName('fetchgangs')
    .setDescription('Update all gangs in json db')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    try {
      const formattedGangs = await getAvailableGangs()
      const jsonData = JSON.stringify(formattedGangs)


      // Write JSON data to file
      fs.writeFile('./gangs.json', jsonData, 'utf8', (err) => {
        if (err) {
          interaction.reply('Error occurred while updating gangs.')
          logger.warn('Error writing file:', err)
        } else {
          interaction.reply('Gangs updated successfully!')
        }
      })
    } catch (error) {
      // Reply with the error message
      interaction.reply('Error occurred: ' + error.message)

      // Log the error for debugging
      logger.warn('Error occurred:', error)
    }
  },
}
