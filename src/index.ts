import { Client, Message, Partials, User } from "discord.js"
import dotenv from "dotenv"
import bookmark from "./bookmark"
import { AboutEmbed } from "./embeds/AboutEmbed"

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

  const msg = new Promise<{ message: Message; reply: Message | null }>(async (res, rej) => {
    try {
      const message = await reaction.message.fetch()
      const reply = message.reference ? await message.fetchReference() : null
      res({ message, reply })
    } catch (err) {
      rej()
    }
  })

  await Promise.all([user, msg])
    .then(([user, msg]) => bookmark(client, user, msg.message.guild, msg.message.channel, msg.message, msg.reply))
    .catch(err => console.error(err))
})

// Handle message context menu interaction
client.on("interactionCreate", async interaction => {
  if (interaction.user.bot) return

  // Handle about me
  if (interaction.isChatInputCommand() && interaction.commandName === "about") {
    await interaction.reply({ embeds: [AboutEmbed()], ephemeral: true }).catch(console.error)
    return
  }

  // Handle context menus
  if (!interaction.isMessageContextMenuCommand()) return
  await interaction.deferReply({ ephemeral: true }).catch(err => console.error(err))

  const { user, guild, channel, targetMessage: message } = interaction
  const reply = message.reference ? await message.fetchReference() : null
  await bookmark(client, user, guild, channel, message, reply).catch(err => console.error(err))
  interaction.editReply({ content: "Message saved, check your DMs!" }).catch(err => console.error(err))
})

// Login bot
client.once("ready", () => console.log(`Logged in as ${client.user.username}`))
client.login(process.env.TOKEN)
