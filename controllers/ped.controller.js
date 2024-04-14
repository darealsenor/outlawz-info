const { roleMention } = require("discord.js");
const {
  AddPedToDB,
  RemovePedFromDB,
  updatePedtoDB,
} = require("../models/notion");
const { PedFieldsFromModal } = require("../utility/PedFieldsFromModal");
const { PedPreview } = require("../utility/PedPreview");

async function HandleAddPed(interaction) {
  try {
    const {
      ped_name,
      ped_owner_id,
      ped_second_owner_id,
      ped_image,
      // ped_color,
    } = await PedFieldsFromModal(interaction);

    const addPedToDB = await AddPedToDB(
      ped_name,
      ped_owner_id,
      ped_second_owner_id,
      ped_image
      // ped_color
    );

    interaction.reply({
      content: `Added Ped: ${ped_name}, to ${roleMention(ped_owner_id)}. 
          image: ${ped_image},
          ${
            ped_owner_id ??
            `Second face owner: ${roleMention(ped_second_owner_id)} `
          }
          `,
    });
  } catch (error) {
    interaction.reply({ content: error.message });
    throw error;
  }
}

async function HandleRemovePed(PedNumber) {
  try {
    const response = await RemovePedFromDB(PedNumber);
    return response;
  } catch (error) {
    throw error;
  }
}

async function HandleUpdatePed(interaction) {
  try {
    const { ped_name, ped_owner_id, ped_second_owner_id, ped_image, page_id } =
      await PedFieldsFromModal(interaction);

    await updatePedtoDB(
      page_id,
      ped_name,
      ped_owner_id,
      ped_second_owner_id,
      ped_image
    );

    return {ok: true, data: {page_id, ped_name, ped_owner_id, ped_second_owner_id, ped_image}}

  } catch (error) {
    return {ok: false, error: error.message}
  }
}

module.exports = {
  HandleAddPed,
  HandleRemovePed,
  HandleUpdatePed,
};
