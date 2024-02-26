import { Client, Message, Partials, User } from "discord.js"
import dotenv from "dotenv"
import bookmark from "./bookmark"

dotenv.config()

const client: Client<true> = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMessageReactions", "MessageContent"],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
})

// Handle message reaction
client.on("messageReactionAdd", async (reaction, reactionUser) => {
  if (reactionUser.bot || reaction.emoji.name !== "🔖") return

  const user = new Promise<User>((res, rej) => {
    try {
      res(reactionUser.fetch())
    } catch (err) {
      rej()
    }
  })

  const message = new Promise<Message>((res, rej) => {
    try {
      res(reaction.message.fetch())
    } catch (err) {
      rej()
    }
  })

  await Promise.all([user, message])
    .then(([user, message]) => bookmark(client, user, message.guild, message.channel, message))
    .catch(err => console.error(err))
})

// Handle message context menu interaction
client.on("interactionCreate", async interaction => {
  if (interaction.user.bot || !interaction.isMessageContextMenuCommand()) return
  await interaction.deferReply({ ephemeral: true }).catch(err => console.error(err))

  const { user, guild, channel, targetMessage: message } = interaction
  await bookmark(client, user, guild, channel, message).catch(err => console.error(err))
  interaction.editReply({ content: "Message saved, check your DMs!" }).catch(err => console.error(err))
})

// Login bot
client.once("ready", () => console.log(`Logged in as ${client.user.username}`))
client.login(process.env.TOKEN)
