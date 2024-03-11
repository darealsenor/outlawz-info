const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

const transferOwnerModal = new ModalBuilder().setCustomId('transferOwner_modal').setTitle('Transfer Owner')

// Add components to modal

// Create the text input components
const transferOwner_input = new TextInputBuilder()
  .setCustomId('transferOwner_input')
  // The label is the prompt the user sees for this input
  .setLabel('Paste the CID')
  // Short means only a single line of text
  .setStyle(TextInputStyle.Short)

// An action row only holds one text input,
// so you need one action row per text input.
const firstActionRow = new ActionRowBuilder().addComponents(transferOwner_input)

// Add inputs to the modal
transferOwnerModal.addComponents(firstActionRow)

module.exports = { transferOwnerModal }
