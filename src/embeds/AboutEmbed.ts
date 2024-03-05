import { EmbedBuilder } from "discord.js"

export const AboutEmbed = () =>
  new EmbedBuilder()
    .setTitle("Clipper")
    .setURL("http://5f.au/clipper")
    .setDescription(
      'Save screenshots of any message directly to your DMs.\n\nSimply react to a message with the bookmark emoji or use the message\'s context menu to "Screenshot This". The bot will then DM you an image of the given message to easily save and share!\n\nCreated as part of [5f.au](https://discord.gg/deAfFeVY7u).'
    )
