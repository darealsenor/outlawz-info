const {
  Client: DiscordClient,
  Collection,
  GatewayIntentBits,
} = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { logger } = require("../utility/logger");

const Discordclient = new DiscordClient({
  intents: [GatewayIntentBits.Guilds],
});

Discordclient.commands = new Collection();
Discordclient.cooldowns = new Collection();
const foldersPath = path.join(__dirname, "..", "/commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      Discordclient.commands.set(command.data.name, command);
    } else {
        logger.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

const eventsPath = path.join(__dirname, "../","events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    logger.info("Injected: %s", event.name);
    Discordclient.once(event.name, (...args) => event.execute(...args));
  } else {
    Discordclient.on(event.name, (...args) => event.execute(...args));
    logger.info("Injected: %s", event.name);
  }
}

module.exports = {
  Discordclient,
};