const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { pedModal } = require("../../utility/modals/pedModal");
const { HandleRemovePed } = require("../../controllers/ped.controller");
const { RetreivePedInformation } = require("../../models/notion");
const { PedPreview } = require("../../utility/PedPreview");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ped")
    .setDescription("Add/Remove/Update/Delete a ped from the database")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addSubcommand((add) =>
      add.setName("add").setDescription("Add a ped to the database.")
    )
    .addSubcommand((remove) =>
      remove
        .setName("remove")
        .setDescription("remove a ped to the database.")
        .addNumberOption((option) =>
          option
            .setName("number")
            .setDescription("Ped number from the Docs")
            .setRequired(true)
        )
    )
    .addSubcommand((update) =>
      update
        .setName("update")
        .setDescription("update a ped to the database.")
        .addNumberOption((option) =>
          option
            .setName("number")
            .setDescription("Ped number from the Docs")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    try {
      switch (interaction.options.getSubcommand()) {
        case "add": {
          await interaction.showModal(pedModal("add"));

          break;
        }
        case "remove": {
          const ped = interaction.options.getNumber("number", true);
          const res = await HandleRemovePed(ped);
          if (res) {
            interaction.reply("Ped removed");
            await PedPreview(interaction.client);

          }

          break;
        }
        case "update": {
          const ped = interaction.options.getNumber("number", true);
          const PedData = await RetreivePedInformation(ped);
          const PedFields = {
            ped_name: PedData.properties["Ped Name (IG)"].title[0].text.content,
            ped_owner: PedData.properties["Ped Owner (Discord ID)"].rich_text[0].text.content,
            ped_second_owner: PedData.properties["Second Face"].checkbox
              ? PedData.properties["Second Face Owner"].rich_text[0].text.content
              : false,
            ped_image: PedData.properties['Image URL'].url,
            ped_color: PedData.properties["Color"].select.color,
          };
          await interaction.showModal(pedModal("update", PedFields, PedData.id));

          break;
        }
      }
    } catch (error) {
      // Reply with the error message
      logger.warn(error);
      interaction.reply("Error occurred: " + error.message);
    }
  },
};
