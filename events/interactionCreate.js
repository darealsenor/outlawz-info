const { Events } = require('discord.js')
const { transferOwnerModal } = require('../utility/modals/transferOwner')

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    try {
      // Check for slash command
      if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName)
        if (!command) return

        await command.execute(interaction)
      }

      // Check for button click (after command check)
      if (interaction.isButton()) {
        if (interaction.customId === 'transfer_owner') {
          await interaction.showModal(transferOwnerModal)
        }
      }
    } catch (error) {
      console.error(error)
      await interaction.reply({ content: 'There was an error!', ephemeral: true })
    }
  },
}
