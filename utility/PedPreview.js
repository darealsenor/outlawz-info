
const { createLogger } = require("winston");
const { getDBPage } = require("../models/notion");
const { deleteMessages } = require("./deleteMessages");
const { pedEmbed, pedMessage } = require("./embeds/ped");
require('dotenv').config()

const cachedResponseData = false;


async function PedPreview(client) {
  if (cachedResponseData) return;
  try {
    const deleteMsgAttempt = await deleteMessages(
      client,
      process.env.PED_CHANNEL
    );
    if (!deleteMsgAttempt)
      throw new Error("Could not delete messages, check channel ID?");

    const GetDBPage = await getDBPage(process.env.PED_DATABASE_ID);
    cachedEntries = getDBPage.results;
    const channel = await client.channels.cache.get(process.env.PED_CHANNEL);
    const entries = GetDBPage.results;
    entries.sort((entry1, entry2) => entry1.properties["ID"].unique_id.number - entry2.properties["ID"].unique_id.number);

    entries.forEach((entry) => {
      const { properties } = entry; // Access the properties object



      const pedData = {
        id: properties["ID"].unique_id.number,
        name: properties["Ped Name (IG)"].title[0].text.content,
        pedOwner: properties["Ped Owner (Discord ID)"].rich_text[0].text.content,
        secondFace: properties["Second Face"].checkbox,
        secondFaceOwner: this.secondFace
          ? false
          : properties["Second Face Owner"]?.rich_text[0]?.text?.content,
        imageURL: properties["Image URL"].url,
        color: properties['Color']?.select?.color ?? 'red'
    
      };


      const embed = pedEmbed(pedData)
      channel.send({embeds: [embed]})
    });

    await channel.send({embeds: [pedMessage()]})
  
    
  } catch (error) {
    throw error;
  }
}
module.exports = {
  PedPreview,
};
