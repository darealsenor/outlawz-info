const { logger } = require("./logger");

async function PedFieldsFromModal(interaction) {
  try {
        const [
          ped_name,
          ped_owner_id,
          ped_second_owner_id,
          ped_image,
          page_id,
        ] = [
          interaction.fields.getTextInputValue("ped_name"),
          interaction.fields.getTextInputValue("ped_owner_id"),
          interaction.fields.getTextInputValue("ped_second_owner_id") || false,
          interaction.fields.getTextInputValue("ped_image"),
          interaction.fields.getTextInputValue("page_id"),
        ];
  
    

        const checkimage = await fetch(ped_image);
        if (!checkimage.ok) {
          return 'Invalid Image URL'
        }

        return { ped_name, ped_owner_id, ped_second_owner_id, ped_image, page_id};
  } catch (error) {
    logger.warn('Error adding ped: ', error)
    throw error
  }

  }

  module.exports = { 
    PedFieldsFromModal
  }