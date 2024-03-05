import { ApplicationCommandType, ContextMenuCommandBuilder, REST, Routes, SlashCommandBuilder } from "discord.js"
import dotenv from "dotenv"

dotenv.config()

const rest = new REST().setToken(process.env.TOKEN)

// Create commands
const about = new SlashCommandBuilder()
  .setName("about")
  .setDescription("About this bot")
  .setDMPermission(true)
  .setNSFW(false)
const bookmark = new ContextMenuCommandBuilder().setName("Screenshot This").setType(ApplicationCommandType.Message)

// Register commands
rest
  .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [about.toJSON(), bookmark.toJSON()] })
  .then(() => console.log("Successfully registered commands"))
