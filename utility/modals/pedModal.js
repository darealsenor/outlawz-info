const {
  ActionRowBuilder,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

function pedModal(operation, data, pageId) {
  const modal = new ModalBuilder()
    .setCustomId(`ped-${operation}`)
    .setTitle(`${operation} ped`);

  const pedName = new TextInputBuilder()
    .setCustomId("ped_name")
    .setLabel("Enter the ped name")
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setPlaceholder("ig_masho")
    .setMinLength(3);

  const pedOwnerID = new TextInputBuilder()
    .setCustomId("ped_owner_id")
    .setLabel("Enter Discord ID of the ped owner")
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setMinLength(18)
    .setPlaceholder("481772420194107402")

  const secondFaceOwner = new TextInputBuilder()
    .setCustomId("ped_second_owner_id")
    .setLabel("If ped has second owner enter ID")
    .setStyle(TextInputStyle.Short)
    .setRequired(false)
    .setMinLength(18)
    .setPlaceholder("לא חובה אבל אם יש להוסיף");

  const pedImage = new TextInputBuilder()
    .setCustomId("ped_image")
    .setLabel("Enter the ped Image URL")
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setMinLength(15)
    .setPlaceholder("קישור של תמונה")

  const pedColor = new TextInputBuilder()
    .setCustomId("ped_color")
    .setLabel("Enter the ped color")
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setMinLength(3)
    .setPlaceholder(
      "pink/gold/purple/orange/white/black/yellow/green/blue/red"
  );

  const pageIdInput = new TextInputBuilder()
    .setCustomId("page_id")
    .setLabel("אם ריק לא לרשום כלום")
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setMinLength(3)
    .setValue(pageId || 'להתעלם')
    .setPlaceholder(
      "אם ריק לא לרשום כלום"
  );
  
  

  if (data) {
    pedName.setValue(data.ped_name)
    pedOwnerID.setValue(data.ped_owner)
    data.ped_second_owner ?? secondFaceOwner.setValue(data.ped_second_owner)
    pedImage.setValue(data.ped_image);
    pedColor.setValue(data.ped_color)
  }

  

  const firstActionRow = new ActionRowBuilder().addComponents(pedName);
  const secondActionRow = new ActionRowBuilder().addComponents(pedOwnerID);
  const thirdActionRow = new ActionRowBuilder().addComponents(secondFaceOwner);
  const fourthActionRow = new ActionRowBuilder().addComponents(pedImage);
  // const fifthActionRow = new ActionRowBuilder().addComponents(pedColor);
  const sixthActionRow = new ActionRowBuilder().addComponents(pageIdInput);


  // Add inputs to the modal
  modal.addComponents(
    firstActionRow,
    secondActionRow,
    thirdActionRow,
    fourthActionRow,
    // fifthActionRow,
    sixthActionRow,
  );



  // Show the modal to the user
  return modal;
}

module.exports = {
  pedModal,
};
