const { Events } = require('discord.js')
const { PedPreview } = require('../utility/pedPreview')
const { logger } = require('../utility/logger')

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    logger.info(`Ready! Logged in as ${client.user.tag}`);

    await PedPreview(client)
  },
}
