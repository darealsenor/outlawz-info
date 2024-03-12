const { SlashCommandBuilder } = require('discord.js')
const { getVehicleByPlate, getVehiclesByCID } = require('../../database/queries/vehicle')
const { vehicleByPlateEmbed, vehicleByCIDEmbed } = require('../../utility/vehicleEmbed')
module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName('vehicle')
    .setDescription('Retreive Player vehicles')
    .addStringOption((option) =>
      option.setName('type').setDescription('Search by CID or Plate?').setRequired(true).addChoices(
        { name: 'CID', value: 'cid' }, // Use lowercase for consistency
        { name: 'Plate', value: 'plate' },
      ),
    )
    .addStringOption((option) =>
      option
        .setName('number')
        .setDescription('Enter CID or plate number (6-10 characters)') // Clarify length requirement
        .setRequired(true)
        .setMinLength(6)
        .setMaxLength(10),
    ),

  async execute(interaction) {
    const searchType = interaction.options.getString('type')
    const searchValue = interaction.options.getString('number')

    let vehicle
    try {
      if (searchType === 'plate') {
        vehicle = await getVehicleByPlate(searchValue)
        const embed = vehicleByPlateEmbed(vehicle, searchValue)
        interaction.reply({ embeds: [embed] })
      } else if (searchType === 'cid') {
        vehicle = await getVehiclesByCID(searchValue)
        const embed = vehicleByCIDEmbed(vehicle, searchValue)
        interaction.reply({ embeds: [embed] })
      } else {
        throw new Error('Unknown search type')
      }

      if (!vehicle) {
        interaction.reply({ content: 'No vehicle found for the provided search.' })
      }
    } catch (error) {
      console.error(error)
      interaction.reply('Could not find the vehicle / CID.')
    }
  },
}
