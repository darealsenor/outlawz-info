const { Events, Collection, userMention } = require('discord.js')
const {HandleAddPed, HandleUpdatePed} = require('../controllers/ped.controller')
const { PedPreview } = require('../utility/PedPreview')
const { logger } = require('../utility/logger')

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {


    if (interaction.customId === 'ped-add'){
      await HandleAddPed(interaction)
      await PedPreview(interaction.client)
    }

    if (interaction.customId === 'ped-update') {
      const result = await HandleUpdatePed(interaction)
      if (result.ok) {
        return await interaction.reply('הפד עודכן אין לי כוח לרשום מה התעדכן פה תסתדר')
      }
      return await interaction.reply('משהו לא פסדר פה וגם פה אין לי כוח לרשום מה')
      await PedPreview(interaction.client);
    }


    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
      logger.warn(`No command matching ${interaction.commandName} was found.`)
      return
    }

    const { cooldowns } = interaction.client

    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.data.name)
    const defaultCooldownDuration = 3
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000)
        return interaction.reply({
          content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
          ephemeral: true,
        })
      }
    }

    timestamps.set(interaction.user.id, now)
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount)

    try {
      await command.execute(interaction)
    } catch (error) {
      logger.warn(error)
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
      }
    }



    
  },
}
