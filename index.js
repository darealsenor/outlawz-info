// Disord
const {Discordclient} = require('./models/DiscordClient')
// Database
const { dbConnect } = require('./models/database');
// Notion
require('./models/notion');
// Slash Commands
require('./handlers/slashCommands')
//Env
require('dotenv').config()


dbConnect()


Discordclient.login(process.env.TOKEN)
