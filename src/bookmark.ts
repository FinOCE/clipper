import { Guild, Message, TextBasedChannel, User } from "discord.js"
import { CanvasRenderingContext2D, createCanvas, loadImage } from "canvas"
import moment from "moment"

/**
 * Generate a screenshot of a message and then DM it to the specified user.
 * @param user The user to send the screenshot to
 * @param message The message to take a screenshot of
 */
export default async function bookmark(
  user: User,
  guild: Guild | null,
  channel: TextBasedChannel | null,
  message: Message
) {
  // Generate image
  const image = await generateImage(user, guild, channel, message)

  // DM screenshot to user
  channel?.send({ files: [image] }) // Just for testing, replace with below once working
  // await user.createDM().then(dmChannel => dmChannel.send()).catch(err => console.error(err))
}

async function generateImage(user: User, guild: Guild | null, channel: TextBasedChannel | null, message: Message) {
  const canvas = createCanvas(1500, 1000)
  const ctx = canvas.getContext("2d")

  const padding = 50
  const imageSize = 130

  // Background
  ctx.fillStyle = "#36393e"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Avatar
  ctx.beginPath()
  ctx.arc(padding + imageSize / 2, padding + imageSize / 2, imageSize / 2, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.save()
  ctx.clip()

  const image = await loadImage(message.author.displayAvatarURL({ extension: "jpg" }))
  ctx.drawImage(image, padding, padding, imageSize, imageSize)

  ctx.restore()

  // Username
  ctx.font = "40px 'gg sans'"
  ctx.fillStyle = message.member ? message.member.displayHexColor : "#ffffff"
  ctx.textBaseline = "top"
  ctx.textAlign = "left"
  ctx.fillText(message.author.displayName, padding + imageSize + padding, padding)

  const usernameWidth = ctx.measureText(message.author.displayName).width
  const usernamePadding = 25

  // Date
  ctx.font = "35px 'gg sans'"
  ctx.fillStyle = "#939aa3"
  ctx.fillText(
    moment(message.createdAt).format("DD/MM/YYYY HH:mm"),
    padding + imageSize + padding + usernameWidth + usernamePadding,
    padding + 5
  )

  // Text content
  ctx.font = "40px 'gg sans'"
  ctx.fillStyle = "#ffffff"

  separateMessageContent(message.content, ctx, canvas.width - padding * 3 - imageSize).map((line, index) => {
    ctx.fillText(line, padding + imageSize + padding, padding + 60 + index * 60)
  })

  return canvas.toBuffer()
}

function separateMessageContent(content: string, ctx: CanvasRenderingContext2D, maxWidth: number) {
  const words = content.split(" ")
  const lines: string[] = []

  let currentLine = ""
  for (const word of words) {
    if (ctx.measureText(currentLine + word).width >= maxWidth) {
      lines.push(currentLine)
      currentLine = word + " "
    } else {
      currentLine += word + " "
    }
  }
  lines.push(currentLine)
  return lines
}
