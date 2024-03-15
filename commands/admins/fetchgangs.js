const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const fs = require('fs')
const { getAvailableGangs } = require('../../database/queries/gang')

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

      // Log the JSON data for debugging
      console.log(jsonData)

      // Write JSON data to file
      fs.writeFile('./gangs.json', jsonData, 'utf8', (err) => {
        if (err) {
          interaction.reply('Error occurred while updating gangs.')
          console.error('Error writing file:', err)
        } else {
          interaction.reply('Gangs updated successfully!')
        }
      })
    } catch (error) {
      // Reply with the error message
      interaction.reply('Error occurred: ' + error.message)

      // Log the error for debugging
      console.error('Error occurred:', error)
    }
  },
}
