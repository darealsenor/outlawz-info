const { Client: NotionClient } = require("@notionhq/client");
require("dotenv").config();

const notion = new NotionClient({
  auth: process.env.NOTION_TOKEN,
});

async function getDBPage(database_id) {
  try {
    const response = await notion.databases.query({
      database_id,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

async function AddPedToDB(
  ped_name,
  ped_owner_id,
  ped_second_owner_id,
  ped_image,
) {
  try {
    const response = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: "2ad900d152694b4eb9fb0facd1188fbf",
      },
      properties: {
        "Ped Name (IG)": {
          title: [
            {
              text: {
                content: ped_name,
              },
            },
          ],
        },
        "Ped Owner (Discord ID)": {
          rich_text: [
            {
              text: {
                content: ped_owner_id,
              },
            },
          ],
        },
        "Second Face": {
          checkbox: ped_second_owner_id ? true : false,
        },
        "Second Face Owner": {
          rich_text: [
            {
              text: {
                content: ped_second_owner_id || "",
              },
            },
          ],
        },
        "Image URL": {
          url: ped_image,
        },
        Color: {
          select: {
            name: 'red',
            color: 'red',
          },
        },
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

async function RemovePedFromDB(id) {
  const getPeds = await getDBPage(process.env.PED_DATABASE_ID);
  let pageId;

  getPeds.results.forEach((ped) => {
    const { properties } = ped;

    if (properties["ID"].unique_id.number === id) {
      pageId = ped.id;
    }
  });

  if (pageId) {
    await notion.pages.update({
      page_id: pageId,
      archived: true,
    });
    return true;
  }

  return false;
}

async function RetreivePedInformation(ped_id) {
  const getPeds = await getDBPage(process.env.PED_DATABASE_ID);
  let data;

  // let data = getPeds.find(ped => {
  //   if (ped.results.properties['ID'].unique_id.number === ped_id) {
  //      return ped
  //   }
  //   return false
  // })

  // return data



  getPeds.results.forEach((ped) => {
    const { properties } = ped;
    if (properties["ID"].unique_id.number === ped_id) {
      data = ped;
    }
  });

  return data ? data : false;
}

// TODO: switch forEach methods in .some method

async function updatePedtoDB(
  page,
  ped_name,
  ped_owner_id,
  ped_second_owner_id,
  ped_image,
) {
  try {
    const response = await notion.pages.update({
      page_id: page,
      properties: {
        "Ped Name (IG)": {
          title: [
            {
              text: {
                content: ped_name,
              },
            },
          ],
        },
        "Ped Owner (Discord ID)": {
          rich_text: [
            {
              text: {
                content: ped_owner_id,
              },
            },
          ],
        },
        "Second Face": {
          checkbox: ped_second_owner_id ? true : false,
        },
        "Second Face Owner": {
          rich_text: [
            {
              text: {
                content: ped_second_owner_id || "",
              },
            },
          ],
        },
        "Image URL": {
          url: ped_image,
        },
        Color: {
          select: {
            name: 'red',
            color: 'red',
          },
        },
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  notion,
  getDBPage,
  AddPedToDB,
  RemovePedFromDB,
  RetreivePedInformation,
  updatePedtoDB,
};
