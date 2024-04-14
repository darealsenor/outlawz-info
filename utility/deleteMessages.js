const { logger } = require("./logger");

async function deleteMessages(client, channel_id){
    const channel = await client.channels.cache.get(channel_id);
  
    if (!channel) {
      logger.warn('Failed to find channel:', channel_id);
      return;
    }
  
    try {
      let deletedMessages = 0;
      let messagesToDelete;
  
      do {
        messagesToDelete = await channel.messages.fetch({ limit: 100 });
  
        if (messagesToDelete.size > 0) {
          deletedMessages += messagesToDelete.size;
          await channel.bulkDelete(messagesToDelete, true); // Include pinned messages
        } else {
          logger.info('No more messages to delete in channel:', channel.name);
          break;
        }
      } while (messagesToDelete.size > 0);
  
      logger.info('Deleted', deletedMessages, 'messages from channel:', channel.name);
      return true;
    } catch (error) {
      logger.warn('Error deleting messages:', error);
      return false
    }
}

module.exports = {
    deleteMessages
}