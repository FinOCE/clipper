import { ApplicationCommandType, ContextMenuCommandBuilder, REST, Routes } from "discord.js"
import dotenv from "dotenv"

dotenv.config()

const rest = new REST().setToken(process.env.TOKEN)

// Create bookmark command
const command = new ContextMenuCommandBuilder().setName("Screenshot This").setType(ApplicationCommandType.Message)

// Register bookmark command
rest
  .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [command.toJSON()] })
  .then(() => console.log("Successfully registered bookmark command"))
